 import { resolveWallCollisions } from './utils.js';
 export default class Player {
  constructor(x, y) {
    this.x      = x;
    this.y      = y;
    this.vx     = 0;
    this.vy     = 0;
    this.radius = 6;
    this.speed  = 180;  
    this.alive  = true;}

  update(dt, keys, canvas, walls) {
    let dx = 0, dy = 0;
    if (keys['ArrowLeft']  || keys['KeyA']) dx -= 1;
    if (keys['ArrowRight'] || keys['KeyD']) dx += 1;
    if (keys['ArrowUp']    || keys['KeyW']) dy -= 1;
    if (keys['ArrowDown']  || keys['KeyS']) dy += 1;

    const len = Math.hypot(dx, dy);
    if (len > 0) { dx /= len; dy /= len; }

    this.vx = dx * this.speed;
    this.vy = dy * this.speed;
    this.x += this.vx * dt;
    resolveWallCollisions(this, walls, 'x');

    this.y += this.vy * dt;
    resolveWallCollisions(this, walls, 'y');
    this.x = Math.max(this.radius, Math.min(canvas.width  - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
  }

  draw(ctx) {
    ctx.save();
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 14);
    grad.addColorStop(0,   'rgba(180, 230, 255, 0.9)');
    grad.addColorStop(0.4, 'rgba(100, 190, 255, 0.5)');
    grad.addColorStop(1,   'rgba(0,   120, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#cef';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }}