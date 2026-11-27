/** Pages, shown as task buttons in the panel. The key is also a keyboard shortcut. */
export const WORKSPACES = [
  { key: '1', to: '/', label: 'home' },
  { key: '2', to: '/projects', label: 'projects' },
  { key: '3', to: '/experience', label: 'experience' },
] as const

/**
 * The Applications menu, laid out like Kali's: each entry keeps the number and
 * name of a real Kali tool category and points at the part of the site that fits it.
 */
export const APP_MENU = [
  { num: '01', category: 'Information Gathering', label: 'About me', to: '/' },
  { num: '02', category: 'Vulnerability Analysis', label: 'Skills scan', to: '/#scan-title' },
  { num: '08', category: 'Exploitation Tools', label: 'Projects', to: '/projects' },
  { num: '09', category: 'Sniffing & Spoofing', label: 'GitHub traffic', to: '/projects#activity' },
  { num: '12', category: 'Reporting Tools', label: 'Experience', to: '/experience' },
  { num: '13', category: 'Social Engineering Tools', label: 'Contact', to: '/#contact' },
] as const
