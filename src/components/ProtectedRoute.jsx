'use client'

import { useAccount } from "@starknet-react/core"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function ProtectedRoute({ children }){

    const { isConnected } = useAccount()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected && pathname !== '/') {
            router.replace('/')
            toast.error('Connect your wallet to continue')
        }
    }, [isConnected, pathname, router])

    return <>{children}</>
}