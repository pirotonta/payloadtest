import type { Event, EventsBlock as EventsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { PaginatedEventsArchive } from '@/components/EventsArchive/PaginatedEventsArchive'

export const EventsBlock: React.FC<
  EventsBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedEvents } = props

  const limit = limitFromProps || 6

  let events: Event[] = []
  let totalDocs = 0
  let hasNextPage = false
  let hasPrevPage = false
  let totalPages = 1

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    try {
      const fetchedEvents = await payload.find({
        collection: 'events',
        depth: 1,
        limit: 0, 
        sort: 'day',
      })

      events = fetchedEvents.docs || []
      totalDocs = fetchedEvents.totalDocs || 0
      hasNextPage = false 
      hasPrevPage = false 
      totalPages = Math.ceil(totalDocs / limit)
    } catch (error) {
      console.error('Error fetching events:', error)
      events = []
      totalDocs = 0
      totalPages = 1
    }
  } else if (populateBy === 'selection') {
    if (selectedEvents && selectedEvents.length > 0) {
      const filteredSelectedEvents = selectedEvents
        .map((event) => {
          if (typeof event === 'object' && event !== null) {
            if ('value' in event && event.value) {
              return typeof event.value === 'object' ? event.value : null
            }
            return event as Event
          }
          return null
        })
        .filter((event): event is Event => event !== null)

      events = filteredSelectedEvents
      totalDocs = events.length
      totalPages = 1 
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <PaginatedEventsArchive 
        initialEvents={events}
        totalDocs={totalDocs}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalPages={totalPages}
        limit={limit}
        populateBy={populateBy}
        selectedEvents={selectedEvents}
      />
    </div>
  )
}