import { Glimpse } from '@web/lib/GlimpseType'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const slug = req.nextUrl.searchParams.get('slug')
  const glimpse: Glimpse = await (
    await fetch(`http://localhost:7777/glimpse/${slug}`, {
      cache: 'no-store',
    })
  ).json()

  return new NextResponse(JSON.stringify({ glimpse: glimpse, ip: req.ip }))
}
