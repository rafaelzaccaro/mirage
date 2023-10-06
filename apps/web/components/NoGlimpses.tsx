'use client'

import { Center, Highlight, useColorModeValue } from '@chakra-ui/react'

export function NoGlimpses() {
  const fadedColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400')
  const textColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500')
  return (
    <>
      <Center
        h={'351px'}
        fontSize={'3xl'}
        fontStyle={'italic'}
        color={textColor}
      >
        <Highlight query="faded" styles={{ color: fadedColor }}>
          All Glimpses have&nbsp;faded... Why not create a new one?
        </Highlight>
      </Center>
    </>
  )
}
