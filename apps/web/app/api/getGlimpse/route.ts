import { Glimpse } from '@web/lib/GlimpseType'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const slug = req.nextUrl.searchParams.get('slug')
  const glimpse: Glimpse = await (
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/glimpse/${slug}`, {
      cache: 'no-store',
    })
  ).json()
  const res = JSON.stringify(
    glimpse.id ? { glimpse: glimpse, ip: req.ip } : glimpse,
  )

  return new NextResponse(res)
}
