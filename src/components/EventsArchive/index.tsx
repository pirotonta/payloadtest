import type { Event } from '@/payload-types'
import React from 'react'
import { Card } from '@/components/Card'

export type Props = {
  events: Event[]
}

export const EventsArchive: React.FC<Props> = ({ events }) => {
  return (
    <div className="container">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event, index) => {
            if (typeof event === 'object' && event !== null) {
              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {event.image && typeof event.image === 'object' && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={`/api/media/file/${event.image.filename}`}
                        alt={event.image.alt || event.title || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>
                    )}
                    <div className="space-y-2">
                      {event.day && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.day).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}