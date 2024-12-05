import { useCallback, useEffect, useRef, useState } from "react";
import GameControls from "./GameControls";
import GameOverModal from "./GameOverModal";
import ScoreBoard from "./ScoreBoard";

const CANVAS_SIZE = 400;
const SNAKE_SIZE = 20;
const GRID_SIZE = CANVAS_SIZE / SNAKE_SIZE;
const SPEED = 100;
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const lastKeyPressed = useRef(DIRECTIONS.RIGHT);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    head.x += lastKeyPressed.current.x;
    head.y += lastKeyPressed.current.y;

    head.x = (head.x + GRID_SIZE) % GRID_SIZE;
    head.y = (head.y + GRID_SIZE) % GRID_SIZE;

    if (
      newSnake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1);
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, food]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newDir = (() => {
        switch (e.key) {
          case "ArrowUp":
            return DIRECTIONS.UP;
          case "ArrowDown":
            return DIRECTIONS.DOWN;
          case "ArrowLeft":
            return DIRECTIONS.LEFT;
          case "ArrowRight":
            return DIRECTIONS.RIGHT;
          default:
            return null;
        }
      })();

      if (newDir && !isOpposite(newDir, lastKeyPressed.current)) {
        lastKeyPressed.current = newDir;
      }
    };

    const isOpposite = (
      dir1: typeof DIRECTIONS.UP,
      dir2: typeof DIRECTIONS.UP
    ) => {
      return dir1.x === -dir2.x && dir1.y === -dir2.y;
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameLoop);
  }, [gameStarted, moveSnake]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw background
        ctx.fillStyle = "#FFFF00";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw snake
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        snake.forEach(({ x, y }) => {
          ctx.fillRect(x * SNAKE_SIZE, y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
          ctx.strokeRect(
            x * SNAKE_SIZE,
            y * SNAKE_SIZE,
            SNAKE_SIZE,
            SNAKE_SIZE
          );
        });

        // Draw food
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
          food.x * SNAKE_SIZE,
          food.y * SNAKE_SIZE,
          SNAKE_SIZE,
          SNAKE_SIZE
        );
        ctx.strokeRect(
          food.x * SNAKE_SIZE,
          food.y * SNAKE_SIZE,
          SNAKE_SIZE,
          SNAKE_SIZE
        );
      }
    }
  }, [snake, food]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
    lastKeyPressed.current = DIRECTIONS.RIGHT;
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-yellow-300 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
      <ScoreBoard score={score} highScore={highScore} />
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border-2 border-gray-600 mx-auto"
        />
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={startGame}
              className="text-lg bg-blue-500 text-white border-4 border-black hover:bg-blue-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 font-bold"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
      <GameControls onStart={startGame} gameOver={gameOver} />
      {gameOver && <GameOverModal score={score} onRestart={startGame} />}
    </div>
  );
}
