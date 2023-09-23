'use client'

import { Card, Image, CardBody, Stack, Heading } from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import { golos } from '@web/app/theme'
import Link from 'next/link'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface GlimpseCardProps {
  slug: string
  content: string
  lifetime: Date
  secret: string | null
  thumb: string
  className: string
}

export function GlimpseCard({
  slug,
  content,
  secret,
  thumb,
  className,
}: GlimpseCardProps) {
  return (
    <Card maxW="350px" background={'blackAlpha.500'} className={className}>
      <Link href={'/' + slug}>
        <CardBody>
          <Image
            src={thumb}
            alt=""
            borderRadius="md"
            fit={'scale-down'}
            maxH={'200px'}
          />
          <Stack mt="6" spacing="3">
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Heading size="md" fontFamily={golos.style.fontFamily}>
                {slug}
              </Heading>
              {secret ? <LockIcon /> : <UnlockIcon />}
            </Stack>
            <ReactQuill
              value={content}
              modules={{ toolbar: false }}
              readOnly
            ></ReactQuill>
          </Stack>
        </CardBody>
      </Link>
    </Card>
  )
}
