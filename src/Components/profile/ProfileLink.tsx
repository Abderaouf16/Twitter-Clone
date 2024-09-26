'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

 interface ProfileLinkProps{
  children: ReactNode
  username: string
  className?: string

 }

export default function ProfileLink({children, username, className}: ProfileLinkProps) {


  const router = useRouter()

  function handlClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/profile/${username}`)
  }
  

  return (
    <div role= "button"
    className={className}
     onClick={handlClick}>
      {children}
    </div>
  )
}
