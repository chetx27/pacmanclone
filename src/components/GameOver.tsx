import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg">
      <div className="text-center space-y-6 p-8 bg-card border-4 border-destructive rounded-lg shadow-[0_0_40px_rgba(255,0,0,0.4)] animate-scale-in">
        <h2 className="text-5xl font-bold text-destructive tracking-wider font-mono">
          GAME OVER
        </h2>
        <div className="space-y-2">
          <div className="text-muted-foreground text-lg">FINAL SCORE</div>
          <div className="text-6xl font-bold text-primary tracking-wider font-mono">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <Button
          onClick={onRestart}
          size="lg"
          className="h-16 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all"
        >
          <RotateCcw className="mr-2 h-6 w-6" />
          PLAY AGAIN
        </Button>
      </div>
    </div>
  );
};
