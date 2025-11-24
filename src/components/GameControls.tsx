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
    <div className="w-full max-w-md space-y-6">
      <div className="flex justify-between items-center bg-card border-2 border-secondary rounded-lg p-4 shadow-[0_0_20px_rgba(30,144,255,0.3)]">
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-sm mb-1">SCORE</div>
          <div className="text-3xl font-bold text-primary tracking-wider font-mono">
            {score.toString().padStart(5, "0")}
          </div>
        </div>
        <div className="h-12 w-px bg-secondary mx-4" />
        <div className="text-center flex-1">
          <div className="text-muted-foreground text-sm mb-1">LIVES</div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-primary shadow-[0_0_10px_rgba(255,215,0,0.6)]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {!isPlaying ? (
          <Button
            onClick={onStart}
            className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all"
          >
            <Play className="mr-2 h-6 w-6" />
            START
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="outline"
            className="flex-1 h-14 border-2 border-secondary text-foreground font-bold text-lg hover:bg-secondary/20"
          >
            <Pause className="mr-2 h-6 w-6" />
            PAUSE
          </Button>
        )}
        <Button
          onClick={onRestart}
          variant="outline"
          className="h-14 px-6 border-2 border-secondary text-foreground font-bold hover:bg-secondary/20"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      <div className="text-center text-muted-foreground text-sm bg-card/50 rounded-lg p-3 border border-border">
        Use <span className="text-primary font-bold">ARROW KEYS</span> to move
      </div>
    </div>
  );
};
