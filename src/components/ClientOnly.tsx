"use client"

import { type ReactNode } from "react"

import { useIsClient } from "@/hooks/useIsClient"

type ClientOnlyProps = {
  children: ReactNode
  fallback?: ReactNode
}

const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const isClient = useIsClient()

  if (!isClient) return <>{fallback}</>
  return <>{children}</>
}

export default ClientOnly
