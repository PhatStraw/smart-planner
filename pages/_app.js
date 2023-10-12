import 'components/styles/globals.css'
import { Roboto } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Roboto({ subsets: ['latin'],weight: '500' })
export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  )
}
