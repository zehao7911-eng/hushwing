// Runtime adaptation of NomanT17/Echo-Pulse (README: MIT).
// Pinned originals and the exact mapping are shipped in upstream/.
export class Echo {
 constructor(x,y,config={}){this.x=x;this.y=y;this.radius=0;this.maxRadius=config.maxRadius||5;this.speed=config.speed||5;this.dead=false;this.age=0;this.revealTime=config.revealTime||2.6;this.relay=!!config.relay;this.id=config.id||0;}
 revealsPoint(px,py){const d=Math.hypot(px-this.x,py-this.y);return d<=this.radius&&(this.radius-d)/this.speed<this.revealTime;}
 brightnessAt(px,py){const d=Math.hypot(px-this.x,py-this.y);if(d>this.radius)return 0;return Math.max(0,1-(this.radius-d)/this.speed/this.revealTime);}
 update(dt){this.radius+=this.speed*dt;this.age+=dt;
  // Keep the original time-since-wave fade alive after expansion stops.
  // The source expired immediately at maxRadius; this port preserves its tail.
  if(this.radius>=this.maxRadius+this.speed*this.revealTime)this.dead=true;
 }
}
export function circleRect(circle,rect){const nx=Math.max(rect.x,Math.min(circle.x,rect.x+rect.w)),ny=Math.max(rect.y,Math.min(circle.y,rect.y+rect.h));return (circle.x-nx)**2+(circle.y-ny)**2<circle.radius**2;}
export function resolveWallCollisions(entity,walls,axis){let hit=false;for(const w of walls){if(circleRect(entity,w)){hit=true;if(axis==='x'){entity.x=entity.vx>0?w.x-entity.radius:w.x+w.w+entity.radius;entity.vx=0;}else{entity.y=entity.vy>0?w.y-entity.radius:w.y+w.h+entity.radius;entity.vy=0;}}}return hit;}
export function move(entity,dx,dy,dt,walls){const len=Math.hypot(dx,dy);if(len>1){dx/=len;dy/=len;}entity.vx=dx*entity.speed;entity.vy=dy*entity.speed;entity.x+=entity.vx*dt;resolveWallCollisions(entity,walls,'x');entity.y+=entity.vy*dt;resolveWallCollisions(entity,walls,'y');}
export function collected(entity,item){return !item.collected&&Math.hypot(entity.x-item.x,entity.y-item.y)<entity.radius+item.radius;}
