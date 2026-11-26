export default class Collectible {
constructor(x, y, type, value) {
    this.x         = x;
    this.y         = y;
    this.type      = type;  
    this.value     = value;
    this.radius    = type === 'bonus' ? 12 : 8;
    this.collected = false;
    this.pulse     = 0; }

  update(dt) {
    if (!this.collected) this.pulse += dt * 3;}

  draw(ctx, pings) {
    if (this.collected) return;

    let brightness = 0;
    for (const ping of pings) {
      brightness = Math.max(brightness, ping.brightnessAt(this.x, this.y));
    }
    if (brightness <= 0) return;
    const pulse = 0.85 + Math.sin(this.pulse) * 0.15;
    const r     = this.radius * pulse;
    ctx.save();
    ctx.globalAlpha = brightness;
    if (this.type === 'bonus') {
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur  = 18;
    } else {
      ctx.fillStyle = '#7fffff';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur  = 12;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
    ctx.restore();}}