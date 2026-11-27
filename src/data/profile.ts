import type { IconName } from '../icons/icons'

export const profile = {
  name: 'Madhav Ramdin',
  firstName: 'Madhav',
  githubHandle: 'Fckmads07',
  title: 'Computer Science student',
  school: 'Cégep Marie-Victorin',
  program: 'DEC in Computer Science',
  semester: '3rd semester',
  location: 'Montréal, QC',
  availability: 'Open to Summer 2027 internships',
  tagline: 'Networks, security and the systems in between.',
  intro:
    "I'm a Computer Science student at Cégep Marie-Victorin in Montréal, in the 3rd semester of my DEC. What pulls me in is networking and cybersecurity: designing networks, understanding how traffic moves through them, and learning how systems get attacked — and how to defend them.",
  /** Words cycled by the typing effect in the home hero, after "Focused on". */
  focus: ['networks.', 'cybersecurity.', 'Linux systems.', 'routing & NAT.', 'incident response.'],
  languages: ['French', 'English'],
}

export type SocialId = 'linkedin' | 'gmail' | 'instagram' | 'github'

export interface Social {
  id: SocialId
  label: string
  handle: string
  href: string
  icon: IconName
  /** Palette slot used for the icon and hover color. */
  hue: string
  blurb: string
}

/**
 * Instagram profile URL. Leave empty to hide every Instagram link on the site.
 * Example: 'https://www.instagram.com/your_handle/'
 */
const INSTAGRAM_URL = 'https://www.instagram.com/madsimplement/'
const INSTAGRAM_HANDLE = '@madsimplement'

const allSocials: Social[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/madhav-ramdin',
    href: 'https://www.linkedin.com/in/madhav-ramdin-241a06377/',
    icon: 'linkedin',
    hue: 'cyan',
    blurb: 'The best way to reach me — internships, projects and opportunities.',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    handle: 'm.ramdin07@gmail.com',
    href: 'mailto:m.ramdin07@gmail.com',
    icon: 'mail',
    hue: 'peach',
    blurb: 'Drop me an email and I will get back to you.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    icon: 'instagram',
    hue: 'pink',
    blurb: 'A look at life outside the terminal.',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@Fckmads07',
    href: 'https://github.com/Fckmads07',
    icon: 'github',
    hue: 'mauve',
    blurb: 'Every project, lab and experiment I push.',
  },
]

/** Only the socials that have a link configured. */
export const socials = allSocials.filter((s) => s.href !== '')

export const socialById = (id: SocialId) => socials.find((s) => s.id === id)

/** The big "M" next to the whois card on the home page. */
export interface FetchRow {
  /** "Group.Detail" keys are drawn with the detail in a second color. */
  key: string
  value: string
}

/** Rows of the `whois` card, in groups split by a little space. */
export const fetchGroups: FetchRow[][] = [
  [
    { key: 'Name', value: 'Madhav Ramdin' },
    { key: 'Location', value: 'Montréal, QC' },
    { key: 'School', value: 'Cégep Marie-Victorin' },
    { key: 'Program', value: 'DEC in Computer Science, 3rd semester' },
    { key: 'Status', value: 'open to Summer 2027 internships' },
  ],
  [
    { key: 'Focus.Main', value: 'networking, cybersecurity' },
    { key: 'Focus.Also', value: 'Linux systems, embedded devices' },
    { key: 'Languages.Spoken', value: 'French, English' },
  ],
  [{ key: 'Offline', value: 'cars, swimming, the gym' }],
]

/** What kind of person Madhav is — shown as "Why Madhav?" tiles. */
export const traits: { icon: IconName; hue: string; title: string; text: string }[] = [
  {
    icon: 'router',
    hue: 'cyan',
    title: 'Network-first',
    text: 'Subnets, routing tables and NAT are where I am most at home. I like knowing exactly where every packet goes.',
  },
  {
    icon: 'shield',
    hue: 'green',
    title: 'Security-minded',
    text: 'I have traced an attack on a compromised server through its logs, and I want to keep learning how to defend systems.',
  },
  {
    icon: 'server',
    hue: 'blue',
    title: 'Systems',
    text: 'Linux, virtual machines and the command line: I like setting things up and seeing how they run.',
  },
  {
    icon: 'users',
    hue: 'peach',
    title: 'Team player',
    text: 'I lead a team at work: reliable, punctual and calm under rush.',
  },
  {
    icon: 'dumbbell',
    hue: 'yellow',
    title: 'Disciplined',
    text: 'The gym and the pool taught me consistency: show up, track progress, repeat. I bring the same habit to my studies.',
  },
]

