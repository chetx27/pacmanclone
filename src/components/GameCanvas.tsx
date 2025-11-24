import { useEffect, useRef } from "react";
import { Game } from "@/lib/game";

interface GameCanvasProps {
  game: Game | null;
  setGame: (game: Game) => void;
}

export const GameCanvas = ({ game, setGame }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 448;
    canvas.height = 496;

    // Initialize game
    const newGame = new Game(ctx, canvas.width, canvas.height);
    setGame(newGame);

    return () => {
      newGame.cleanup();
    };
  }, [setGame]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border-4 border-secondary rounded-lg shadow-[0_0_30px_rgba(30,144,255,0.5)]"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};
