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
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
}

const GHOST_STARTS: Position[] = [
  { x: 11.5, y: 5 },
  { x: 13.5, y: 5 },
  { x: 15.5, y: 5 },
  { x: 17.5, y: 5 },
];

const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"] as const;

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
    this.ghosts = this.createGhosts();
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

  private createGhosts(): Ghost[] {
    const directions: Array<"UP" | "DOWN" | "LEFT" | "RIGHT"> = [
      "LEFT",
      "RIGHT",
      "UP",
      "DOWN",
    ];

    // Base speed increases with score (difficulty scaling)
    const baseSpeed = 0.075 + (this.score / 10000) * 0.025;

    return GHOST_STARTS.map((start, index) => ({
      x: start.x,
      y: start.y,
      color: GHOST_COLORS[index],
      // Each ghost has slightly different speed
      speed: baseSpeed + (index * 0.005),
      scared: false,
      direction: directions[index % directions.length],
    }));
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

  public setDirection(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    this.pacman.nextDirection = direction;
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
        this.ghosts.forEach((g) => {
          g.scared = false;
        });
      }
    }

    // Dynamic difficulty: ghosts get faster as score increases
    const difficultyMultiplier = 1 + (this.score / 5000) * 0.3;

    const directions: Array<"UP" | "DOWN" | "LEFT" | "RIGHT"> = [
      "UP",
      "DOWN",
      "LEFT",
      "RIGHT",
    ];
    const opposite: Record<"UP" | "DOWN" | "LEFT" | "RIGHT", "UP" | "DOWN" | "LEFT" | "RIGHT"> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    for (let i = 0; i < this.ghosts.length; i++) {
      const ghost = this.ghosts[i];
      const movement = ghost.speed * deltaTime * 60 * difficultyMultiplier;

      // Decide target tile for this ghost
      let targetX = this.pacman.x;
      let targetY = this.pacman.y;

      const dx = this.pacman.x - ghost.x;
      const dy = this.pacman.y - ghost.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (!ghost.scared) {
        // Difficulty increases aggression
        const aggressionThreshold = Math.max(3, 8 - (this.score / 1000));

        switch (i) {
          case 0: {
            // RED - Direct aggressive chaser (Shadow/Blinky)
            // Gets more aggressive at higher scores
            if (this.score > 1000) {
              // At high scores, try to cut off escape routes
              const futureX = this.pacman.x + (this.pacman.direction === "LEFT" ? -1 : this.pacman.direction === "RIGHT" ? 1 : 0);
              const futureY = this.pacman.y + (this.pacman.direction === "UP" ? -1 : this.pacman.direction === "DOWN" ? 1 : 0);
              targetX = futureX;
              targetY = futureY;
            }
            break;
          }
          case 1: {
            // PINK - Ambusher (aims ahead of Pac-Man)
            const predictDistance = 2 + Math.floor(this.score / 2000);
            const predictX =
              this.pacman.x +
              (this.pacman.direction === "LEFT"
                ? -predictDistance
                : this.pacman.direction === "RIGHT"
                ? predictDistance
                : 0);
            const predictY =
              this.pacman.y +
              (this.pacman.direction === "UP"
                ? -predictDistance
                : this.pacman.direction === "DOWN"
                ? predictDistance
                : 0);
            targetX = predictX;
            targetY = predictY;
            break;
          }
          case 2: {
            // CYAN - Patrol/Flanker (Inky-like behavior)
            // Switches between patrol and aggressive chase
            if (distance >= aggressionThreshold) {
              // Patrol corners when far
              const cornerTargets = [
                { x: 5, y: 5 },
                { x: 22, y: 5 },
                { x: 5, y: 25 },
                { x: 22, y: 25 }
              ];
              const target = cornerTargets[Math.floor((Date.now() / 5000) % cornerTargets.length)];
              targetX = target.x;
              targetY = target.y;
            } else {
              // When close, use flanking strategy
              const redGhost = this.ghosts[0];
              const vectorX = this.pacman.x - redGhost.x;
              const vectorY = this.pacman.y - redGhost.y;
              targetX = this.pacman.x + vectorX;
              targetY = this.pacman.y + vectorY;
            }
            break;
          }
          case 3: {
            // ORANGE - Smart random (Clyde-like)
            // Close: random/scatter, Far: chase
            if (distance < aggressionThreshold) {
              // Scatter to corner when too close
              targetX = 1;
              targetY = ROWS - 2;
            } else {
              // Chase when far, but with some randomness
              if (Math.random() > 0.2) {
                targetX = this.pacman.x + (Math.random() - 0.5) * 3;
                targetY = this.pacman.y + (Math.random() - 0.5) * 3;
              }
            }
            break;
          }
        }
      }

      const dirVectors: Record<"UP" | "DOWN" | "LEFT" | "RIGHT", { x: number; y: number }> = {
        UP: { x: 0, y: -movement },
        DOWN: { x: 0, y: movement },
        LEFT: { x: -movement, y: 0 },
        RIGHT: { x: movement, y: 0 },
      };

      // Build candidate moves
      type CandidateDir = {
        dir: "UP" | "DOWN" | "LEFT" | "RIGHT";
        nx: number;
        ny: number;
        distance: number;
      };

      let candidates: CandidateDir[] = directions
        .map((dir) => {
          const vec = dirVectors[dir];
          const nx = ghost.x + vec.x;
          const ny = ghost.y + vec.y;
          const distance = Math.hypot(targetX - nx, targetY - ny);
          return { dir, nx, ny, distance };
        })
        .filter((c) => this.canMove(c.nx, c.ny));

      if (candidates.length === 0) {
        // No valid moves, skip this frame
        continue;
      }

      // Scared ghosts try to move away from Pac-Man (maximize distance)
      if (ghost.scared) {
        candidates.sort((a, b) => b.distance - a.distance);
      } else {
        // Normal ghosts move toward their target (minimize distance)
        candidates.sort((a, b) => a.distance - b.distance);
      }

      // Prefer to keep the same direction when possible and not reverse
      let chosen = candidates.find(
        (c) =>
          c.dir === ghost.direction &&
          c.dir !== opposite[ghost.direction],
      );

      if (!chosen) {
        // Pick the best candidate that is not directly reversing, if possible
        chosen = candidates.find(
          (c) => c.dir !== opposite[ghost.direction],
        );
      }

      if (!chosen) {
        // If all options would reverse, just take the best one
        chosen = candidates[0];
      }

      ghost.direction = chosen.dir;
      ghost.x = chosen.nx;
      ghost.y = chosen.ny;

      // Wrap around horizontally
      if (ghost.x < 0) ghost.x = COLS - 1;
      if (ghost.x >= COLS) ghost.x = 0;

      const distanceToPacman = Math.sqrt(
        Math.pow(ghost.x - this.pacman.x, 2) + Math.pow(ghost.y - this.pacman.y, 2),
      );

      if (distanceToPacman < 0.5) {
        if (ghost.scared) {
          const spawn = GHOST_STARTS[i];
          ghost.x = spawn.x;
          ghost.y = spawn.y;
          ghost.scared = false;
          // Reset direction when sent back to spawn
          ghost.direction = "UP";
          this.score += 200;
          if (this.onScoreChange) this.onScoreChange(this.score);
        } else {
          this.lives--;
          if (this.onLivesChange) this.onLivesChange(this.lives);

          if (this.lives <= 0) {
            this.stop();
            if (this.onGameOver) this.onGameOver();
          } else {
            this.pacman.x = 13.5;
            this.pacman.y = 23;
            this.pacman.direction = "RIGHT";
            this.pacman.nextDirection = "RIGHT";
            this.ghosts = this.createGhosts();
          }

          break;
        }
      }
    }
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
    this.ghosts = this.createGhosts();
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