/** Life outside the terminal, shown like processes in `ps`. Edit freely. */
export const hobbies: {
  icon: IconName
  hue: string
  process: string
  title: string
  text: string
  tags: string[]
}[] = [
  {
    icon: 'car',
    hue: 'red',
    process: 'cars',
    title: 'Cars',
    text: 'I love cars — the engineering under the hood as much as the design. A car is a system of systems, a bit like a network.',
    tags: ['engines', 'design', 'motorsport'],
  },
  {
    icon: 'swim',
    hue: 'sky',
    process: 'swim',
    title: 'Swimming',
    text: 'In the pool it is just me, the lane and the clock. Swimming keeps me calm and focused.',
    tags: ['endurance', 'technique'],
  },
  {
    icon: 'dumbbell',
    hue: 'yellow',
    process: 'gym',
    title: 'The gym',
    text: 'Strength training is how I reset after a day of labs. Progress comes from showing up, every week.',
    tags: ['strength', 'consistency'],
  },
]

/**
 * The toolbox, drawn as an `nmap -sV` scan: each skill area is an "open port".
 * Ports match the area (53 is DNS, 514 is syslog, 22 is SSH, 8266 is the ESP OTA port…).
 */
export const techStack: { port: string; service: string; hue: string; items: string[] }[] = [
  {
    port: '53/tcp',
    service: 'networking',
    hue: 'cyan',
    items: ['Network design', 'OSI / TCP-IP', 'VLSM & subnetting', 'Static routing', 'NAT', 'Cisco Packet Tracer'],
  },
  { port: '514/udp', service: 'security', hue: 'green', items: ['Log analysis', 'Incident investigation', 'Web & DNS logs'] },
  { port: '22/tcp', service: 'systems', hue: 'blue', items: ['Linux', 'ip / nmcli / Netplan', 'Bash', 'VMware'] },
  { port: '8266/tcp', service: 'embedded', hue: 'teal', items: ['MicroPython', 'ESP32', 'Arduino', 'Raspberry Pi'] },
  { port: '3306/tcp', service: 'databases', hue: 'yellow', items: ['MySQL', 'SQL'] },
  { port: '8080/tcp', service: 'code', hue: 'mauve', items: ['Python', 'Java', 'JavaScript', 'C'] },
  { port: '443/tcp', service: 'web', hue: 'peach', items: ['React', 'Vite', 'FastAPI', 'HTML', 'CSS'] },
  { port: '9418/tcp', service: 'git', hue: 'pink', items: ['Git', 'GitHub'] },
]

export interface Milestone {
  date: string
  title: string
  text: string
  tags: string[]
  /** Where I am now; it gets the HEAD marker. Entries after it are plans. */
  current?: boolean
}

/** Developer history, reconstructed from GitHub activity. Oldest first. */
export const history: Milestone[] = [
  {
    date: 'Summer 2025',
    title: 'First lines of code',
    text: 'A summer internship at Chandar Lab introduced me to programming fundamentals and algorithmic thinking. In July I created my GitHub account.',
    tags: ['Fundamentals', 'Problem solving'],
  },
  {
    date: 'Aug 2025 · Session 1',
    title: 'Starting the DEC at Cégep Marie-Victorin',
    text: 'I began my DEC in Computer Science in Montréal — my first semester of computing, programming and web basics.',
    tags: ['HTML', 'CSS', 'Python'],
  },
  {
    date: 'Winter 2026 · Session 2',
    title: 'Building for the web',
    text: 'My first real web projects: a full-featured Timer app with animated canvas backgrounds, a login form and the "Explore le Monde" travel site. I also built an object-oriented banking system in Java.',
    tags: ['JavaScript', 'Java', 'OOP'],
  },
  {
    date: 'Spring 2026',
    title: 'React — and my own API',
    text: 'I moved to React and Vite with a meme generator on the Imgflip API, then CryptoTrack: a React front end backed by a REST API I wrote myself in FastAPI.',
    tags: ['React', 'Vite', 'FastAPI'],
  },
  {
    date: 'Summer 2026',
    title: 'Data structures & algorithms',
    text: 'Linked lists, stacks, queues, hashing, trees, graphs and sorting — practised in Java, Python and C through LeetCode problems.',
    tags: ['Java', 'Python', 'C'],
  },
  {
    date: 'Fall 2026 · Session 3',
    title: 'Down to the hardware and the network',
    text: 'Network design in Packet Tracer (VLSM, static routing, NAT), investigating a security incident from server and DNS logs, and embedded programming with MicroPython on the ESP32.',
    tags: ['Networking', 'Security', 'ESP32'],
    current: true,
  },
  {
    date: 'Summer 2027',
    title: 'Next: my first internship',
    text: 'I am looking for an internship starting Summer 2027 in networking, IT infrastructure or cybersecurity.',
    tags: ['Open to work'],
  },
]
