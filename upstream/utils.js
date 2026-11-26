export function resolveWallCollisions(entity, walls, axis) {
  for (const w of walls) {
    if (circleRect(entity, w)) {
      if (axis === 'x') {
        // Push out left or right
        if (entity.vx > 0) entity.x = w.x - entity.radius;
        else                entity.x = w.x + w.w + entity.radius;
        entity.vx = 0;
      } else {
        if (entity.vy > 0) entity.y = w.y - entity.radius;
        else                entity.y = w.y + w.h + entity.radius;
        entity.vy = 0;
      }}}}

export function circleRect(circle, rect) {
  const nearX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
  const nearY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
  const dx    = circle.x - nearX;
  const dy    = circle.y - nearY;
  return dx * dx + dy * dy < circle.radius * circle.radius;
}
export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);}