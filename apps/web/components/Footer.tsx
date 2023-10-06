'use client'

import {
  Box,
  IconButton,
  Icon,
  Stack,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import { Logo } from './Logo'
import { AboutModal } from './AboutModal'

export function Footer() {
  const bgColor = useColorModeValue('#ffffff', '#080810')
  return (
    <>
      <Divider my={'5'} />
      <Box bg={bgColor}>
        <Stack
          direction={'row'}
          pb={'5'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack boxSize={'33%'}>
            <Logo size="35%" />
          </Stack>
          <Stack boxSize={'33%'} alignItems={'center'} direction={'column'}>
            <Text>© Rafael Zaccaro</Text>
            <AboutModal />
          </Stack>
          <Stack direction={'row'} boxSize={'33%'} justifyContent={'center'}>
            <IconButton
              icon={<Icon as={AiFillGithub} />}
              variant={'ghost'}
              aria-label="Github"
              fontSize={'30px'}
              onClick={() =>
                (window.location.href = 'https://github.com/rafaelzaccaro')
              }
            ></IconButton>
            <IconButton
              icon={<Icon as={AiFillTwitterCircle} />}
              variant={'ghost'}
              aria-label="Twitter"
              fontSize={'30px'}
              onClick={() =>
                (window.location.href = 'https://twitter.com/bluegoldfield')
              }
            ></IconButton>
            <IconButton
              icon={<Icon as={AiFillLinkedin} />}
              variant={'ghost'}
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
