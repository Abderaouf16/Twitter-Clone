import { db, follows, hashtags, postHashtags, profiles } from "@/src/lib/db";
import { count, profile } from "console";
import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import React from "react";


async function getTopHashtag() {

  // fetch the top 5 hashtags from a database, based on the number of posts associated with each hashtag.

  return db
    .select({
      name: hashtags.name,
      count: sql<number>` CAST( COUNT (${postHashtags.postId}) as int) `,
    })
    .from(hashtags)
    .innerJoin(postHashtags, eq(hashtags.id, postHashtags.hashtagId)) //The innerJoin ensures that only hashtags associated with posts (i.e., those present in postHashtags) are considered in the result.
    .groupBy(hashtags.id) // each group of posts associated with a specific hashtag
    .orderBy(desc(sql`count`)) // most frequent hashtags first
    .limit(5);
}

 
async function getTopProfiles() {

  // fetch the top 5 hashtags from a database, based on the number of posts associated with each hashtag.

  return db
    .select({
      name: profiles.username,
      id: profiles.id,
      followerCount: sql<number>` CAST( COUNT (${follows.followedId}) as int) as followerCount  `,
    })
    .from(profiles)
    .leftJoin(follows, eq(profiles.id, follows.followedId)) //The innerJoin ensures that only hashtags associated with posts (i.e., those present in postHashtags) are considered in the result.
    .groupBy(profiles.id) // each group of posts associated with a specific hashtag
    .orderBy(desc(sql`followerCount`)) // most frequent hashtags first
    .limit(5);
}




export default async function RightSidebar() {


  const [topHashtags, topProfiles ] = await Promise.all([ getTopHashtag(), getTopProfiles()])








  return (
    <aside className="hidden h-screen w-1/4 overflow-y-auto p-4 md:sticky md:block xl:w-1/5">
      <section className="mb-4 rounded-lg bg-gray-100 p-4 ">
        <h2 className="mb-2 text-xl font-bold">What is happening</h2>
        <ul>
          {topHashtags.map((hachtag) => (
            <li key={hachtag.name}>
              <Link
                href={`/explore?h=${hachtag.name}`}
                className="text-blue-500 hover:underline"
              >
                #{hachtag.name}
              </Link>
              <span> {hachtag.count} </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4 rounded-lg bg-gray-100 p-4 ">
        <h2 className="mb-2 text-xl font-bold">who to follow</h2>
        <ul>
          {topProfiles.map((profile) => (
            <li key={profile.id}>
              <Link
                href={`/explore?h=${profile.name}`}
                className="text-blue-500 hover:underline"
              >
                {profile.name}
              </Link>
              <span> {profile.followerCount} </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
