import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const events = await payload.find({
      collection: 'events',
      limit: 5,
      depth: 0,
    })

    console.log('Test - Events found:', events.docs.length)
    console.log('Test - Sample event structure:', events.docs[0])

    return NextResponse.json({
      success: true,
      count: events.docs.length,
      sampleEvent: events.docs[0],
      allEvents: events.docs
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}