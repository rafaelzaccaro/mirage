'use client'

import { Center, Text, useColorModeValue } from '@chakra-ui/react'

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
        All Glimpses have&nbsp;
        <Text fontSize={'3xl'} fontStyle={'italic'} color={fadedColor}>
          faded
        </Text>
        ... Why not create a new one?
      </Center>
    </>
  )
}
