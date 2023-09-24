import { metadata } from '../layout'
import { Glimpse } from '@web/lib/GlimpseType'
import { RichTextEditor } from '@web/components/RichTextEditor'

export default async function Glimpse({
  params,
}: {
  params: { slug: string }
}) {
  metadata.title = `Mirage | ${params.slug}`
  const glimpse: Glimpse = await (
    await fetch(`http://localhost:7777/glimpse/${params.slug}`, {
      cache: 'no-store',
    })
  ).json()

  return <RichTextEditor glimpse={glimpse}></RichTextEditor>
}
