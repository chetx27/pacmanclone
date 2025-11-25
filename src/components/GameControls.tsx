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
      <div className="flex justify-between items-center bg-card mc-border p-4 md:p-5">
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-sm md:text-xl mb-2 uppercase tracking-wider mc-text-shadow">Score</div>
          <div className="text-2xl md:text-4xl font-bold text-accent tracking-wider uppercase mc-text-shadow">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <div className="h-12 md:h-16 w-1 bg-border mx-3 md:mx-4" />
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-sm md:text-xl mb-2 uppercase tracking-wider mc-text-shadow">Lives</div>
          <div className="flex justify-center gap-1 md:gap-2">
            {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-accent animate-pixel-pulse pixelated"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        {!isPlaying ? (
          <Button
            onClick={onStart}
            className="flex-1 h-14 md:h-16 bg-primary hover:bg-primary text-primary-foreground font-bold text-base md:text-2xl mc-button uppercase tracking-wider"
          >
            <Play className="mr-2 h-5 w-5 md:h-7 md:w-7" />
            Start
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="outline"
            className="flex-1 h-14 md:h-16 bg-secondary hover:bg-secondary text-secondary-foreground font-bold text-base md:text-2xl mc-button uppercase tracking-wider"
          >
            <Pause className="mr-2 h-5 w-5 md:h-7 md:w-7" />
            Pause
          </Button>
        )}
        <Button
          onClick={onRestart}
          variant="outline"
          className="h-14 md:h-16 px-5 md:px-7 bg-destructive hover:bg-destructive text-destructive-foreground font-bold mc-button"
        >
          <RotateCcw className="h-5 w-5 md:h-7 md:w-7" />
        </Button>
      </div>

      <div className="text-center text-foreground text-sm md:text-xl bg-muted p-3 md:p-4 mc-border uppercase tracking-wider mc-text-shadow">
        Use <span className="text-primary font-bold">Arrow Keys</span>
      </div>
    </div>
  );
};
