import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsDialogProps {
  open: boolean;
  onStart: () => void;
}

export const InstructionsDialog = ({ open, onStart }: InstructionsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md bg-card border-4 border-primary shadow-[0_0_40px_rgba(255,215,0,0.4)]">
        <DialogTitle className="text-5xl font-bold text-center text-primary tracking-wider font-mono mb-4">
          PAC-MAN
        </DialogTitle>
        
        <div className="space-y-4 text-foreground">
          <div className="bg-background/50 p-4 rounded-lg border-2 border-secondary text-center">
            <p className="text-lg text-muted-foreground leading-relaxed font-mono">
              EAT PELLETS • AVOID GHOSTS
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              USE ARROW KEYS TO MOVE
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="bg-background/50 p-3 rounded border border-border">
              <div className="w-3 h-3 rounded-full bg-pellet mx-auto mb-1" />
              <span className="text-primary font-bold font-mono">10 PTS</span>
            </div>
            <div className="bg-background/50 p-3 rounded border border-border">
              <div className="w-4 h-4 rounded-full bg-power-pellet mx-auto mb-1 shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
              <span className="text-primary font-bold font-mono">50 PTS</span>
            </div>
          </div>

          <div className="bg-background/50 p-3 rounded-lg border-2 border-accent text-center">
            <p className="text-sm text-muted-foreground font-mono">
              POWER PELLETS MAKE GHOSTS BLUE
            </p>
            <p className="text-accent font-bold text-lg font-mono">EAT THEM = 200 PTS</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] transition-all font-mono"
        >
          START GAME
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-3 font-mono animate-pulse">
          PRESS START TO PLAY
        </p>
      </DialogContent>
    </Dialog>
  );
};
