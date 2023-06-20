import './globals.scss'
import Header from './components/Header/Header'
import Providers from './store/Providers'
import Footer from './components/Footer/Footer'
import { getCats } from '@/options/fetches'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cats = await getCats()

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header cats={cats} />
          <div className="container main_container">
            {children}
          </div>
          <Footer cats={cats} />
        </Providers>
      </body>
    </html>
  )
}
