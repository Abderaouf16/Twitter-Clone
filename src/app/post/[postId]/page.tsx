import Header from "@/src/Components/Layout/Header";
import Post from "@/src/Components/post/Post";
import { db, likes, posts, profiles } from "@/src/lib/db";
import { eq, param, sql } from "drizzle-orm";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    postId: string;
  };
}

async function getPostDetails(postId: string) {
  const [post] = await db
    .select({
     postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      profileId: posts.profileId,
      username: profiles.username,
      likeCount: sql<number>`CAST(COUNT (DISTINCT ${likes.id}) as int)`,
    })
    .from(posts)
    .innerJoin(profiles, eq(posts.profileId, profiles.id)) //This retrieves the username of the user who created the post by matching posts.profileId = profiles.id. Only posts that have a matching profile in the profiles table are included.
    .leftJoin(likes, eq(likes.postId, posts.id)) // This counts how m any likes each post has by matching likes.postId = posts.id.         A LEFT JOIN ensures that posts with no likes still appear in the results.
    .where(eq(posts.id, postId)) // ensures that only the post with the specified postId is retrieved.
    .groupBy(posts.id, profiles.id); //grouping the rows by the post and profile.

  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostDetails(params.postId);
  
  if(!post) {
    notFound()
  }
  return (
    <div>
    <Header hasBackButton>
      <h1>Posts</h1>
    </Header>
    <Post {...post}  />
  </div>
  )
}
