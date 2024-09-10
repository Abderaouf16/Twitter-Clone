import React from 'react'
import Nav from './Nav'
import Link from 'next/link'
import { FaTwitter } from 'react-icons/fa'

export default function LeftSidebar() {
    return (
        <aside className='hidden w-1/4 overflow-y-auto border-r border-gray-200 p-6 h-screen md:sticky md:block xl:w-1/5  '>
            <Link href='/' className='mb-6 block '>
            <FaTwitter  className='w-10 h-10'/>
            </Link>
            <Nav/>
        </aside>
    )
}
