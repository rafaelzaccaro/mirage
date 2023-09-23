import { Logo } from '@web/components/Logo'
import { Stack, Divider, Text, useDisclosure } from '@chakra-ui/react'
import { golos } from './theme'
import { Carousel } from '@web/components/Carousel'
import { Glimpse } from '@web/lib/GlimpseType'
import { NewGlimpseModal } from '@web/components/NewGlimpseModal'

export default async function Home() {
  const popular: Glimpse[] = await (
    await fetch('http://localhost:7777/glimpses/popular', {
      cache: 'no-store',
    })
  ).json()
  const recent: Glimpse[] = await (
    await fetch('http://localhost:7777/glimpses/recent', {
      cache: 'no-store',
    })
  ).json()

  return (
    <>
      <Logo />
      <Divider mt={'3'} mb={'5'} />
      <Stack direction={'column'} spacing={'2'} ml={'20'}>
        <Text fontSize={'4xl'} fontFamily={golos.style.fontFamily}>
          🔥Popular
        </Text>
        <Carousel data={popular}></Carousel>
        <Text fontSize={'4xl'} fontFamily={golos.style.fontFamily} mt={'5'}>
          🆕Recent
        </Text>
        <Carousel data={recent}></Carousel>
      </Stack>
      <NewGlimpseModal />
    </>
  )
}
