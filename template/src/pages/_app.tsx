import { AppProps } from 'next/app'
import '../styles/main.scss'
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp