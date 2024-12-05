import Game from './components/Game'
import GitHubButton from './components/GithubButton'

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-center p-24 bg-pink-300">
      <div className='flex flex-row items-center justify-center gap-4 m-10'>
      <h1 className="text-2xl font-bold w-64 h-16 flex items-center justify-center text-black bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Snake Game
      </h1><GitHubButton /></div>
      
      <Game />
      <div className="mt-8">
      </div>
    </main>
  )
}

