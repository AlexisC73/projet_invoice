import Header from '@/components/Header/Header'

export default function Home() {
  return (
    <main className='flex justify-center min-h-screen'>
      <Header />
      <section id='content' className='flex-1'></section>
    </main>
  )
}
