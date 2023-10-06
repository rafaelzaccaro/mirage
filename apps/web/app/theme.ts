import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  colors: {
    white: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#f2f2f2', //#bfbfbf
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#0d0d0d', //#737373
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
  },
  fonts: {
    body: `"Golos Text"`,
    heading: `"Golos Text"`,
  },
  styles: {
    global: {
      body: {
        _dark: {
          bg: '#080810',
        },
      },
    },
  },
  components: {
    Card: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: {
          bg: mode('blackAlpha.200', '#18181b')(props),
        },
      }),
    },
    Modal: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: mode('white', '#222226')(props),
          color: mode('gray.800', 'whiteAlpha.900')(props),
        },
        header: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
        },
      }),
    },
    Popover: {
      baseStyle: (props: StyleFunctionProps) => ({
        content: {
          bg: mode('gray.50', '#222226')(props),
        },
        header: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
        },
        body: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
        },
      }),
    },
  },
})
export default theme
