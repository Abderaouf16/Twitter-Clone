'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuHome, LuLogIn, LuSearch, LuUser } from 'react-icons/lu'



export default function Nav() {

    const pathName= usePathname()

    const links = [
        { text: 'Home', link: "/", icon: LuHome },
        { text: 'Explore', link: "/explore", icon: LuSearch },
        { text: 'Profile', link: "/profile", icon: LuUser },
        { text: 'Login', link: "/login", icon: LuLogIn },
    ]

     function isActive(link:string) {
        return link === '/' ? pathName === link : pathName.startsWith(link)
     }

    return (
        <>
            <nav className=' flex md:flex-col justify-around  py-2 md:gap-2 md:py-0 '>
                {links.map((item) => (
                    <Link key={item.text} href={item.link} className=  {`w-max flex flex-col items-center justify-start md:flex-row md:py-2 md:pr-8  gap-2 text-xs md:text-xl  hover:bg-gray-100 rounded-3xl ${isActive(item.link) ? "font-bold" : "font-medium"}`} >
                        <item.icon className='mb-1 h-6 w-6 md:mr-4 md:h-7 md:w-7' />
                        <span className=''>{item.text}</span>
                    </Link>
                ))}

            </nav>
        </>
    )
}
