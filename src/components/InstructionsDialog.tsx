import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsDialogProps {
  open: boolean;
  onStart: () => void;
}

export const InstructionsDialog = ({ open, onStart }: InstructionsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md bg-card arcade-border backdrop-blur-sm">
        <DialogTitle className="text-3xl md:text-4xl font-bold text-center text-neon-yellow tracking-wider mb-4 uppercase animate-pulse-neon">
          PAC-MAN
        </DialogTitle>
        
        <div className="space-y-3 md:space-y-4 text-foreground">
          <div className="bg-background/50 p-3 md:p-4 arcade-border text-center">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed uppercase tracking-widest">
              Eat Pellets • Avoid Ghosts
            </p>
            <p className="text-[0.6rem] md:text-xs text-neon-cyan mt-2 uppercase tracking-widest">
              Use Arrow Keys
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 text-center text-xs">
            <div className="bg-background/50 p-2 md:p-3 arcade-border">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pellet mx-auto mb-1 arcade-glow" />
              <span className="text-neon-yellow font-bold uppercase text-[0.6rem] md:text-xs">10 Pts</span>
            </div>
            <div className="bg-background/50 p-2 md:p-3 arcade-border">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-power-pellet mx-auto mb-1 arcade-glow animate-pulse" />
              <span className="text-neon-yellow font-bold uppercase text-[0.6rem] md:text-xs">50 Pts</span>
            </div>
          </div>

          <div className="bg-background/50 p-2 md:p-3 arcade-border text-center">
            <p className="text-[0.6rem] md:text-xs text-muted-foreground uppercase tracking-widest">
              Power = Blue Ghosts
            </p>
            <p className="text-neon-pink font-bold text-sm md:text-base uppercase">Eat = 200 Pts</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-12 md:h-14 mt-3 md:mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm md:text-xl arcade-glow hover:scale-105 transition-all uppercase"
        >
          Start Game
        </Button>

        <p className="text-center text-[0.5rem] md:text-xs text-muted-foreground mt-2 md:mt-3 animate-pulse uppercase tracking-widest">
          Press Start
        </p>
      </DialogContent>
    </Dialog>
  );
};
