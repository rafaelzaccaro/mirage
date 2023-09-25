'use client'

import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  CircularProgress,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import { getPercentage } from '@web/lib/parseLifetime'
import { useEffect, useState } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface GlimpseCardProps {
  slug: string
  content: string
  lifetime: Date
  secret: string | null
  thumb: string
  className: string
  createdAt: Date
}

export function GlimpseCard({
  slug,
  content,
  secret,
  thumb,
  className,
  lifetime,
  createdAt,
}: GlimpseCardProps) {
  const [lifetimePercentage, setLifetimePercentage] = useState<number>(
    getPercentage(createdAt, lifetime),
  )
  const circularProgressColor = useColorModeValue(
    'blackAlpha.900',
    'whiteAlpha.800',
  )
  const circularProgressTrackColor = useColorModeValue(
    'whiteAlpha.400',
    'blackAlpha.400',
  )
  useEffect(() => {
    const interval = setInterval(
      () => setLifetimePercentage(getPercentage(createdAt, lifetime)),
      3600000,
    )
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LinkBox as={Card} minW="200px" maxW="350px" className={className}>
      <LinkOverlay href={'/' + slug} style={{ textDecoration: 'none' }}>
        <CardBody>
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              borderRadius="md"
              objectFit={'cover'}
              maxH={'200px'}
              minH={'100px'}
              minW={'100%'}
            />
          ) : (
            ''
          )}
          <Stack mt={thumb ? '6' : '0'} spacing="3">
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Heading size="md">{slug}</Heading>
              {secret ? <LockIcon /> : <UnlockIcon />}
            </Stack>
            <ReactQuill
              value={content}
              modules={{ toolbar: false }}
              theme=""
              style={{ fontFamily: `"Golos Text"` }}
              readOnly
            />
          </Stack>
        </CardBody>
        <CircularProgress
          value={lifetimePercentage}
          size={'30px'}
          trackColor={circularProgressTrackColor}
          color={circularProgressColor}
          pos={'absolute'}
          bottom={'10px'}
          right={'10px'}
          capIsRound
        />
      </LinkOverlay>
    </LinkBox>
  )
}
