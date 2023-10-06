import { Logo } from '@web/components/Logo'
import { Stack, Text, Link } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'flex-start'}
      minH={'100vh'}
      direction={'row'}
    >
      <Stack boxSize={'33%'}>
        <Logo size="50%" />
      </Stack>
      <Stack direction={'column'} boxSize={'66%'}>
        <Text fontSize={'2xl'}>
          404 - The page you were looking for is a mere optical illusion...
        </Text>
        <Link href={'/'}>Back to home page</Link>
      </Stack>
    </Stack>
  )
}
