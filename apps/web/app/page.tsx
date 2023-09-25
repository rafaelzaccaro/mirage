import { Footer } from '@web/components/Footer'
import { Stack, Divider, Text } from '@chakra-ui/react'
import { Carousel } from '@web/components/Carousel'
import { Glimpse } from '@web/lib/GlimpseType'
import { NewGlimpseModal } from '@web/components/NewGlimpseModal'
import { Header } from '@web/components/Header'
import { NoGlimpses } from '@web/components/NoGlimpses'

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

  async function glimpseCleanup() {
    await fetch('http://localhost:7777/deleteExpired', {
      method: 'delete',
      cache: 'no-store',
    })

    setTimeout(glimpseCleanup, 3600000)
  }

  glimpseCleanup()

  return (
    <>
      <Header />
      <Divider mt={'3'} mb={'5'} />
      <Stack direction={'column'} spacing={'2'} mx={'20'}>
        <Text fontSize={'4xl'}>🔥Popular</Text>
        {popular.length > 0 ? (
          <Carousel data={popular}></Carousel>
        ) : (
          <NoGlimpses />
        )}
        <Text fontSize={'4xl'} mt={'5'}>
          🆕Recent
        </Text>
        {recent.length > 0 ? (
          <Carousel data={recent}></Carousel>
        ) : (
          <NoGlimpses />
        )}
      </Stack>
      <NewGlimpseModal />
      <Footer />
    </>
  )
}
