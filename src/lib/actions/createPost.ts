"use server";

import { z } from "zod";
import { getServerUserId } from "../db/auth/getServerUserId";
import { db, hashtags, postHashtags, posts } from "../db";
import { hashtagsRegex } from "../constants";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  content: z.string().min(1).max(250),
  parentId: z
    .string()
    .uuid()
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
});

export async function createPost(formData: FormData) {
  try {
    const userId = await getServerUserId();
    if (!userId) {
      throw new Error("user not found");
    }
    const contentSubmission = formData.get("content");
    const parentIdSubmission = formData.get("parentId");

    const { content, parentId } = createPostSchema.parse({
      content: contentSubmission,
      parentId: parentIdSubmission,
    });

    await createPostRecord(userId, content, parentId);
    if(parentId){
      revalidatePath(`/post/${parentId}`)
    }else{
      revalidatePath('/')
    }

    return {success: true}
  } catch (error) {

    return {success: false}

  }
}

function extractHashtags(content: string) {
  return (
    content
      .match(hashtagsRegex)
      ?.map((tag) => tag.slice(1).toLocaleLowerCase().trim()) ?? []
  );
}



async function createPostRecord(
  userId: string,
  content: string,
  parentId?: string
) {
  return await db.transaction(async (tx) => {
    const [newPost] = await tx
      .insert(posts)
      .values({ profileId: userId, content, parentId })
      .returning();



    const extractedHashtags = extractHashtags(content);

    for (const hashtagName of extractedHashtags) {
      const [hashtag] = await tx
        .insert(hashtags)
        .values({ name: hashtagName })
        .onConflictDoUpdate({
          target: hashtags.name,
          set: { name: hashtagName },
        })
        .returning();
        await tx
        .insert(postHashtags)
        .values({ postId: newPost.id, hashtagId: hashtag.id })
        .onConflictDoNothing().returning()
    }
  });
}
 