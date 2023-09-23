'use client'

import { Stack } from '@chakra-ui/react'
import { GlimpseCard } from './GlimpseCard'
import useEmblaCarousel from 'embla-carousel-react'
import { Glimpse } from '@web/lib/GlimpseType'

function truncateText(text: string): string {
  return text.length > 255 ? text.substring(0, 255) + '...' : text
}

interface props {
  data: Glimpse[]
}

export const Carousel: React.FC<props> = (glimpses: props) => {
  const [emblaRef] = useEmblaCarousel()
  return (
    <div className="embla" ref={emblaRef}>
      <Stack direction={'row'} spacing={'3'} className="embla__container">
        {glimpses.data.map((glimpse: Glimpse) => {
          return (
            <GlimpseCard
              key={glimpse.id}
              slug={glimpse.slug}
              content={truncateText(glimpse.content)}
              secret={glimpse.secret}
              lifetime={glimpse.lifetime}
              thumb={glimpse.thumb}
              className="embla__slide"
            />
          )
        })}
      </Stack>
    </div>
  )
}
