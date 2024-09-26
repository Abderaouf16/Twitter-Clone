'use client'
import React from 'react'
import RequiresAuth from '../Layout/auth/RequiresAuth'
import { LuHeart } from 'react-icons/lu'

 interface likeCountProps {
    likeCount: number 
    likedByUser: boolean
 }
export default function LikeCount({likeCount, likedByUser} : likeCountProps) {

  return (
    <div className='flex items-center '>
      <RequiresAuth>
        <LuHeart  className= {`h-5 w-h mr-1 ${likedByUser ? 'fill-red-500' : 'hover:fill-red-500' }`} />
      </RequiresAuth>
      <span> {likeCount} </span>
    </div>
  )
}
