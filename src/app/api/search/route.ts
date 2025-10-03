import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    
    console.log('Search query:', query)
    
    if (!query || query.length < 2) {
      return NextResponse.json({ docs: [] })
    }

    const payload = await getPayload({ config: configPromise })
    let formattedResults: any[] = []

    try {
      console.log('Searching events...')
      const eventsResults = await payload.find({
        collection: 'events',
        where: {
          or: [
            {
              title: {
                contains: query,
              },
            },
            {
              description: {
                contains: query,
              },
            },
          ],
        },
        limit: 10,
        depth: 0,
      })

      console.log('Events found:', eventsResults.docs.length)
      console.log('Sample event:', eventsResults.docs[0])

      const eventResults = eventsResults.docs.map((event: any) => ({
        id: event.id,
        title: event.title || 'Evento sin título',
        excerpt: event.description || '',
        url: `/eventos/${event.id}`,
        collection: 'events',
      }))

      formattedResults = [...formattedResults, ...eventResults]
    } catch (eventsError) {
      console.error('Events search error:', eventsError)
    }

    try {
      console.log('Searching pages...')
      const pagesResults = await payload.find({
        collection: 'pages',
        where: {
          title: {
            contains: query,
          },
        },
        limit: 10,
        depth: 0,
      })

      console.log('Pages found:', pagesResults.docs.length)

      const pageResults = pagesResults.docs.map((page: any) => ({
        id: page.id,
        title: page.title || 'Página sin título',
        excerpt: page.meta?.description || '',
        url: `/${page.slug}`,
        collection: 'pages',
      }))

      formattedResults = [...formattedResults, ...pageResults]
    } catch (pagesError) {
      console.error('Pages search error:', pagesError)
    }

    console.log('Total formatted results:', formattedResults.length)

    return NextResponse.json({ 
      docs: formattedResults,
      query: query,
      totalResults: formattedResults.length 
    })

  } catch (error) {
    console.error('Search API error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error')
    
    return NextResponse.json(
      { 
        error: 'Search failed', 
        docs: [],
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}