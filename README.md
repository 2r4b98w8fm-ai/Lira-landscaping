# LAST SEEN

A mobile-first detective game played entirely inside a simulated smartphone. Each case hands
you a missing person's recovered phone: read their messages, study their photos, crack their
locked notes, and file a case report citing the evidence you found. Psychological dread,
no gore — and every case is original fiction.

**$0 forever:** no backend, no accounts, no ads, no paywalls. Static site, installable PWA,
fully playable offline after the first load.

## Play

```bash
npm install
npm run dev        # local dev server
npm run build      # validate content → typecheck → bundle to dist/
npm run preview    # serve the production build
npm run validate   # content validator only
```

Deploy `dist/` to any static host free tier (Cloudflare Pages, Netlify, Vercel, GitHub Pages).
Build command: `npm run build` · output directory: `dist`.

## How a case works

- **Lock screen → home screen → apps.** Messages, Photos (with a Recently Deleted folder and
  EXIF panel), Notes (some locked behind 4-digit codes), Voicemail (synthesized "corrupted"
  audio + full transcripts), Calendar, an abstract Maps timeline, Browser history, and Files.
- **Lock codes** are always derivable from clues inside the same case — never outside
  knowledge, never a lockout.
- **A hidden app**, disguised as something mundane, appears on the home screen once you've
  read the right things. It is always the worst thing on the phone.
- **The phone is alive**: battery drains in real time, old threads start "typing…", and new
  messages arrive from senders who should not know you're there.
- **The report**: choose a theory, cite evidence. The closest-matching verdict tells you its
  epilogue. One per case is canon. The canon ending never explains everything — on purpose.

## Accessibility & intensity

- `prefers-reduced-motion` disables glitch/flicker effects automatically.
- Settings (in-phone) → **Reduced intensity** turns off all sudden effects; story content
  is unchanged. Ambient audio is opt-in, synthesized via Web Audio (no audio assets).
- All voicemails have transcripts. Touch targets are ≥44px. Keyboard fallbacks exist for
  the swipe-to-unlock and code pad.

## Architecture

```
src/
  types.ts            case content schema — cases are pure data
  validator.ts        build-time content validation (npm run validate)
  save.ts             localStorage save file (progress, settings)
  audio.ts            Web Audio: ambient drone, voicemail textures, stingers
  glitch.ts           CRT-glitch overlay (respects reduced motion/intensity)
  photoart.ts         SVG helpers for procedural "recovered photo" scenes
  icons.ts            original app-icon set + UI glyphs
  device/             phone shell: runtime (nav stack, clock, live events),
                      lock screen, home screen, app registry
  apps/               one module per app (messages, photos, notes, codepad,
                      voicemail, calendar, maps, browser, files, settings,
                      hidden, report)
  cases/              case01…caseNN — content only, no UI code
scripts/validate.ts   CI-friendly content check (runs first in npm run build)
```

Adding a case = adding one data file to `src/cases/` and registering it in
`src/cases/index.ts`. The validator fails the build if a lock code has no in-case clue path,
a verdict cites evidence that isn't citable, an id dangles, or a timestamp doesn't parse.

## Case roster

| # | Title | Shape |
|---|-------|-------|
| 01 | The Static Line | surveillance collective inside an apartment building |
| 02 | Rideshare, One Star | human predator inside the platform |
| 03 | Grief Group | an organization that farms the grieving |
| 04 | The Last Customer | the kind the report can't hold |
| 05 | Second Shift | institutional cover-up |

The schema supports the full planned roster (see `src/types.ts`); new cases ship as data.
