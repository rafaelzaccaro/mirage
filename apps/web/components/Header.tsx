'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'
import { Logo } from './Logo'

export function Header() {
  const bgColor = useColorModeValue('#ffffff', '#080810')

  return (
    <Box bg={bgColor}>
      <Logo />
    </Box>
  )
}
