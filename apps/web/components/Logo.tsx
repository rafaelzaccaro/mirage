'use client'

import { Center, Image, useColorModeValue } from '@chakra-ui/react'

interface props {
  size?: string
}

export function Logo({ size }: props) {
  return (
    <Center>
      <Image
        src="/logo.svg"
        alt="logo"
        boxSize={size ? size : '30%'}
        mt={'5'}
        mb={'5'}
        className={useColorModeValue('', 'invert')}
      />
    </Center>
  )
}
