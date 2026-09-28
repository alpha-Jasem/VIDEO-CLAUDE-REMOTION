# video-claude-remotion

A Remotion video project scaffolded with `create-video` (blank template).

## Stack
- remotion 4.0.529
- react 19.2.3
- @remotion/tailwind-v4 + tailwindcss 4
- TypeScript

## Structure
- `src/Root.tsx` — registers compositions
- `src/Composition.tsx` — the `MyComp` composition (id: `MyComp`, 1280x720, 30fps, 60 frames). `MyComponent` currently renders `null` — no visual content yet.
- `public/` — static assets

## Commands
- `npm run dev` — start Remotion Studio (localhost:3000)
- `npm run build` — bundle the project
- `npx remotion render` — render the video to a file
- `npm run lint` — eslint + tsc

## Notes
- Repo: https://github.com/alpha-Jasem/VIDEO-CLAUDE-REMOTION
- The composition is currently blank (placeholder scaffold). Add visuals in `src/Composition.tsx`.
