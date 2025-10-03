import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react'
import type { Event, Media } from '@/payload-types'

interface EventDetailPageProps {
  event: Event
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (timeString: string) => {
    return timeString || 'Hora a confirmar'
  }

  const getImageUrl = () => {
    if (!event.image) return null
    
    if (typeof event.image === 'string') {
      return `/media/${event.image}`
    }
    
    if (typeof event.image === 'object' && event.image.url) {
      return event.image.url
    }
    
    return null
  }

  const imageUrl = getImageUrl()

  return (
    <div>
      <div className="container py-6">
        <Link 
          href="/eventos" 
          className="inline-flex items-center gap-2 text-gray-50 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a eventos
        </Link>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            {imageUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={event.title || 'Imagen del evento'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border">
                <div className="text-gray-500 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Imagen próximamente</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {event.title || 'Evento sin título'}
              </h1>
              
              {event.description && (
                <p className="text-lg text-gray-100 leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium uppercase tracking-wide">Fecha</p>
                  <p className="text-lg font-semibold text-white">
                    {event.day ? formatDate(event.day) : 'Fecha a confirmar'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium uppercase tracking-wide">Hora</p>
                  <p className="text-lg font-semibold text-white">
                    {formatTime(event.time)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors">
                Obtener entradas
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Información del evento
            </h2>
            
            <div className="bg-black rounded-lg p-8 border border-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4 text-lg">Detalles</h3>
                  <div className="space-y-3 text-white">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Título:</span>
                      <span>{event.title}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Fecha:</span>
                      <span>{event.day ? formatDate(event.day) : 'A confirmar'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Hora:</span>
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">ID del evento:</span>
                      <span className="text-white">#{event.id}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-4 text-lg">Descripción completa</h3>
                  <p className="text-white leading-relaxed">
                    {event.description || 'No hay descripción adicional disponible para este evento. Mantente atento a nuestras redes sociales para más información.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¡Comparte este evento!
            </h3>
            <p className="text-white mb-8 text-lg">
              Invita a tus amigos y familiares a este increíble evento
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Compartir evento
              </button>
              <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Guardar para después
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}