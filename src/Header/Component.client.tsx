'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {

  return (
    <header className="w-full sticky top-0 z-50 bg-black" >
      <div className="py-8 flex items-center justify-between px-24">
        <Link href="/">
          <Logo loading="eager" priority="high" size="header" className='transition-transform duration-300 hover:scale-105'/>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
