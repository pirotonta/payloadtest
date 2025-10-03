import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Event } from '@/payload-types'
import { EventDetailPage } from '@/components/EventDetailPage'

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = params

  // Validate ID is a number
  const eventId = parseInt(id)
  if (isNaN(eventId)) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  let event: Event | null = null

  try {
    const result = await payload.findByID({
      collection: 'events',
      id: eventId,
      depth: 2, // Include related data like images
    })
    event = result
  } catch (error) {
    console.error('Error fetching event:', error)
    notFound()
  }

  if (!event) {
    notFound()
  }

  return <EventDetailPage event={event} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EventPageProps) {
  const { id } = params
  const eventId = parseInt(id)
  
  if (isNaN(eventId)) {
    return {
      title: 'Evento no encontrado',
    }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const event = await payload.findByID({
      collection: 'events',
      id: eventId,
      depth: 1,
    })

    return {
      title: event.title || 'Evento',
      description: event.description || 'Detalles del evento',
      openGraph: {
        title: event.title || 'Evento',
        description: event.description || 'Detalles del evento',
        images: event.image && typeof event.image === 'object' 
          ? [{ url: event.image.url || '' }] 
          : [],
      },
    }
  } catch (error) {
    return {
      title: 'Evento no encontrado',
    }
  }
}