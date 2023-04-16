import { Roboto } from 'next/font/google'

const inter = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] })

export default function Home() {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
}
