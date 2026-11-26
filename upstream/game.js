import { zones } from './levels.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Collectible from './collectible.js';
import Ping from './ping.js';
import HUD from './hud.js';
import { dist } from './utils.js';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.zone = 0;
    this.pings = [];
    this.pingsUsed = 0;
    this.pingCooldown = 0;
    this.pingMaxCooldown = 0.6;
    this.score = 0;
    this.lives = 3;
    this.gameOverScreen = null;
    this.hud = new HUD(ctx, canvas);
    this.initZone();
  }

  initZone() {
    const zoneData = zones[this.zone];
    this.currentZone = zoneData;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.walls = zoneData.walls.map(wall => ({
      x: wall.x * w,
      y: wall.y * h,
      w: wall.w * w,
      h: wall.h * h,
    }));

    this.player = new Player(zoneData.playerStart.x * w, zoneData.playerStart.y * h);

    this.enemies = zoneData.enemies.map(e =>
      new Enemy(
        e.x * w,
        e.y * h,
        e.type,
        e.speed,
        e.path ? e.path.map(p => ({ x: p.x * w, y: p.y * h })) : null
      )
    );

    this.collectibles = zoneData.collectibles.map(c =>
      new Collectible(c.x * w, c.y * h, c.type, c.value)
    );

    this.exitZone = {
      x: zoneData.exitZone.x * w,
      y: zoneData.exitZone.y * h,
      radius: zoneData.exitZone.radius,
    };

    this.pings = [];
    this.pingsUsed = 0;
    this.pingCooldown = 0;
  }

  update(dt, keys) {
    if (this.gameOverScreen) return;

    this.player.update(dt, keys, this.canvas, this.walls);
    this.pingCooldown = Math.max(0, this.pingCooldown - dt);

    if (keys['Space'] && this.pingCooldown <= 0) {
      const config = this.currentZone.pingConfig;
      this.pings.push(new Ping(this.player.x, this.player.y, config));
      this.pingsUsed++;
      this.score = Math.max(0, this.score - 20);
      this.pingCooldown = this.pingMaxCooldown;
    }

    for (const ping of this.pings) ping.update(dt);
    this.pings = this.pings.filter(p => !p.dead);

    for (const enemy of this.enemies) enemy.update(dt, this.player, this.pings, this.walls);

    for (const c of this.collectibles) {
      if (!c.collected) c.update(dt);
      if (dist(this.player, c) < this.player.radius + c.radius && !c.collected) {
        c.collected = true;
        this.score += c.value;
      }
    }

    for (const enemy of this.enemies) {
      if (dist(this.player, enemy) < this.player.radius + enemy.radius) {
        this.lives--;
        this.score = Math.max(0, this.score - 500);
        if (this.lives <= 0) {
          this.gameOverScreen = 'lost';
        } else {
          this.initZone();
        }
        return;
      }
    }

    if (dist(this.player, this.exitZone) < this.player.radius + this.exitZone.radius) {
      if (this.zone < zones.length - 1) {
        this.zone++;
        this.initZone();
      } else {
        this.gameOverScreen = 'won';
      }
    }
  }

  draw() {
    const { ctx, canvas } = this;
    const w = canvas.width, h = canvas.height;

    ctx.fillStyle = this.currentZone.background;
    ctx.fillRect(0, 0, w, h);

    for (const wall of this.walls) {
      ctx.save();
      ctx.fillStyle = 'rgba(100, 150, 200, 0.3)';
      ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.6)';
      ctx.lineWidth = 1;
      ctx.strokeRect(wall.x, wall.y, wall.w, wall.h);
      ctx.restore();
    }

    for (const collectible of this.collectibles) collectible.draw(ctx, this.pings);
    for (const ping of this.pings) ping.draw(ctx);
    for (const enemy of this.enemies) enemy.draw(ctx, this.pings);
    this.player.draw(ctx);

    ctx.save();
    ctx.fillStyle = 'rgba(100, 200, 100, 0.4)';
    ctx.beginPath();
    ctx.arc(this.exitZone.x, this.exitZone.y, this.exitZone.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 200, 100, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    this.hud.draw({
      zone: this.zone,
      score: this.score,
      pingsUsed: this.pingsUsed,
      collectibles: this.collectibles,
      pingCooldown: this.pingCooldown,
      pingMaxCooldown: this.pingMaxCooldown,
      lives: this.lives,
    });

    if (this.gameOverScreen === 'won') {
      this._drawWonScreen();
    } else if (this.gameOverScreen === 'lost') {
      this._drawLostScreen();
    }
  }

  _drawWonScreen() {
    const { ctx, canvas } = this;
    const w = canvas.width, h = canvas.height;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#90d490';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.floor(h * 0.08)}px monospace`;
    ctx.fillText('YOU WIN!', w / 2, h / 2 - 60);
    ctx.font = `${Math.floor(h * 0.04)}px monospace`;
    ctx.fillStyle = '#64b4ff';
    ctx.fillText(`FINAL SCORE: ${this.score}`, w / 2, h / 2 + 20);
    ctx.restore();
  }

  _drawLostScreen() {
    const { ctx, canvas } = this;
    const w = canvas.width, h = canvas.height;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ff6060';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.floor(h * 0.08)}px monospace`;
    ctx.fillText('GAME OVER', w / 2, h / 2 - 60);
    ctx.font = `${Math.floor(h * 0.04)}px monospace`;
    ctx.fillStyle = '#ffc0c0';
    ctx.fillText(`SCORE: ${this.score}`, w / 2, h / 2 + 20);
    ctx.restore();
  }
}
