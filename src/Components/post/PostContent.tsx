'use client'
import { hashtagsRegex } from '@/src/lib/constants'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PostContentProps {
  content: string

}

export default function PostContent({ content }: PostContentProps) {
  const router = useRouter()

  function parseContent(text: string) {
    const parts = text.split(hashtagsRegex)

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a hashtag, make it clickable
        return (
          <span
            key={index}
            role='link'
            onClick={e => {
              e.preventDefault()
              router.push(`/explore?h=${encodeURIComponent(part)}`)
            }}
            className='cursor-pointer text-blue-500 hover:underline'
          >
            #{part}
          </span>
        )
      } else {
        // Regular text
        return part
      }
    })
  }

  return (
    <div>
      {parseContent(content)}
    </div>
  )
}
