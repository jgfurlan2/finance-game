import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  input.form-control {
    box-shadow: none !important;

    :focus {
      border-color: var(--bs-blue);
    }
  }
`

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Finance Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}
