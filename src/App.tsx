import Game from './components/Game'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-300">
      <h1 className="text-6xl font-bold mb-8 text-black bg-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Snake Game
      </h1>
      <Game />
      <div className="mt-8">
      </div>
    </main>
  )
}

