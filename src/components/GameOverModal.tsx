interface GameOverModalProps {
  score: number
  onRestart: () => void
}

export default function GameOverModal({ score, onRestart }: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
        <p className="text-xl mb-6">Your score: {score}</p>
        <button 
          onClick={onRestart}
          className="w-full text-lg bg-blue-500 text-white border-4 border-black hover:bg-blue-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 font-bold"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

