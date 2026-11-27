/**
 * Line icons on a 24×24 grid, drawn with a round-capped stroke in the current
 * text color. A string is a path; `c` is a circle [cx, cy, r]; `r` is a
 * rounded rect [x, y, width, height, corner radius].
 * A zero-length segment like `M7 7h.01` draws a dot.
 */
export type Shape = string | { c: readonly [number, number, number] } | { r: readonly [number, number, number, number, number] }

export const ICONS = {
  cpu: [{ r: [6, 6, 12, 12, 2] }, { r: [9.5, 9.5, 5, 5, 1] }, 'M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4'],
  network: [
    { r: [9, 2, 6, 6, 1] },
    { r: [2, 16, 6, 6, 1] },
    { r: [16, 16, 6, 6, 1] },
    'M12 8v4M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2',
  ],
  server: [{ r: [3, 3, 18, 7, 2] }, { r: [3, 14, 18, 7, 2] }, 'M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6'],
  layers: ['M12 2 2 7l10 5 10-5-10-5Z', 'M2 12l10 5 10-5', 'M2 17l10 5 10-5'],
  users: [{ c: [9, 8, 4] }, 'M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1', 'M16 4a4 4 0 0 1 0 8', 'M19 14.5a6 6 0 0 1 3 5.2V21'],
  sparkles: ['M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8Z', 'M19 2v4M17 4h4', 'M19 17v4M17 19h4'],
  code: ['M8 6l-6 6 6 6', 'M16 6l6 6-6 6', 'M14 4l-4 16'],
  globe: [{ c: [12, 12, 10] }, 'M2 12h20', 'M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20'],
  wrench: ['M18.5 3.7 15.5 6.7l1.8 1.8 3-3A5 5 0 0 1 13.6 12.4L6 20a2.12 2.12 0 0 1-3-3l8.1-8A5 5 0 0 1 18.5 3.7Z'],
  shield: ['M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5Z', 'M9 12l2 2 4-4'],
  clock: [{ c: [12, 12, 10] }, 'M12 6v6l4 2'],
  briefcase: [{ r: [2, 7, 20, 14, 2] }, 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M2 13h20', 'M12 12v2'],
  cookie: [{ c: [12, 12, 10] }, 'M8.5 8.5h.01M15 8h.01M8 15h.01M15 15.5h.01M12 12h.01'],
  // GitHub outline from Lucide (lucide.dev, ISC license).
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 3.5c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 10c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  linkedin: [{ r: [2, 2, 20, 20, 3] }, 'M7 7h.01', 'M7 11v6', 'M11 17v-6M11 14a3 3 0 0 1 6 0v3'],
  mail: [{ r: [2, 5, 20, 14, 2] }, 'M2 7l10 6 10-6'],
  instagram: [{ r: [3, 3, 18, 18, 5] }, { c: [12, 12, 4] }, 'M17.5 6.5h.01'],
  car: ['M3 16v-3l2.5-5h9.5l3.5 4H21a1 1 0 0 1 1 1v3h-2', 'M3 16h2M9 16h7', 'M5 12h13', { c: [7, 16, 2] }, { c: [18, 16, 2] }],
  dumbbell: [{ r: [4, 6, 4, 12, 1] }, { r: [16, 6, 4, 12, 1] }, 'M8 12h8', 'M2 9.5v5M22 9.5v5'],
  swim: [
    { c: [17, 6, 2] },
    'M3 13l5-3.5 3 2.5 4-2.5',
    'M2 17c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5',
    'M2 21c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5',
  ],
  lock: [{ r: [4, 11, 16, 10, 2] }, 'M8 11V7a4 4 0 0 1 8 0v4', 'M12 15v2'],
  router: [{ r: [2, 13, 20, 8, 2] }, 'M6 17h.01M10 17h.01M14 17h4', 'M6 13V8M18 13V8'],
  radar: [{ c: [12, 12, 10] }, { c: [12, 12, 5.5] }, 'M12 12l7-7', 'M15.5 14.5h.01'],
} as const satisfies Record<string, readonly Shape[]>

export type IconName = keyof typeof ICONS
