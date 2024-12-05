interface ScoreBoardProps {
  score: number
  highScore: number
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex justify-between mb-4 text-2xl font-bold">
      <div className="bg-red-500 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        Score: {score}
      </div>
      <div className="bg-green-500 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        High Score: {highScore}
      </div>
    </div>
  )
}

