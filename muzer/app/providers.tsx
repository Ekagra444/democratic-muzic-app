"use client"
//use of providers.tsx is done so as to use session state on the client side across the components
import { SessionProvider } from "next-auth/react"

export function Providers({children}:{
    children:React.ReactNode
}){
    return <SessionProvider>
        {children}
    </SessionProvider>
}