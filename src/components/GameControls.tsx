import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface GameControlsProps {
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
  score: number;
  lives: number;
}

export const GameControls = ({
  isPlaying,
  onStart,
  onPause,
  onRestart,
  score,
  lives,
}: GameControlsProps) => {
  return (
    <div className="w-full max-w-md space-y-4 md:space-y-6">
      <div className="flex justify-between items-center bg-card arcade-border p-3 md:p-4 backdrop-blur-sm">
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-[0.5rem] md:text-xs mb-1 md:mb-2 uppercase tracking-widest">Score</div>
          <div className="text-xl md:text-3xl font-bold text-neon-yellow tracking-wider uppercase">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <div className="h-10 md:h-12 w-px bg-secondary mx-2 md:mx-4" />
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-[0.5rem] md:text-xs mb-1 md:mb-2 uppercase tracking-widest">Lives</div>
          <div className="flex justify-center gap-1 md:gap-2">
            {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary arcade-glow animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        {!isPlaying ? (
          <Button
            onClick={onStart}
            className="flex-1 h-12 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs md:text-lg arcade-glow hover:scale-105 transition-all uppercase"
          >
            <Play className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" />
            Start
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="outline"
            className="flex-1 h-12 md:h-14 border-2 md:border-3 border-secondary text-neon-cyan font-bold text-xs md:text-lg hover:bg-secondary/20 uppercase"
          >
            <Pause className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" />
            Pause
          </Button>
        )}
        <Button
          onClick={onRestart}
          variant="outline"
          className="h-12 md:h-14 px-4 md:px-6 border-2 md:border-3 border-accent text-neon-pink font-bold hover:bg-accent/20"
        >
          <RotateCcw className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
      </div>

      <div className="text-center text-muted-foreground text-[0.5rem] md:text-xs bg-card/50 p-2 md:p-3 arcade-border uppercase tracking-widest">
        Use <span className="text-neon-cyan font-bold">Arrow Keys</span> to move
      </div>
    </div>
  );
};
