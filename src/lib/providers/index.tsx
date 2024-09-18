'use client';

import { Toaster } from "sonner";
import AuthProvider from "./authProviders";

export default function Providers ({children} : {children: React.ReactNode}){
    return(
    <AuthProvider>
        <Toaster/>
        {children}
    </AuthProvider>

    ) 
}