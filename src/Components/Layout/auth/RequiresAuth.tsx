import { useAuth } from '@/src/lib/providers/authProviders'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface RequiresAuthProps {
    children: React.ReactNode
    onClick: (e: React.MouseEvent) => void;
    className: string
    as?: "button" | "div" | "span"
}



export default function RequiresAuth({ onClick, children, className, as = "button" }: RequiresAuthProps) {
    const router = useRouter()
    const { user } = useAuth()
    const Component = as
    function handleClick(e: React.MouseEvent) {
        if (!user) {
            e.preventDefault()
            e.stopPropagation()
            toast("You must be logged in ")
            router.push('/login')
        } else if (onclick) {
            onClick(e)
        }
    }
    return (
        <Component onClick={handleClick} className={className} >
            {children}
        </Component>
    )
}
