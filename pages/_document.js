import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <h3 className='w-full text-center text-5xl md:hidden'>Smart Travel</h3>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
