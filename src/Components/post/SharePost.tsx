'use client'
import { button } from '@nextui-org/theme'
import React from 'react'
import { LuShare } from 'react-icons/lu'
import { toast } from 'sonner'

interface sharePostProps {
    postId: string
}
export default function SharePost({postId}: sharePostProps) {

    function copyParaLink( e: React. MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        const paramLink = window.location.origin + "/post/" + postId ; 

        try {
            navigator.clipboard.writeText(paramLink)
            toast("Link Copied to clipboard")
        } catch (error) {
            console.log("failed to copy the link")
        }
        
    }

  return (
    <>
    <button onClick={copyParaLink} >
        <LuShare className='w-h h-5' />
    </button>
    </>
  )
}
