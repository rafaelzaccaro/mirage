'use client'

import { Card, Image, CardBody, Stack, Heading, Link } from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import { golos } from '@web/app/theme'
import NextLink from 'next/link'
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
    <Card minW="200px" maxW="350px" className={className}>
      <Link as={NextLink} href={'/' + slug} style={{ textDecoration: 'none' }}>
        <CardBody>
          <Image
            src={thumb}
            alt=""
            borderRadius="md"
            objectFit={'cover'}
            maxH={'200px'}
            minH={'100px'}
            minW={'100%'}
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
