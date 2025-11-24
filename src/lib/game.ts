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
      { x: 13.5, y: 11, color: "#FF0000", speed: 0.075, scared: false },
      { x: 11.5, y: 14, color: "#FFB8FF", speed: 0.075, scared: false },
      { x: 13.5, y: 14, color: "#00FFFF", speed: 0.075, scared: false },
      { x: 15.5, y: 14, color: "#FFB852", speed: 0.075, scared: false },
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

    this.ghosts.forEach((ghost) => {
      const movement = ghost.speed * deltaTime * 60;
      
      // Simple AI: move towards pacman with some randomness
      const dx = this.pacman.x - ghost.x;
      const dy = this.pacman.y - ghost.y;
      
      let newX = ghost.x;
      let newY = ghost.y;
      
      if (ghost.scared) {
        // Run away from pacman
        if (Math.abs(dx) > Math.abs(dy)) {
          newX += dx > 0 ? -movement : movement;
        } else {
          newY += dy > 0 ? -movement : movement;
        }
      } else {
        // Chase pacman
        if (Math.abs(dx) > Math.abs(dy)) {
          newX += dx > 0 ? movement : -movement;
        } else {
          newY += dy > 0 ? movement : -movement;
        }
      }
      
      if (this.canMove(newX, newY)) {
        ghost.x = newX;
        ghost.y = newY;
      } else {
        // Try alternative direction
        if (Math.abs(dx) > Math.abs(dy)) {
          newY += dy > 0 ? movement : -movement;
          if (this.canMove(ghost.x, newY)) {
            ghost.y = newY;
          }
        } else {
          newX += dx > 0 ? movement : -movement;
          if (this.canMove(newX, ghost.y)) {
            ghost.x = newX;
          }
        }
      }

      // Check collision with pacman
      const distance = Math.sqrt(
        Math.pow(ghost.x - this.pacman.x, 2) + Math.pow(ghost.y - this.pacman.y, 2)
      );
      
      if (distance < 0.5) {
        if (ghost.scared) {
          // Eat ghost
          ghost.x = 13.5;
          ghost.y = 14;
          ghost.scared = false;
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
            this.ghosts[1].x = 11.5;
            this.ghosts[1].y = 14;
            this.ghosts[2].x = 13.5;
            this.ghosts[2].y = 14;
            this.ghosts[3].x = 15.5;
            this.ghosts[3].y = 14;
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
      { x: 13.5, y: 11, color: "#FF0000", speed: 0.075, scared: false },
      { x: 11.5, y: 14, color: "#FFB8FF", speed: 0.075, scared: false },
      { x: 13.5, y: 14, color: "#00FFFF", speed: 0.075, scared: false },
      { x: 15.5, y: 14, color: "#FFB852", speed: 0.075, scared: false },
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
