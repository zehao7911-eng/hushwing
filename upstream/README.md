# Echo Pulse

> A sonar-based 2D puzzle stealth game built with Vanilla JavaScript and HTML5 Canvas.

Echo Pulse is an original 2D navigation-survival game where the player explores fully dark environments using only sound-based sonar pulses. Every ping briefly reveals walls, enemies, collectibles, and escape paths before darkness consumes the screen again.

---

## 🎮 Project Overview

Echo Pulse is built entirely using **Vanilla JavaScript**, **HTML5 Canvas**, and **Web Audio API** with zero external libraries or dependencies.

The player controls a glowing entity trapped across **7 progressively difficult zones**. Visibility is almost completely removed — the only way to perceive the environment is by pressing **SPACE** to emit a sonar pulse.

The sonar expands outward as a glowing ring and temporarily reveals:

- Walls
- Collectibles
- Enemies
- Exit portals

Once the ring fades, everything disappears back into darkness.

This creates a gameplay loop based on:

- Memory
- Risk management
- Spatial awareness
- Timing
- Efficient movement

Each zone introduces new mechanics and increasing difficulty:

- Tighter map layouts
- Faster enemies
- Smaller visibility windows
- Patrol and chase enemy combinations

Players must reach the exit portal while collecting gems to maximize score.

Every sonar ping costs points, meaning excessive scanning lowers the final rank.

At the end of the game, players receive a performance grade:

| Grade | Requirement |
|---|---|
| S | Exceptional efficiency |
| A | High performance |
| B | Average run |
| C | Low efficiency |

---

# 📌 Section 01 — Project Description

Echo Pulse is an original 2D stealth-navigation game built entirely with Vanilla JavaScript and the HTML5 Canvas API.

The player controls a small glowing entity trapped inside a series of seven increasingly hostile zones — all rendered in complete darkness.

The only way to perceive the environment is by pressing **SPACE** to emit a sonar ping: an expanding ring of light that briefly illuminates walls, collectibles, and enemies as it passes over them.

Once the ring fades, everything returns to black.

This single mechanic creates a loop of tension, risk, and reward that drives every decision the player makes.

Each of the seven zones introduces new hazards:

- Patrol enemies that follow fixed paths
- Chase enemies that activate once revealed
- Tighter layouts
- Reduced reveal durations

The player must navigate toward an exit portal while collecting gems to maximize score and reduce penalties.

Every ping costs **20 points**, rewarding efficient navigation and careful decision-making.

On completing all seven zones, the player receives a final score and a letter grade based on overall performance.

---

# ✨ Section 02 — Key Features

| Feature | Description |
|---|---|
| Sonar Ping Mechanic | Press SPACE to emit an expanding ring that reveals darkness temporarily |
| 7 Unique Zones | Cave, Ocean Trench, Mine Shaft, Library, Space Station, Lava Tunnels, Final Void |
| Two Enemy Types | Patrol enemies follow paths while chase enemies activate after detection |
| Score System | Gems, zone bonuses, ping penalties, and final ranking system |
| Particle Effects | Burst particle animations when collecting gems |
| Synthesised Audio | Sonar sound generated using Web Audio API |
| Screen Shake | Camera shake effect during player death |

---

# 🛠️ Section 03 — Technology Used

| Category | Technology | Role in Project |
|---|---|---|
| Language | JavaScript (ES6+) | Core gameplay logic, classes, modules |
| Rendering | HTML5 Canvas API | Rendering player, enemies, particles, effects |
| Markup | HTML5 | Main game page and canvas setup |
| Styling | CSS3 | Fullscreen layout, dark atmosphere, UI styling |
| Physics | Custom Collision System | Circle-rectangle collision and movement handling |
| Audio | Web Audio API | Dynamic sonar ping sound generation |
| Architecture | ES Modules | Modular file-based project structure |
| Dependencies | None | No frameworks or npm packages used |

---

# 📂 Section 04 — File Structure

| File | Responsibility |
|---|---|
| `js/main.js` | Main game loop, state handling, scoring, collision logic |
| `js/ping.js` | Sonar ring expansion and visibility calculations |
| `js/player.js` | Player movement and wall collision |
| `js/enemy.js` | Enemy AI, patrol movement, chase logic |
| `js/collectible.js` | Gem collection system and animations |
| `js/levels.js` | Definitions for all 7 zones |
| `js/hud.js` | HUD rendering, score display, game overlay |
| `js/utils.js` | Shared helper functions and collision utilities |

---

# 🎯 Gameplay Controls

| Key | Action |
|---|---|
| W / A / S / D | Move Player |
| SPACE | Emit Sonar Ping |
| R | Restart Level |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Noman117/Echo-Pulse.git
```

## Run Project

Simply open:

```bash
index.html
```

inside any modern browser.

No installation or dependencies required.

---

# 🌌 Game Zones

1. Cave Depths
2. Ocean Trench
3. Mine Shaft
4. Forgotten Library
5. Space Station
6. Lava Tunnels
7. Final Void

Each zone introduces new enemy layouts and visibility challenges.

---

# 🔊 Audio System

Echo Pulse uses the **Web Audio API** to dynamically generate sonar sounds.

No external sound files are used.

This keeps the project lightweight and dependency-free.

---

# ⚡ Visual Effects

The game includes several visual feedback systems:

- Glow rendering
- Sonar wave animation
- Gem particles
- Death effects
- Screen shake
- Dynamic darkness reveal

---

# 📦 Zero Dependencies

Echo Pulse is fully dependency-free.

No frameworks, engines, or external libraries are used.

Everything is built from scratch using browser-native technologies.

---

# 👨‍💻 Author

Created by **Noman117**

GitHub Repository:

[Echo-Pulse Repository](https://github.com/NomanT17/Echo-Pulse/tree/main)

---

# 📄 License

This project is open source and available under the MIT License.

---

# ⭐ Future Improvements

Possible future upgrades:

- Procedural level generation
- Boss enemies
- Multiplayer race mode
- Dynamic lighting system
- Save system
- Mobile controls
- Online leaderboard

---

# 🧠 Design Philosophy

Echo Pulse is designed around one central idea:

> “Information is temporary.”

Instead of permanently visible environments, the player must actively create visibility using sound.

This transforms navigation into strategy and creates tension from uncertainty.

---

## 💡 Why This Project Stands Out

- Unique sonar-based gameplay mechanic
- Fully custom rendering system
- Strong visual identity
- Zero dependency architecture
- Modular ES6 structure
- Clean separation of systems
- Designed for scalability

---

Echo Pulse · Built with Vanilla JS + HTML5 Canvas · Zero Dependencies
