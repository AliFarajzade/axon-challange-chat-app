import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body style={{ backgroundImage: 'url(/bg.jpg)' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
