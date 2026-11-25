import type { SpriteName } from '../pixel/sprites'

export type Category = 'Embedded' | 'Full-stack' | 'Backend' | 'Web'

export interface ProjectLink {
  label: string
  href: string
  kind: 'repo' | 'demo' | 'site'
}

export interface Project {
  slug: string
  name: string
  repoName?: string
  tagline: string
  description: string
  highlights: string[]
  stack: string[]
  category: Category
  sprite: SpriteName
  period: string
  status?: 'In progress'
  links: ProjectLink[]
}

const gh = (repo: string): ProjectLink => ({
  label: 'Source',
  href: `https://github.com/Fckmads07/${repo}`,
  kind: 'repo',
})

/** Featured projects, in the order of the "Featured Projects" table on the GitHub profile. */
export const featuredProjects: Project[] = [
  {
    slug: 'chronoalarme',
    name: 'ChronoAlarme',
    repoName: 'Esp-32-Radio',
    tagline: 'Standalone stopwatch, timer and alarm clock on an ESP32.',
    description:
      'My final project for the Embedded Platform Programming course: a self-contained device written in MicroPython that works as a stopwatch, a countdown timer and an alarm clock, with its own display and real audio output.',
    highlights: [
      'Three modes — stopwatch, timer and alarm clock — on one board',
      '16x2 character LCD driven over I2C',
      'I2S digital audio through a PCM5102 DAC',
    ],
    stack: ['MicroPython', 'ESP32', 'I2C', 'I2S'],
    category: 'Embedded',
    sprite: 'cpu',
    period: 'Fall 2026',
    status: 'In progress',
    links: [gh('Esp-32-Radio')],
  },
  {
    slug: 'cryptotrack',
    name: 'CryptoTrack',
    repoName: 'CryptoTrack',
    tagline: 'Browse, search and favorite cryptocurrencies — powered by my own API.',
    description:
      'A React + Vite single-page app backed by a REST API I built myself with FastAPI. The API serves a dataset of 30 cryptocurrencies, and the front end lets you search them, open a detail page and keep a list of favorites.',
    highlights: [
      'Custom FastAPI REST API with auto-generated docs',
      'Search, detail pages and favorites shared through React Context',
      'Front end deployed on Vercel',
    ],
    stack: ['React', 'Vite', 'Python', 'FastAPI'],
    category: 'Full-stack',
    sprite: 'layers',
    period: 'Spring 2026',
    links: [
      gh('CryptoTrack'),
      { label: 'Live demo', href: 'https://crypto-track-ljis.vercel.app', kind: 'demo' },
    ],
  },
  {
    slug: 'timer',
    name: 'Timer',
    repoName: 'Timer',
    tagline: 'Clock, stopwatch, countdown and Pomodoro in vanilla JavaScript.',
    description:
      'A time-keeping web app with no framework and no build step. It packs an analog and digital clock with world clocks, a lap stopwatch, a countdown timer with alarms, and a Pomodoro mode — all over animated canvas backgrounds.',
    highlights: [
      'World clocks with day/night and time differences',
      'Web Audio chime, snooze and desktop notifications',
      'Four animated backgrounds that react to the mouse',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
    category: 'Web',
    sprite: 'clock',
    period: 'Winter 2026',
    links: [gh('Timer')],
  },
  {
    slug: 'rpg-rest-api',
    name: 'RPG REST API',
    tagline: 'A turn-based RPG game engine exposed as a REST API.',
    description:
      'A game engine for a turn-based RPG written in Java, where characters, fights and turns are driven through REST endpoints. It is my playground for backend design: modelling a domain, structuring an API and keeping game logic clean.',
    highlights: [
      'Turn-based combat logic in Java',
      'Game state exposed through REST endpoints',
      'Focus on clean backend architecture',
    ],
    stack: ['Java', 'REST'],
    category: 'Backend',
    sprite: 'server',
    period: 'Fall 2026',
    status: 'In progress',
    links: [],
  },
  {
    slug: 'embedded-labs',
    name: 'Programmation de plateforme',
    repoName: 'Programmation-De-Plateforme',
    tagline: 'Embedded programming labs on the ESP32.',
    description:
      'My labs and assignments for the Embedded Platform Programming course (420-314) at Cégep Marie-Victorin: controlling LEDs, buttons, sensors and displays from MicroPython on an ESP32.',
    highlights: [
      'Digital input and output with GPIO',
      'Analog output with PWM and analog input with the ADC',
      'Talking to peripherals over I2C',
    ],
    stack: ['MicroPython', 'ESP32', 'GPIO', 'PWM', 'ADC'],
    category: 'Embedded',
    sprite: 'wrench',
    period: 'Fall 2026',
    links: [
      gh('Programmation-De-Plateforme'),
      { label: 'Course site', href: 'https://cegepmv.github.io/420-314/', kind: 'site' },
    ],
  },
  {
    slug: 'meme-generator',
    name: 'Meme Generator',
    repoName: 'Meme_generator',
    tagline: 'Random meme templates with your own captions.',
    description:
      'A React + Vite app that fetches meme templates from the Imgflip API and lets you write your own top and bottom captions on a random image.',
    highlights: [
      'Data fetching with useEffect and the Fetch API',
      'Controlled inputs for live captions',
      'Component-based layout: header, generator, footer',
    ],
    stack: ['React', 'Vite', 'Imgflip API'],
    category: 'Web',
    sprite: 'sparkles',
    period: 'Spring 2026',
    links: [gh('Meme_generator')],
  },
]

/** Smaller public projects. */
export const otherProjects: Project[] = [
  {
    slug: 'exploration-monde',
    name: 'Explore le Monde',
    repoName: 'Exploration-monde',
    tagline: 'A travel agency landing page in HTML and CSS.',
    description: '',
    highlights: [],
    stack: ['HTML', 'CSS'],
    category: 'Web',
    sprite: 'globe',
    period: 'Winter 2026',
    links: [gh('Exploration-monde')],
  },
  {
    slug: 'login-form',
    name: 'Login Form',
    repoName: 'Login-Form',
    tagline: 'A clean login form UI built with HTML and CSS.',
    description: '',
    highlights: [],
    stack: ['HTML', 'CSS'],
    category: 'Web',
    sprite: 'shield',
    period: 'Winter 2026',
    links: [gh('Login-Form')],
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    repoName: 'Age_calculator',
    tagline: 'Enter your birth date, get your age — in vanilla JavaScript.',
    description: '',
    highlights: [],
    stack: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web',
    sprite: 'clock',
    period: 'Fall 2026',
    links: [gh('Age_calculator')],
  },
]

export interface Course {
  code: string
  title: string
  text: string
  sprite: SpriteName
  hue: string
  highlights?: string[]
}

/** Network and security coursework: the work closest to what I want to do. Private repos. */
export const netsecLabs: Course[] = [
  {
    code: '420-312',
    title: 'Network Design',
    text: 'Designing and configuring small networks end to end, from the models to the router configs.',
    sprite: 'router',
    hue: 'cyan',
    highlights: [
      'OSI and TCP/IP models',
      'Linux networking with ip, nmcli and Netplan',
      'VLSM subnetting and addressing plans',
      'Static routing and NAT in Cisco Packet Tracer',
    ],
  },
  {
    code: '420-313',
    title: 'Security Incident Investigation',
    text: 'Investigating an attack on a compromised PHP/MariaDB customer portal, working only from its logs.',
    sprite: 'radar',
    hue: 'green',
    highlights: [
      'Web server and application logs',
      'Security and DNS logs',
      'Following an attacker through the evidence',
    ],
  },
]

/** Other coursework that lives in private repositories (no public links). */
export const coursework: Course[] = [
  {
    code: 'DS&A',
    title: 'Data Structures & Algorithms',
    text: 'Linked lists, stacks, queues, hashing, trees, graphs and sorting in Java, Python and C.',
    sprite: 'code',
    hue: 'mauve',
  },
  {
    code: 'OOP',
    title: 'Banking System in Java',
    text: 'Console app with customers and checking, savings, student and business accounts: deposits, withdrawals and transfers.',
    sprite: 'briefcase',
    hue: 'peach',
  },
]

export const categories: ('All' | Category)[] = ['All', 'Embedded', 'Full-stack', 'Backend', 'Web']

/** Palette slot for each category's label and dot. */
export const categoryHue: Record<Category, string> = {
  Embedded: 'green',
  'Full-stack': 'mauve',
  Backend: 'yellow',
  Web: 'blue',
}

/** Taglines for repos that have no project entry above, shown instead of the GitHub description. */
export const repoTaglines: Record<string, string> = {
  portfolio: 'This site: networking & security portfolio, synced from GitHub every two days.',
}
