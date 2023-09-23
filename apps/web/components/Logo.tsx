'use client'

import { Center, Image, useColorModeValue } from '@chakra-ui/react'

export function Logo() {
  return (
    <Center>
      <Image
        src="/logo.svg"
        alt="logo"
        boxSize={'auto'}
        mt={'3'}
        mb={'3'}
        className={useColorModeValue('', 'invert')}
      />
    </Center>
  )
}
