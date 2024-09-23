"use client"
import React from 'react'
import SpinnerAnimation from './Spinner';
import { useFormStatus } from "react-dom";

interface submitBtnProps {
    className: string;
    children: React.ReactNode;
/*     loading: boolean;
 */}


export default function SubmitBtn({ className, children, /* loading */ }: submitBtnProps) {

    const {pending} = useFormStatus()

    return (
        <>
            <button type='submit'
                disabled={/* loading ?? */ pending}  
                className={` flex items-center gap-3  font-bold px-4 py-2 bg-blue-500 rounded-xl text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50  ${className}    `}
                > 
                {(/* loading || */ pending) && <SpinnerAnimation className='w-4 h-4' /> }
                {children}
            </button>
        </>
    )
}
