'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [mounted, setMounted] = useState(false)
  
  const hasMedia = media && typeof media === 'object'

  useEffect(() => {
    setMounted(true)
    setHeaderTheme(hasMedia ? 'dark' : 'light')
  }, [hasMedia, setHeaderTheme])

  if (!mounted) {
    return (
      <div className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {richText && (
              <RichText 
                className="mb-8 text-black" 
                data={richText} 
                enableGutter={false} 
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4 flex-wrap">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!hasMedia) {
    return (
      <div className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {richText && (
              <RichText 
                className="mb-8 text-black" 
                data={richText} 
                enableGutter={false} 
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4 flex-wrap">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
      </div>
    </div>
  )
}
