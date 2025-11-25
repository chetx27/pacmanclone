import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-5 md:space-y-7 p-7 md:p-10 bg-card mc-border animate-pixel-pulse">
        <h2 className="text-4xl md:text-7xl font-bold text-destructive tracking-wider uppercase mc-text-shadow">
          Game Over
        </h2>
        <div className="space-y-3">
          <div className="text-muted-foreground text-base md:text-2xl uppercase tracking-wider mc-text-shadow">Final Score</div>
          <div className="text-5xl md:text-8xl font-bold text-accent tracking-wider uppercase mc-text-shadow">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <Button
          onClick={onRestart}
          size="lg"
          className="h-14 md:h-20 px-8 md:px-12 bg-primary hover:bg-primary text-primary-foreground font-bold text-lg md:text-3xl mc-button uppercase tracking-wider"
        >
          <RotateCcw className="mr-3 h-6 w-6 md:h-8 md:w-8" />
          Play Again
        </Button>
      </div>
    </div>
  );
};
