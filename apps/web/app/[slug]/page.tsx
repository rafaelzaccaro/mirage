import { metadata } from '../layout'
import { Glimpse } from '@web/lib/GlimpseType'
import { RichTextEditor } from '@web/components/RichTextEditor'
import { hasCookie, setCookie } from 'cookies-next'

export default async function Glimpse({
  params,
}: {
  params: { slug: string }
}) {
  metadata.title = `Mirage | ${params.slug}`
  const res: { glimpse: Glimpse; ip?: string } = await (
    await fetch('http://localhost:3000/api/getGlimpse?slug=' + params.slug, {
      cache: 'no-store',
    })
  ).json()
  if (res.ip && !hasCookie('visited')) {
    const formData = new FormData()
    formData.append('id', res.glimpse.id)
    formData.append('accessCount', (res.glimpse.accessCount + 1).toString())
    await fetch('https://localhost:7777/edit', {
      method: 'put',
      body: formData,
    })
    setCookie('visited', true, { maxAge: 86400 })
  }

  return <RichTextEditor glimpse={res.glimpse}></RichTextEditor>
}
