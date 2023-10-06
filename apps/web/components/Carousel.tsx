'use client'

import { Stack } from '@chakra-ui/react'
import { GlimpseCard } from './GlimpseCard'
import useEmblaCarousel from 'embla-carousel-react'
import { Glimpse } from '@web/lib/GlimpseType'

function truncateText(text: string, hasImg: boolean): string {
  return hasImg
    ? text.length > 255
      ? text.substring(0, 255) + '...'
      : text
    : text.length > 512
    ? text.substring(0, 512) + '...'
    : text
}

interface props {
  data: Glimpse[]
}

export const Carousel: React.FC<props> = (glimpses: props) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })
  return (
    <div className="embla" ref={emblaRef}>
      <Stack direction={'row'} spacing={'3'} className="embla__container">
        {glimpses.data.map((glimpse: Glimpse) => {
          return (
            <GlimpseCard
              key={glimpse.id}
              slug={glimpse.slug}
              content={truncateText(glimpse.content, !!glimpse.thumb)}
              secret={glimpse.secret}
              lifetime={glimpse.lifetime}
              createdAt={glimpse.createdAt}
              thumb={
                glimpse.thumb
                  ? process.env.NEXT_PUBLIC_SERVER_URL + glimpse.thumb
                  : glimpse.thumb
              }
              className="embla__slide"
            />
          )
        })}
      </Stack>
    </div>
  )
}
