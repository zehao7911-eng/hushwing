export default class Ping {
  constructor(x, y, config = {}) {
    this.x          = x;
    this.y          = y;
    this.radius     = 0;
    this.maxRadius  = config.maxRadius  || 320;
    this.speed      = config.speed      || 240;  
    this.lineWidth  = config.lineWidth  || 2;
    this.color      = config.color      || '100, 200, 255';
    this.dead       = false;
    this.age        = 0;           
    this.revealTime = config.revealTime || 1.4;  
  }
  revealsPoint(px, py) {
    const d = Math.hypot(px - this.x, py - this.y);
    const timeSincePassed = (this.radius - d) / this.speed;
    return d <= this.radius && timeSincePassed < this.revealTime;
  }
  brightnessAt(px, py) {
    const d = Math.hypot(px - this.x, py - this.y);
    if (d > this.radius) return 0;
    const timeSincePassed = (this.radius - d) / this.speed;
    return Math.max(0, 1 - timeSincePassed / this.revealTime);
  }
 update(dt) {
    this.radius += this.speed * dt;
    this.age    += dt;
    if (this.radius >= this.maxRadius) this.dead = true;
  }
 draw(ctx) {
    if (this.dead) return;
    const alpha = 1 - this.radius / this.maxRadius;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${this.color}, ${alpha})`;
    ctx.lineWidth   = this.lineWidth;
    ctx.shadowColor = `rgba(${this.color}, ${alpha * 0.5})`;
    ctx.shadowBlur  = 12;
    ctx.stroke();
    ctx.restore();}}