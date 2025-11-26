import { useState } from "react";
import { GameCanvas } from "@/components/GameCanvas";
import { GameControls } from "@/components/GameControls";
import { GameOver } from "@/components/GameOver";
import { InstructionsDialog } from "@/components/InstructionsDialog";
import { Game } from "@/lib/game";

const Index = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleGameInit = (gameInstance: Game) => {
    gameInstance.setCallbacks(
      (newScore) => setScore(newScore),
      (newLives) => setLives(newLives),
      () => {
        setIsGameOver(true);
        setIsPlaying(false);
      }
    );
    setGame(gameInstance);
  };

  const handleStart = () => {
    setShowInstructions(false);
    if (game) {
      game.start();
      setIsPlaying(true);
      setIsGameOver(false);
    }
  };

  const handlePause = () => {
    if (game) {
      game.stop();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (game) {
      game.restart();
      setScore(0);
      setLives(3);
      setIsGameOver(false);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent pointer-events-none" />
      
      <InstructionsDialog open={showInstructions} onStart={handleStart} />
      
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start relative z-10">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neon-yellow tracking-wider text-center animate-pulse-neon uppercase">
            PAC-MAN
          </h1>
          <div className="relative arcade-border p-2 bg-black/50 backdrop-blur-sm">
            <GameCanvas game={game} setGame={handleGameInit} />
            {isGameOver && <GameOver score={score} onRestart={handleRestart} />}
          </div>
        </div>
        <GameControls
          isPlaying={isPlaying}
          onStart={handleStart}
          onPause={handlePause}
          onRestart={handleRestart}
          score={score}
          lives={lives}
          game={game}
        />
      </div>
    </div>
  );
};

export default Index;
