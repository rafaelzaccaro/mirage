import { metadata } from '../layout'
import { Glimpse } from '@web/lib/GlimpseType'
import { RichTextEditor } from '@web/components/RichTextEditor'
import { hasCookie, setCookie } from 'cookies-next'
import { notFound } from 'next/navigation'

export default async function Glimpse({
  params,
}: {
  params: { slug: string }
}) {
  metadata.title = `Mirage | ${params.slug}`
  const res: {
    glimpse: Glimpse
    ip?: string
    statusCode: number
    message: string
  } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/getGlimpse?slug=${params.slug}`,
      {
        cache: 'no-store',
      },
    )
  ).json()

  if (res.statusCode == 404) notFound()

  if (res.ip && !hasCookie('visited')) {
    const formData = new FormData()
    formData.append('id', res.glimpse.id)
    formData.append('accessCount', (res.glimpse.accessCount + 1).toString())
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/edit`, {
      method: 'put',
      body: formData,
    })
    setCookie('visited', true, { maxAge: 86400 })
  }

  return <RichTextEditor glimpse={res.glimpse}></RichTextEditor>
}
