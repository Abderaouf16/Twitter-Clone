'use client'
import { useAuth } from '@/src/lib/providers/authProviders'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuHome, LuLoader, LuLogIn, LuLogOut, LuSearch, LuUser } from 'react-icons/lu'



export default function Nav() {
    const { user, loading, handleSignOut } = useAuth()


    const pathName = usePathname()

    const links = [
        { text: 'Home', link: "/", icon: LuHome },
        { text: 'Explore', link: "/explore", icon: LuSearch },
        { text: 'Profile', link: "/profile", icon: LuUser },

        ...( loading ? [{text:"...", icon: LuLoader}]: user ? [{ text: 'Logout', onclick: handleSignOut, icon: LuLogOut }] : [{ text: 'Login', link: "/login", icon: LuLogIn }])
    ]

    function isActive(link: string) {
        return link === '/' ? pathName === link : pathName.startsWith(link)
    }

    const communClassName = "w-max flex flex-col items-center justify-start md:flex-row md:py-2 md:pr-8  gap-2 text-xs md:text-xl  hover:bg-gray-100 rounded-3xl"
    return (
        <>
            <nav className=' flex md:flex-col justify-around  py-2 md:gap-2 md:py-0 '>
                {links.map((item) => (
                    <React.Fragment key={item.text}>
                        {item.link ? (
                            <Link
                                href={item.link}
                                className={` ${communClassName} ${isActive(item.link) ? "font-bold" : "font-medium"}`} >
                                <item.icon className='mb-1 h-6 w-6 md:mr-4 md:h-7 md:w-7' />
                                <span className=''>{item.text}</span>
                            </Link>
                        ) :
                            <button className={communClassName} onClick={item.onclick}>
                                <item.icon className='mb-1 h-6 w-6 md:mr-4 md:h-7 md:w-7' />
                                <span className=''>{item.text}</span>

                            </button>
                        }

                    </React.Fragment>

                ))}

            </nav>
        </>
    )
}
