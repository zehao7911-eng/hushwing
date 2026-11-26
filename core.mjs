import {Echo,move,collected,circleRect} from './echo-source.mjs';
export const chapters=[
 {name:'The First Echo',place:'MOSSBELL GROTTO',par:9,palette:0,map:[
 '#########','#S..#..M#','#...#...#','#.B...B.#','#...#...#','#M..#...#','##.###.##','#...B...#','#.......#','#M.....E#','#########']},
 {name:'A Door That Listens',place:'THE HUSHED ARCHES',par:12,palette:1,map:[
 '#########','#S....M.#','#.###...#','#.B.#...#','#...#...#','###1#####','#M..#..M#','#...2.B.#','#.###...#','#B.....E#','#########']},
 {name:'The Violet Library',place:'CRYSTAL VAULT',par:14,palette:2,map:[
 '#########','#S..#..M#','#...#.B.#','#.B.#...#','#...1...#','##.###.##','#M....R.#','#.###...#','#...#.B.#','#...M..E#','#########']},
 {name:'Moonwater Steps',place:'THE DROWNED GARDEN',par:15,palette:3,map:[
 '#########','#S..#..M#','#.#...B.#','#.#.#...#','#...#.###','#B..1..M#','###.#...#','#M..#...#','#.R.##.##','#..B.2.E#','#########']},
 {name:'An Echo of an Echo',place:'THE SINGING HOLLOW',par:16,palette:4,map:[
 '#########','#S..R..M#','###.#...#','#B..#...#','#...1...#','#.###.###','#..M#.B.#','#...#.R.#','##2###.##','#M.B...E#','#########']},
 {name:'Where the Night Blooms',place:'THE LANTERN HEART',par:18,palette:5,map:[
 '#########','#S....M.#','#.###.B.#','#...#...#','#.R.1...#','#M..#...#','#####1###','#...#..M#','#.B...R.#','#B.....E#','#########']}
];
export const palettes=[
 {sky:0x151c36,water:0x172e49,rock:0x555878,moss:0x5a8995,leaf:0x6c9daa,glow:0x75f2d3,accent:0xffc788},
 {sky:0x211b34,water:0x342743,rock:0x78637f,moss:0x7e8c91,leaf:0x9aa4b1,glow:0xffc49b,accent:0xf7e4b6},
 {sky:0x201830,water:0x282344,rock:0x696280,moss:0x8b7eac,leaf:0xc390cd,glow:0xc39dff,accent:0xffd994},
 {sky:0x132d3b,water:0x124151,rock:0x527987,moss:0x719e98,leaf:0x82b0ac,glow:0x91e7ec,accent:0xf4c6ab},
 {sky:0x28233d,water:0x352d52,rock:0x6e6b91,moss:0x9490a9,leaf:0xba9da8,glow:0xffc4d5,accent:0xffdc86},
 {sky:0x101e38,water:0x123651,rock:0x4c6387,moss:0x638a9d,leaf:0x92b0af,glow:0xa7ecff,accent:0xffda92}
];
const copy=v=>JSON.parse(JSON.stringify(v));
export function tile(r,x,y){return chapters[r.level].map[Math.floor(y)]?.[Math.floor(x)]||'#';}
export function walls(r){const out=[];chapters[r.level].map.forEach((row,y)=>[...row].forEach((c,x)=>{if(c==='#'||c==='1'&&r.bells<1||c==='2'&&r.bells<2)out.push({x,y,w:1,h:1});}));return out;}
export function makeRound(level=0){level=Math.max(0,Math.min(5,level|0));const r={v:1,level,time:0,x:1.5,y:1.5,vx:0,vy:0,radius:.2,speed:2.7,bells:0,pings:0,cooldown:0,done:false,items:[],echoes:[],seen:[],trail:[],relayed:[],serial:0};chapters[level].map.forEach((row,y)=>[...row].forEach((c,x)=>{if(c==='S'){r.x=x+.5;r.y=y+.5;}if('BMER'.includes(c))r.items.push({x:x+.5,y:y+.5,type:c,radius:c==='M'?.22:.35,collected:false,lit:false});}));return r;}
export function emit(r,manual=true){if(r.done||manual&&r.cooldown>0)return false;r.echoes.push(new Echo(r.x,r.y,{maxRadius:4.7,revealTime:3.7,id:++r.serial}));if(r.echoes.length>8)r.echoes.shift();if(manual){r.pings++;r.cooldown=.8;}return true;}
export function visible(r,x,y){if(r.done)return 1;let light=Math.max(0,1-Math.hypot(x-r.x,y-r.y)/1.7);for(const p of r.echoes){if(Math.hypot(x-p.x,y-p.y)<=p.maxRadius)light=Math.max(light,p.brightnessAt(x,y));}for(const i of r.items)if(i.type==='B'&&i.collected)light=Math.max(light,.85-Math.hypot(x-i.x,y-i.y)/3.1);return Math.max(0,light);}
export function step(r,dt,input={}){if(r.done)return[];dt=Math.min(.05,Math.max(0,dt));const events=[];r.time+=dt;r.cooldown=Math.max(0,r.cooldown-dt);move(r,input.x||0,input.y||0,dt,walls(r));if(input.ping&&emit(r))events.push({type:'ping'});for(const p of r.echoes)p.update(dt);r.echoes=r.echoes.filter(p=>!p.dead);const trail=Math.floor(r.x)+','+Math.floor(r.y);if(!r.trail.includes(trail))r.trail.push(trail);
 for(const i of r.items){if(i.type==='R'){for(const p of [...r.echoes]){const key=p.id+':'+i.x+':'+i.y;if(!p.relay&&p.radius<=p.maxRadius&&p.revealsPoint(i.x,i.y)&&!r.relayed.includes(key)){r.relayed.push(key);r.echoes.push(new Echo(i.x,i.y,{maxRadius:5,revealTime:4,relay:true,id:++r.serial}));events.push({type:'relay',x:i.x,y:i.y});}}continue;}
 if(i.type==='E'){if(r.bells===3&&Math.hypot(r.x-i.x,r.y-i.y)<.58){r.done=true;events.push({type:'win'});}continue;}
 if(collected(r,i)){i.collected=true;if(i.type==='B'){r.bells++;events.push({type:'bell',x:i.x,y:i.y,n:r.bells});}else events.push({type:'moon',x:i.x,y:i.y});}
 }
 r.echoes=r.echoes.slice(-8);if(r.relayed.length>64)r.relayed=r.relayed.slice(-64);
 return events;
}
export function stars(r){return r.done?1+(r.items.filter(i=>i.type==='M'&&i.collected).length===3?1:0)+(r.pings<=chapters[r.level].par?1:0):0;}
export function checkpoint(r){const snap=copy(r);snap.vx=0;snap.vy=0;return snap;}
export function restore(raw){if(!raw||raw.v!==1||!Number.isInteger(raw.level)||raw.level<0||raw.level>5||raw.done!==false)return null;const base=makeRound(raw.level);if(!Number.isFinite(raw.x)||!Number.isFinite(raw.y)||raw.x<.2||raw.y<.2||raw.x>8.8||raw.y>10.8||!Array.isArray(raw.items)||raw.items.length!==base.items.length)return null;for(let j=0;j<base.items.length;j++){const a=base.items[j],b=raw.items[j];if(!b||b.type!==a.type||b.x!==a.x||b.y!==a.y)return null;a.collected=b.collected===true;}base.bells=base.items.filter(i=>i.type==='B'&&i.collected).length;base.x=raw.x;base.y=raw.y;if(walls(base).some(w=>circleRect(base,w)))return null;base.time=Number.isFinite(raw.time)?Math.max(0,raw.time):0;base.pings=Number.isInteger(raw.pings)?Math.max(0,Math.min(99999,raw.pings)):0;base.cooldown=Math.max(0,Math.min(.8,+raw.cooldown||0));base.serial=Math.max(0,+raw.serial||0);base.trail=Array.isArray(raw.trail)?raw.trail.filter(s=>/^\d,\d+$/.test(s)).slice(0,99):[];base.echoes=Array.isArray(raw.echoes)?raw.echoes.slice(-8).filter(p=>p&&[p.x,p.y,p.radius,p.age].every(Number.isFinite)).map(p=>Object.assign(new Echo(p.x,p.y,{maxRadius:p.maxRadius,revealTime:p.revealTime,relay:p.relay,id:p.id}),{radius:Math.max(0,p.radius),age:Math.max(0,p.age)})):[];base.relayed=Array.isArray(raw.relayed)?raw.relayed.filter(s=>typeof s==='string').slice(-64):[];return base;}
export function profile(raw={}){raw=raw&&typeof raw==='object'?raw:{};return{best:Array.from({length:6},(_,i)=>Math.max(0,Math.min(3,raw.best?.[i]|0))),rewards:{like:raw.rewards?.like===true,comment:raw.rewards?.comment===true},muted:raw.muted===true,coat:Math.max(0,Math.min(2,raw.coat|0)),updated:Number.isFinite(raw.updated)?raw.updated:0,active:restore(raw.active)?checkpoint(restore(raw.active)):null};}
export function mergeProfile(a,b){a=profile(a);b=profile(b);return profile({...a,best:a.best.map((x,i)=>Math.max(x,b.best[i])),rewards:{like:a.rewards.like||b.rewards.like,comment:a.rewards.comment||b.rewards.comment},active:b.updated>a.updated?b.active:a.active,updated:Math.max(a.updated,b.updated)});}
export function unlocked(p){return [true,...p.best.slice(0,5).map(n=>n>0)];}
export function total(p){return p.best.reduce((a,b)=>a+b,0);}
export function finish(p,r){if(!r.done)return false;p.best[r.level]=Math.max(p.best[r.level],stars(r));p.active=null;p.updated=Date.now();return true;}
