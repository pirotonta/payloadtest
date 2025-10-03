'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext"
import { Search } from '@/components/Search'
import type { Header } from '@/payload-types'

export const HeaderNav: React.FC<{ data: Header }> = ({ data }) => {
  const navItems = data?.navItems || []
  const { user, logout } = useAuth()

  return (
    <nav className="flex gap-16 items-center">
      
      <div className="flex-1 max-w-md mx-8">
        <Search className="w-full" />
      </div>
      
      {navItems.map((item, index) => {
        if (!item?.link) return null

        const { link } = item
        let href = '/'
        let label = 'Page'

        if (link.type === 'custom') {
          href = link.url || '/'
          label = link.label || 'Page'
        } else if (link.type === 'reference') {
          if (typeof link.reference?.value === 'object' && link.reference.value?.slug) {
            href = `/${link.reference.value.slug}`
            label = link.label || link.reference.value.title || 'Page'
          }
        }

        const key = item.id || `nav-item-${index}`

        return (
          <Link 
            key={key}
            href={href} 
            className="px-3 py-1 hover:underline"
          >
            {label}
          </Link>
        )
      })}
      
      
      
      <div className="flex items-center gap-3">
        {!user ? (
          <Link href="/login" className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded text-white">
            Iniciar sesión
          </Link>
        ) : (
          <>
            <span className="mr-2">{user.name}</span>
            <button 
              onClick={logout} 
              className="px-3 py-1 bg-zinc-950 hover:bg-zinc-900 rounded text-white"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  )
}