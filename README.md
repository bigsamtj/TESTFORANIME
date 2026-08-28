# Forensic Bug Sorting Animation — HTML/CSS/JS

A lightweight, dependency-free implementation of the three supplied light-mode forensic animation frames.

## Frame sequence

1. `frame-01-detection.png` — robot detects the malicious bug in the device stack.
2. `frame-02-extraction.png` — robot extracts the bug and places it into the isolation zone.
3. `frame-03-deployment.png` — bug is deployed onto the road and moves toward the next section.

## Run

No build step is required.

- Keep the folder structure intact.
- Open `index.html` in a modern browser.
- For production, serve the folder through your normal web server.

## Animation behavior

- Three full-resolution 16:9 stills are preloaded.
- JavaScript controls the timeline and frame state.
- CSS provides subtle cinematic scale/position movement.
- The sequence loops continuously.
- The section pauses when it leaves the viewport.
- Play/Pause, Restart and speed controls are included.
- `prefers-reduced-motion` is respected.
- Space toggles Play/Pause; `R` restarts.

## Integrating into the portfolio

Move the `forensic-animation` section into the desired page and keep the `assets` folder beside it. If the surrounding page already has global styles, namespace or merge the CSS variables as appropriate.

For a scroll-driven portfolio version, replace the continuous RAF timeline with a scroll-progress value and map `0–1` to the same three frame ranges.
