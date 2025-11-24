import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsDialogProps {
  open: boolean;
  onStart: () => void;
}

export const InstructionsDialog = ({ open, onStart }: InstructionsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl bg-card border-4 border-primary shadow-[0_0_40px_rgba(255,215,0,0.4)]">
        <DialogTitle className="text-4xl font-bold text-center text-primary tracking-wider font-mono mb-6">
          PAC-MAN
        </DialogTitle>
        
        <div className="space-y-6 text-foreground">
          <div className="bg-background/50 p-4 rounded-lg border-2 border-secondary">
            <h3 className="text-xl font-bold text-secondary mb-3 font-mono">HOW TO PLAY</h3>
            <p className="text-muted-foreground leading-relaxed">
              Navigate through the maze and eat all the pellets while avoiding the ghosts. 
              Use the <span className="text-primary font-bold">ARROW KEYS</span> to move Pac-Man.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/50 p-4 rounded-lg border-2 border-border">
              <h4 className="text-lg font-bold text-primary mb-2 font-mono">PELLETS</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pellet" />
                  <span>Small Pellet = <span className="text-primary font-bold">10 Points</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-power-pellet shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                  <span>Power Pellet = <span className="text-primary font-bold">50 Points</span></span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border-2 border-border">
              <h4 className="text-lg font-bold text-destructive mb-2 font-mono">GHOSTS</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-game-ghost-red" />
                    <div className="w-3 h-3 rounded-full bg-game-ghost-pink" />
                    <div className="w-3 h-3 rounded-full bg-game-ghost-cyan" />
                    <div className="w-3 h-3 rounded-full bg-game-ghost-orange" />
                  </div>
                  <span>Avoid the ghosts!</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span>Scared Ghost = <span className="text-primary font-bold">200 Points</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border-2 border-accent">
            <h4 className="text-lg font-bold text-accent mb-2 font-mono">POWER PELLETS</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Eat a power pellet to turn the ghosts blue! While they are scared, you can eat them 
              for bonus points. But hurry - the effect does not last long!
            </p>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border-2 border-border">
            <h4 className="text-lg font-bold text-foreground mb-2 font-mono">THE GHOSTS</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-game-ghost-red" />
                <span><span className="text-game-ghost-red font-bold">BLINKY</span> - Chases you directly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-game-ghost-pink" />
                <span><span className="text-game-ghost-pink font-bold">PINKY</span> - Tries to ambush you</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-game-ghost-cyan" />
                <span><span className="text-game-ghost-cyan font-bold">INKY</span> - Patrols and attacks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-game-ghost-orange" />
                <span><span className="text-game-ghost-orange font-bold">CLYDE</span> - Unpredictable movement</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-16 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-2xl shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] transition-all font-mono"
        >
          START GAME
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          INSERT COIN TO CONTINUE
        </p>
      </DialogContent>
    </Dialog>
  );
};
