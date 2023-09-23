'use client'

import { Card, Image, CardBody, Stack, Heading } from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface GlimpeCardProps {
  slug: string,
  content: string,
  lifetime: Date,
  secret: string,
  thumb: string
}

export function GlimpseCard({slug, content, secret, thumb}: GlimpeCardProps) {
  return (
    <Card maxW='350px'>
      <CardBody>
        <Image
          src = { thumb }
          alt = ''
          borderRadius = 'md'
          fit={'scale-down'}
          maxH={'200px'}
        />
        <Stack mt='6' spacing='3'>
          <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
            <Heading size='md'>{slug}</Heading>
            {secret ? <LockIcon></LockIcon> : <UnlockIcon></UnlockIcon>}
          </Stack>
          <ReactQuill value={ content } modules={{ toolbar: false }} readOnly></ReactQuill>
        </Stack>
      </CardBody>
    </Card>
  )
}