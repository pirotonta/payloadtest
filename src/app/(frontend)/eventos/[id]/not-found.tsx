import Link from 'next/link'
import { Calendar } from 'lucide-react'

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Calendar className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Evento no encontrado
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          El evento que buscas no existe o ha sido eliminado.
        </p>
        <div className="space-x-4">
          <Link 
            href="/eventos"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Ver todos los eventos
          </Link>
          <Link 
            href="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}