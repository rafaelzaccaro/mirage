'use client'

import { Box, IconButton, Icon, Stack, Text, Divider } from '@chakra-ui/react'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import { Logo } from './Logo'

export function Footer() {
  return (
    <>
      <Divider my={'5'} />
      <Box bg={'#080810'}>
        <Stack
          direction={'row'}
          pb={'5'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack boxSize={'33%'}>
            <Logo size="35%" />
          </Stack>
          <Stack boxSize={'33%'} alignItems={'center'}>
            <Text>© Rafael Zaccaro</Text>
          </Stack>
          <Stack direction={'row'} boxSize={'33%'} justifyContent={'center'}>
            <IconButton
              icon={<Icon as={AiFillGithub} />}
              aria-label="Github"
              fontSize={'30px'}
              onClick={() =>
                (window.location.href = 'https://github.com/rafaelzaccaro')
              }
            ></IconButton>
            <IconButton
              icon={<Icon as={AiFillTwitterCircle} />}
              aria-label="Twitter"
              fontSize={'30px'}
              onClick={() =>
                (window.location.href = 'https://twitter.com/bluegoldfield')
              }
            ></IconButton>
            <IconButton
              icon={<Icon as={AiFillLinkedin} />}
              aria-label="Linkedin"
              fontSize={'30px'}
              onClick={() =>
                (window.location.href =
                  'https://linkedin.com/in/rafael-zaccaro')
              }
            ></IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
