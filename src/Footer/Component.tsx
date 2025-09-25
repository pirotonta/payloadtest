import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-black text-white">
      <div className="container py-8 flex flex-col items-center gap-8">
        
        <div className="flex items-center">
          <Logo size="footer"/>
        </div>

        <div className="flex flex-col gap-4 text-lg leading-relaxed text-center">
          <p>
            <span className="font-semibold">Festivalle</span> es tu agenda cultural del Alto Valle. 
            Descubrí conciertos, eventos, cine y todo lo que pasa en la región.
          </p>

          <p className="pt-2">
            Hecho con <span className="text-pink-300">♡</span> por:
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7"
                src="https://i.imgur.com/3RlDwQF.png"
                alt="GitHub icon"
              />
              <a
                className="font-semibold hover:text-emerald-400"
                href="https://github.com/pirotonta"
                target="_blank"
                rel="noopener noreferrer"
              >
                pirotonta
              </a>
            </div>

            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7"
                src="https://i.imgur.com/3RlDwQF.png"
                alt="GitHub icon"
              />
              <a
                className="font-semibold hover:text-emerald-400"
                href="https://github.com/MorenoGise"
                target="_blank"
                rel="noopener noreferrer"
              >
                MorenoGise
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
