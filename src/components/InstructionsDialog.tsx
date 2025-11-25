import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsDialogProps {
  open: boolean;
  onStart: () => void;
}

export const InstructionsDialog = ({ open, onStart }: InstructionsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md bg-card mc-border">
        <DialogTitle className="text-4xl md:text-6xl font-bold text-center text-primary tracking-wider mb-5 uppercase mc-text-shadow animate-bounce-slow">
          PAC-MAN
        </DialogTitle>
        
        <div className="space-y-4 text-foreground">
          <div className="bg-muted p-4 md:p-5 mc-border text-center">
            <p className="text-base md:text-xl text-foreground leading-relaxed uppercase tracking-wider mc-text-shadow">
              Eat Pellets • Avoid Ghosts
            </p>
            <p className="text-sm md:text-lg text-primary mt-2 uppercase tracking-wider mc-text-shadow font-bold">
              Use Arrow Keys
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-muted p-3 md:p-4 mc-border">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-pellet mx-auto mb-2 pixelated" />
              <span className="text-accent font-bold uppercase text-sm md:text-lg mc-text-shadow">10 Pts</span>
            </div>
            <div className="bg-muted p-3 md:p-4 mc-border">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-power-pellet mx-auto mb-2 animate-pixel-pulse pixelated" />
              <span className="text-accent font-bold uppercase text-sm md:text-lg mc-text-shadow">50 Pts</span>
            </div>
          </div>

          <div className="bg-secondary p-3 md:p-4 mc-border text-center">
            <p className="text-sm md:text-lg text-foreground uppercase tracking-wider mc-text-shadow">
              Power = Blue Ghosts
            </p>
            <p className="text-accent font-bold text-xl md:text-2xl uppercase mc-text-shadow">Eat = 200 Pts</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-14 md:h-20 mt-5 bg-primary hover:bg-primary text-primary-foreground font-bold text-xl md:text-3xl mc-button uppercase tracking-wider"
        >
          Start Game
        </Button>

        <p className="text-center text-sm md:text-lg text-muted-foreground mt-3 animate-pixel-pulse uppercase tracking-wider mc-text-shadow">
          Press Start
        </p>
      </DialogContent>
    </Dialog>
  );
};
