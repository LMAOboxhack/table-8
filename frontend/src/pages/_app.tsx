import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
// import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import theme from '../theme' // Import your custom theme

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <SessionProvider session={pageProps.session}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </SessionProvider>
  )
}
