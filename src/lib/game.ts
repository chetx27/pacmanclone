const CELL_SIZE = 16;
const COLS = 28;
const ROWS = 31;

const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  x: number;
  y: number;
  color: string;
  speed: number;
  scared: boolean;
  mode: "house" | "exiting" | "chase" | "scatter";
  scatterTarget: { x: number; y: number };
}

export class Game {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private pacman: Position & { direction: string; nextDirection: string; speed: number };
  private ghosts: Ghost[];
  private pellets: boolean[][];
  private powerPellets: Position[];
  private score: number;
  private lives: number;
  private isRunning: boolean;
  private animationFrame: number | null;
  private lastTime: number;
  private mouthAngle: number;
  private mouthOpening: boolean;
  private scaredTimer: number;
  private onScoreChange?: (score: number) => void;
  private onLivesChange?: (lives: number) => void;
  private onGameOver?: () => void;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.pacman = { x: 13.5, y: 23, direction: "RIGHT", nextDirection: "RIGHT", speed: 0.1 };
    this.ghosts = [
      { x: 13.5, y: 11, color: "#FF0000", speed: 0.075, scared: false, mode: "chase", scatterTarget: { x: 25, y: 0 } },
      { x: 11.5, y: 14, color: "#FFB8FF", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 2, y: 0 } },
      { x: 13.5, y: 14, color: "#00FFFF", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 27, y: 31 } },
      { x: 15.5, y: 14, color: "#FFB852", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 0, y: 31 } },
    ];
    this.pellets = [];
    this.powerPellets = [];
    this.score = 0;
    this.lives = 3;
    this.isRunning = false;
    this.animationFrame = null;
    this.lastTime = 0;
    this.mouthAngle = 0;
    this.mouthOpening = true;
    this.scaredTimer = 0;
    
    this.initPellets();
    this.setupControls();
    this.draw();
  }

  private initPellets() {
    this.pellets = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (MAZE[row][col] === 2) {
          this.pellets[row][col] = true;
        } else if (MAZE[row][col] === 3) {
          this.powerPellets.push({ x: col, y: row });
        }
      }
    }
  }

  private setupControls() {
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const directions: Record<string, string> = {
          ArrowUp: "UP",
          ArrowDown: "DOWN",
          ArrowLeft: "LEFT",
          ArrowRight: "RIGHT",
        };
        this.pacman.nextDirection = directions[e.key];
      }
    });
  }

  public setCallbacks(
    onScoreChange: (score: number) => void,
    onLivesChange: (lives: number) => void,
    onGameOver: () => void
  ) {
    this.onScoreChange = onScoreChange;
    this.onLivesChange = onLivesChange;
    this.onGameOver = onGameOver;
  }

  private canMove(x: number, y: number): boolean {
    const col = Math.floor(x);
    const row = Math.floor(y);
    
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
    
    return MAZE[row][col] !== 1;
  }

  private updatePacman(deltaTime: number) {
    const movement = this.pacman.speed * deltaTime * 60;
    
    // Try to change direction
    let newX = this.pacman.x;
    let newY = this.pacman.y;
    
    if (this.pacman.nextDirection === "UP") newY -= movement;
    else if (this.pacman.nextDirection === "DOWN") newY += movement;
    else if (this.pacman.nextDirection === "LEFT") newX -= movement;
    else if (this.pacman.nextDirection === "RIGHT") newX += movement;
    
    if (this.canMove(newX, newY)) {
      this.pacman.direction = this.pacman.nextDirection;
    }
    
    // Move in current direction
    newX = this.pacman.x;
    newY = this.pacman.y;
    
    if (this.pacman.direction === "UP") newY -= movement;
    else if (this.pacman.direction === "DOWN") newY += movement;
    else if (this.pacman.direction === "LEFT") newX -= movement;
    else if (this.pacman.direction === "RIGHT") newX += movement;
    
    if (this.canMove(newX, newY)) {
      this.pacman.x = newX;
      this.pacman.y = newY;
    }

    // Wrap around
    if (this.pacman.x < 0) this.pacman.x = COLS - 1;
    if (this.pacman.x >= COLS) this.pacman.x = 0;
    
    // Eat pellets
    const col = Math.floor(this.pacman.x);
    const row = Math.floor(this.pacman.y);
    
    if (this.pellets[row]?.[col]) {
      this.pellets[row][col] = false;
      this.score += 10;
      if (this.onScoreChange) this.onScoreChange(this.score);
    }
    
    // Eat power pellets
    const powerPelletIndex = this.powerPellets.findIndex(
      p => Math.floor(p.x) === col && Math.floor(p.y) === row
    );
    if (powerPelletIndex !== -1) {
      this.powerPellets.splice(powerPelletIndex, 1);
      this.score += 50;
      this.scaredTimer = 300;
      this.ghosts.forEach(g => g.scared = true);
      if (this.onScoreChange) this.onScoreChange(this.score);
    }
  }

  private updateGhosts(deltaTime: number) {
    if (this.scaredTimer > 0) {
      this.scaredTimer--;
      if (this.scaredTimer === 0) {
        this.ghosts.forEach(g => g.scared = false);
      }
    }

    this.ghosts.forEach((ghost, index) => {
      const movement = ghost.speed * deltaTime * 60;
      
      let targetX = ghost.x;
      let targetY = ghost.y;
      
      // Handle ghost house exit
      if (ghost.mode === "house") {
        // Move to center of ghost house first
        if (Math.abs(ghost.x - 13.5) > 0.1) {
          targetX = ghost.x + (ghost.x < 13.5 ? movement : -movement);
        } else {
          ghost.mode = "exiting";
        }
      } else if (ghost.mode === "exiting") {
        // Exit upward to row 11
        if (ghost.y > 11.5) {
          targetY = ghost.y - movement;
        } else {
          ghost.mode = "chase";
        }
      } else if (ghost.scared) {
        // Run away from pacman
        const dx = this.pacman.x - ghost.x;
        const dy = this.pacman.y - ghost.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
          targetX += dx > 0 ? -movement : movement;
        } else {
          targetY += dy > 0 ? -movement : movement;
        }
      } else {
        // Chase or scatter behavior
        const dx = this.pacman.x - ghost.x;
        const dy = this.pacman.y - ghost.y;
        
        switch(index) {
          case 0: // Red - direct chase
            if (Math.abs(dx) > Math.abs(dy)) {
              targetX += dx > 0 ? movement : -movement;
            } else {
              targetY += dy > 0 ? movement : -movement;
            }
            break;
          case 1: // Pink - try to get in front
            const predictX = this.pacman.x + (this.pacman.direction === "LEFT" ? -2 : this.pacman.direction === "RIGHT" ? 2 : 0);
            const predictY = this.pacman.y + (this.pacman.direction === "UP" ? -2 : this.pacman.direction === "DOWN" ? 2 : 0);
            const pdx = predictX - ghost.x;
            const pdy = predictY - ghost.y;
            if (Math.abs(pdx) > Math.abs(pdy)) {
              targetX += pdx > 0 ? movement : -movement;
            } else {
              targetY += pdy > 0 ? movement : -movement;
            }
            break;
          case 2: // Cyan - patrol if far, chase if close
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 8) {
              if (Math.abs(dx) > Math.abs(dy)) {
                targetX += dx > 0 ? movement : -movement;
              } else {
                targetY += dy > 0 ? movement : -movement;
              }
            } else {
              const pdx2 = 5 - ghost.x;
              const pdy2 = 25 - ghost.y;
              if (Math.abs(pdx2) > Math.abs(pdy2)) {
                targetX += pdx2 > 0 ? movement : -movement;
              } else {
                targetY += pdy2 > 0 ? movement : -movement;
              }
            }
            break;
          case 3: // Orange - random with occasional chase
            if (Math.random() < 0.3) {
              if (Math.abs(dx) > Math.abs(dy)) {
                targetX += dx > 0 ? movement : -movement;
              } else {
                targetY += dy > 0 ? movement : -movement;
              }
            } else {
              const directions = [
                { x: movement, y: 0 },
                { x: -movement, y: 0 },
                { x: 0, y: movement },
                { x: 0, y: -movement }
              ];
              const randomDir = directions[Math.floor(Math.random() * directions.length)];
              targetX += randomDir.x;
              targetY += randomDir.y;
            }
            break;
        }
      }
      
      // Try to move to target position
      if (this.canMove(targetX, targetY)) {
        ghost.x = targetX;
        ghost.y = targetY;
      } else if (ghost.mode !== "house" && ghost.mode !== "exiting") {
        // Try alternative directions if blocked (not in house)
        const altDirections = [
          { x: movement, y: 0 },
          { x: -movement, y: 0 },
          { x: 0, y: movement },
          { x: 0, y: -movement }
        ];
        
        for (const dir of altDirections) {
          const altX = ghost.x + dir.x;
          const altY = ghost.y + dir.y;
          if (this.canMove(altX, altY)) {
            ghost.x = altX;
            ghost.y = altY;
            break;
          }
        }
      }

      // Check collision with pacman
      const distance = Math.sqrt(
        Math.pow(ghost.x - this.pacman.x, 2) + Math.pow(ghost.y - this.pacman.y, 2)
      );
      
      if (distance < 0.5) {
        if (ghost.scared) {
          // Eat ghost - send back to house
          ghost.x = 13.5;
          ghost.y = 14;
          ghost.scared = false;
          ghost.mode = "exiting";
          this.score += 200;
          if (this.onScoreChange) this.onScoreChange(this.score);
        } else {
          // Lose life
          this.lives--;
          if (this.onLivesChange) this.onLivesChange(this.lives);
          
          if (this.lives <= 0) {
            this.stop();
            if (this.onGameOver) this.onGameOver();
          } else {
            // Reset positions
            this.pacman.x = 13.5;
            this.pacman.y = 23;
            this.pacman.direction = "RIGHT";
            this.ghosts[0].x = 13.5;
            this.ghosts[0].y = 11;
            this.ghosts[0].mode = "chase";
            this.ghosts[1].x = 11.5;
            this.ghosts[1].y = 14;
            this.ghosts[1].mode = "house";
            this.ghosts[2].x = 13.5;
            this.ghosts[2].y = 14;
            this.ghosts[2].mode = "house";
            this.ghosts[3].x = 15.5;
            this.ghosts[3].y = 14;
            this.ghosts[3].mode = "house";
          }
        }
      }
    });
  }

  private update(currentTime: number) {
    if (!this.isRunning) return;
    
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    
    if (deltaTime < 0.1) {
      this.updatePacman(deltaTime);
      this.updateGhosts(deltaTime);
      
      // Animate mouth
      if (this.mouthOpening) {
        this.mouthAngle += 0.15;
        if (this.mouthAngle >= 0.4) this.mouthOpening = false;
      } else {
        this.mouthAngle -= 0.15;
        if (this.mouthAngle <= 0) this.mouthOpening = true;
      }
    }
    
    this.draw();
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  private draw() {
    // Clear canvas
    this.ctx.fillStyle = "#0a0e27";
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw maze
    this.ctx.strokeStyle = "#1E90FF";
    this.ctx.lineWidth = 2;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (MAZE[row][col] === 1) {
          this.ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
    
    // Draw pellets
    this.ctx.fillStyle = "#FFFFFF";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (this.pellets[row]?.[col]) {
          this.ctx.beginPath();
          this.ctx.arc(
            col * CELL_SIZE + CELL_SIZE / 2,
            row * CELL_SIZE + CELL_SIZE / 2,
            2,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        }
      }
    }
    
    // Draw power pellets
    this.powerPellets.forEach((p) => {
      this.ctx.fillStyle = "#FFD700";
      this.ctx.beginPath();
      this.ctx.arc(
        p.x * CELL_SIZE + CELL_SIZE / 2,
        p.y * CELL_SIZE + CELL_SIZE / 2,
        5,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    });
    
    // Draw ghosts
    this.ghosts.forEach((ghost) => {
      this.ctx.fillStyle = ghost.scared ? "#0000FF" : ghost.color;
      this.ctx.beginPath();
      this.ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 1,
        Math.PI,
        0
      );
      this.ctx.lineTo(
        (ghost.x + 0.75) * CELL_SIZE,
        (ghost.y + 1) * CELL_SIZE
      );
      this.ctx.lineTo(
        (ghost.x + 0.625) * CELL_SIZE,
        (ghost.y + 0.75) * CELL_SIZE
      );
      this.ctx.lineTo(
        (ghost.x + 0.5) * CELL_SIZE,
        (ghost.y + 1) * CELL_SIZE
      );
      this.ctx.lineTo(
        (ghost.x + 0.375) * CELL_SIZE,
        (ghost.y + 0.75) * CELL_SIZE
      );
      this.ctx.lineTo(
        (ghost.x + 0.25) * CELL_SIZE,
        (ghost.y + 1) * CELL_SIZE
      );
      this.ctx.closePath();
      this.ctx.fill();
      
      // Eyes
      if (!ghost.scared) {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.arc(
          (ghost.x + 0.35) * CELL_SIZE,
          (ghost.y + 0.4) * CELL_SIZE,
          3,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(
          (ghost.x + 0.65) * CELL_SIZE,
          (ghost.y + 0.4) * CELL_SIZE,
          3,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(
          (ghost.x + 0.35) * CELL_SIZE,
          (ghost.y + 0.4) * CELL_SIZE,
          1.5,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(
          (ghost.x + 0.65) * CELL_SIZE,
          (ghost.y + 0.4) * CELL_SIZE,
          1.5,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    });
    
    // Draw pacman
    this.ctx.fillStyle = "#FFD700";
    this.ctx.beginPath();
    
    let startAngle = this.mouthAngle;
    let endAngle = Math.PI * 2 - this.mouthAngle;
    
    if (this.pacman.direction === "UP") {
      startAngle += Math.PI * 1.5;
      endAngle += Math.PI * 1.5;
    } else if (this.pacman.direction === "DOWN") {
      startAngle += Math.PI * 0.5;
      endAngle += Math.PI * 0.5;
    } else if (this.pacman.direction === "LEFT") {
      startAngle += Math.PI;
      endAngle += Math.PI;
    }
    
    this.ctx.arc(
      this.pacman.x * CELL_SIZE + CELL_SIZE / 2,
      this.pacman.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 1,
      startAngle,
      endAngle
    );
    this.ctx.lineTo(
      this.pacman.x * CELL_SIZE + CELL_SIZE / 2,
      this.pacman.y * CELL_SIZE + CELL_SIZE / 2
    );
    this.ctx.closePath();
    this.ctx.fill();
  }

  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public restart() {
    this.stop();
    this.pacman = { x: 13.5, y: 23, direction: "RIGHT", nextDirection: "RIGHT", speed: 0.1 };
    this.ghosts = [
      { x: 13.5, y: 11, color: "#FF0000", speed: 0.075, scared: false, mode: "chase", scatterTarget: { x: 25, y: 0 } },
      { x: 11.5, y: 14, color: "#FFB8FF", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 2, y: 0 } },
      { x: 13.5, y: 14, color: "#00FFFF", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 27, y: 31 } },
      { x: 15.5, y: 14, color: "#FFB852", speed: 0.075, scared: false, mode: "house", scatterTarget: { x: 0, y: 31 } },
    ];
    this.score = 0;
    this.lives = 3;
    this.scaredTimer = 0;
    this.mouthAngle = 0;
    this.mouthOpening = true;
    this.powerPellets = [];
    this.initPellets();
    if (this.onScoreChange) this.onScoreChange(this.score);
    if (this.onLivesChange) this.onLivesChange(this.lives);
    this.draw();
  }

  public cleanup() {
    this.stop();
  }
}
