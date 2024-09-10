import { profile } from 'console';
import Link from 'next/link';
import React from 'react'

export default function RightSidebar() {


  const topHashtags = [
    { name: "react", count: 1234 },
    { name: "nextjs", count: 1234 },
    { name: "tailwindcss", count: 1234 },
    { name: "typescript", count: 1234 },
    { name: "javascript", count: 1234 },
  ]
  const topProfiles = [
    { id: 1, username: "alice", followerCount: 1234 },
    { id: 2, username: "bob", followerCount: 1234 },
    { id: 3, username: "charlie", followerCount: 1234 },
    { id: 4, username: "dave", followerCount: 1234 },
  ];




  return (
    <aside className='hidden h-screen w-1/4 overflow-y-auto p-4 md:sticky md:block xl:w-1/5'>
      <section className="mb-4 rounded-lg bg-gray-100 p-4 ">
        <h2 className='mb-2 text-xl font-bold'>What is happening</h2>
        <ul>
          {topHashtags.map(hachtag => (
            <li key={hachtag.name}>
              <Link href={`/explore?h=${hachtag.name}`} 
              className='text-blue-500 hover:underline'>#{hachtag.name}
              </Link>
                <span> {hachtag.count} </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4 rounded-lg bg-gray-100 p-4 ">
        <h2 className='mb-2 text-xl font-bold'>who to follow</h2>
        <ul>
          {topProfiles.map(profile => (
            <li key={profile.id}>
              <Link href={`/explore?h=${profile.username}`} 
              className='text-blue-500 hover:underline'>{profile.username}
              </Link>
                <span> {profile.followerCount} </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
