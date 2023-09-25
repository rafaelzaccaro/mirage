import './globals.css'
import type { Metadata } from 'next'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Mirage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
