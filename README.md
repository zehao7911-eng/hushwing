# Hushwing

Echo your way through six miniature night gardens. Wake three bell lamps, then reach the glowing arch. Optional moonshards and an echo budget earn extra stars. No enemies, health loss, countdown, purchases or mandatory social interactions.

## Controls

Tap **Echo** to send an expanding pulse. Its light fades slowly. Touch a clear path to fly toward it; drag to change your destination. The subtle stepping-stone dots give a larger touch target for the adjacent stones. Walls stop movement. Keyboard: arrows/WASD move, Space echoes, Escape pauses. Lit bell lamps permanently illuminate their surroundings. Gates with one or two lights open after that many bells. Crystal clusters answer a pulse with a second wave. You can always echo again after its short cooldown; the displayed budget affects one optional star only.

Complete a walk for one star, find its three moonshards for another, and stay within its echo budget for the third. Eighteen stars across six authored layouts. Rose scarf unlocks at six stars; gold at twelve. Both also have optional confirmed GameWave direct-comment/positive-like rewards. Equip scarves in Pause. Replaying improves a best rating rather than repeatedly farming currency.

The six maps use a shared original art kit with six palettes, different paths and gate arrangements, shore lilies, ruin arches, crystals and chimes. They are six finite authored chapters, not infinitely generated worlds. The little bat has continuous membrane wings with finger bones, articulated shoulders, layered ears/muzzle/eyes, scarf, satchel and lantern. These are original procedural 3D meshes and transform animation, not imported commercial models or hand-authored frame sheets. The synth soundtrack and sound effects are local Web Audio synthesis. No generated images are used.

## Running and source

Open `index.html` or `standalone.html` in a WebGL browser, or serve the directory from a static host. Both compiled entries contain the code, CSS, icon and Three.js. No CDN, account, remote model, font, audio or service is required to start. Rebuild with Python 3: `python build.py`. Tests: `node core-tests.mjs` and `node sdk-tests.mjs`.

Actual game-code foundation: [NomanT17/Echo-Pulse](https://github.com/NomanT17/Echo-Pulse), commit `5a13c2dd706eac276c3c00bc03a00b0e20448ddd`. The upstream README explicitly declares MIT; no separate LICENSE file was present at that revision. Exact original source snapshots and README are in `upstream/`. `echo-source.mjs` adapts its real pulse radius/time-since-passing fade, normalized movement, axis-separated circle/rectangle wall resolution, and collectible proximity logic. The pulse tail intentionally continues after reaching the maximum range, rather than vanishing abruptly. This release replaces the original 2D Canvas renderer, enemy/lives system and maps with new 3D gardens and bell/gate/relay progression. It is a gameplay-module adaptation, not a complete unmodified port. See `upstream/PROVENANCE.txt` for mappings. Local Three.js r147 is MIT licensed; its license is in `vendor/THREE-LICENSE.txt`.

Rezona's **Blindsight** informed the temporary scan/reveal direction. Easy mode, wide scan and initial movement were actually tried; no reference level completion is claimed. Its art, code, sounds, logo and characters are not included.

## Saves and GameWave

Only this game's `hushwing-v1` profile is saved locally. It includes per-walk best stars, cosmetic flags, sound/coat settings and the current walk: position, bells, moons, cooldown and live echoes. Reload stops movement before continuation. Hidden/background pages pause. The GameWave adapter guards methods independently and supports absent/partial/late hosts; standalone play never waits for it. An actual echo or committed movement starts a host session; completion and explicit active abandonment end it once. Pause alone does not end it. A resumed page begins a new host session at its first real action. Only the `game:'hushwing', v:1, profile` envelope is read/written to the host. Other games' storage is not enumerated or uploaded.

Confirmed positive-like and new direct-comment callbacks use direct event fields, string project IDs, durable separate claim flags and unsubscribe cleanup. An empty string direct comment can represent an image-only comment. Unsupported platform prompts remain hidden; the same scarves can be earned by play. Browser-only claim flags are local to that browser; cross-device state depends on host saves. Adapter mocks and public-browser checks do not prove actual GameWave App operation or performance on physical phones.
