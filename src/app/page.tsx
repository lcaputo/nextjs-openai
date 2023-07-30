import Image from 'next/image'
import Chat from './components/chat'

export default function Home() {
  return (
    <main className="grid place-content-center h-screen">
      <Chat />
    </main>
  )
}
