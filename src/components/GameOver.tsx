import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-4 md:space-y-6 p-6 md:p-8 bg-card arcade-border backdrop-blur-sm animate-flicker">
        <h2 className="text-3xl md:text-5xl font-bold text-neon-pink tracking-wider uppercase animate-pulse-neon">
          Game Over
        </h2>
        <div className="space-y-2">
          <div className="text-muted-foreground text-xs md:text-lg uppercase tracking-widest">Final Score</div>
          <div className="text-4xl md:text-6xl font-bold text-neon-yellow tracking-wider uppercase">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <Button
          onClick={onRestart}
          size="lg"
          className="h-12 md:h-16 px-6 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm md:text-xl arcade-glow hover:scale-105 transition-all uppercase"
        >
          <RotateCcw className="mr-2 h-4 w-4 md:h-6 md:w-6" />
          Play Again
        </Button>
      </div>
    </div>
  );
};
