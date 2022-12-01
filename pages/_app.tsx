import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../features/layout/layout' //craco alias if have time
import {Provider} from 'react-redux'
import { MantineProvider } from "@mantine/core";
// redux persister
import {store} from '../features/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ fontFamily: 'Space Grotesk' }}withGlobalStyles >
      <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Provider>
    </MantineProvider>
  )
}