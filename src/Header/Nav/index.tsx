'use client'

import React from 'react'
import Link from 'next/link'

import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string
  href: string
}

interface HeaderType {
  navItems?: NavItem[]
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
   const { user, logout } = useAuth();

  return (
    <nav className="flex gap-16 items-center">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="px-3 py-1 hover:underline">
          {item.label}
        </Link>
      ))}
      <div className="ml-auto flex items-center gap-3">
        {!user ? (
          <>
            <Link href="/login" className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded">Iniciar sesión</Link>
          </>
        ) : (
          <>
            <span className="mr-2">{user.name}</span>
            <button onClick={logout} className="px-3 py-1 bg-zinc-950 hover:bg-zinc-900 rounded">Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  )
}
