import Link from 'next/link'
import React from 'react'

export default function MobileHeader() {
  return (
    <header className='fixed flex h-14 w-full items-center justify-center border-b border-gray-200 p-4 md:hidden'>
      <div className="">
      <Link href='/'>
      
      </Link>

      </div>
        </header>
  )
}
