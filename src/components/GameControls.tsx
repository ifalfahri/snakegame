interface GameControlsProps {
  onStart: () => void
  gameOver: boolean
}

export default function GameControls({ onStart, gameOver }: GameControlsProps) {
  return (
    <div className="mt-4 flex justify-center">
      <button 
        onClick={onStart} 
        className="text-lg bg-purple-500 text-white border-4 border-black hover:bg-purple-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 font-bold"
      >
        {gameOver ? 'Restart Game' : 'New Game'}
      </button>
    </div>
  )
}

