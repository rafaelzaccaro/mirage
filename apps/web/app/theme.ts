import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Golos_Text } from 'next/font/google'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })
export const golos = Golos_Text({ subsets: ['latin'] })
export default theme
