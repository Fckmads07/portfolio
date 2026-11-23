import type { IconName } from '../components/Icon'

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
  tagline: 'From the network layer up to the API.',
  intro:
    "I'm a Computer Science student at Cégep Marie-Victorin in Montréal, in the 3rd semester of my DEC. I'm interested in networking, systems and backend development, and I like building projects that show me how software and infrastructure work end to end — from the network layer up to the API.",
  /** Words cycled by the typing effect in the home hero. */
  focus: ['networks.', 'systems.', 'backend APIs.', 'embedded devices.', 'the web.'],
  languages: ['French', 'English'],
}

export type SocialId = 'linkedin' | 'gmail' | 'instagram' | 'github'

export interface Social {
  id: SocialId
  label: string
  handle: string
  href: string
  icon: IconName
  blurb: string
}

/**
 * Instagram profile URL. Leave empty to hide every Instagram link on the site.
 * Example: 'https://www.instagram.com/your_handle/'
 */
const INSTAGRAM_URL = ''
const INSTAGRAM_HANDLE = ''

const allSocials: Social[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/madhav-ramdin',
    href: 'https://www.linkedin.com/in/madhav-ramdin-241a06377/',
    icon: 'linkedin',
    blurb: 'The best way to reach me — internships, projects and opportunities.',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    handle: 'm.ramdin07@gmail.com',
    href: 'mailto:m.ramdin07@gmail.com',
    icon: 'mail',
    blurb: 'Drop me an email and I will get back to you.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    icon: 'instagram',
    blurb: 'A look at life outside the terminal.',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@Fckmads07',
    href: 'https://github.com/Fckmads07',
    icon: 'github',
    blurb: 'Every project, lab and experiment I push.',
  },
]

/** Only the socials that have a link configured. */
export const socials = allSocials.filter((s) => s.href !== '')

/** What kind of developer Madhav is — shown as "Why Madhav?" tiles. */
export const traits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'layers',
    title: 'End-to-end',
    text: 'I want to understand the whole stack, from packets to endpoints.',
  },
  {
    icon: 'cpu',
    title: 'Hands-on',
    text: 'I learn by building — boards, wires and code on the same desk.',
  },
  {
    icon: 'network',
    title: 'Systems-minded',
    text: 'Networks, Linux and VMs are where I like to dig in.',
  },
  {
    icon: 'users',
    title: 'Team player',
    text: 'I lead a team at work: reliable, punctual and calm under rush.',
  },
  {
    icon: 'sparkles',
    title: 'Always learning',
    text: 'Three semesters in, and every one of them shipped new projects.',
  },
]

export const stats: { value: string; label: string; text: string }[] = [
  {
    value: '19',
    label: 'Repositories',
    text: 'Projects, labs and experiments pushed to GitHub since July 2025.',
  },
  {
    value: '3rd',
    label: 'Semester',
    text: 'of my DEC in Computer Science at Cégep Marie-Victorin.',
  },
  {
    value: '6',
    label: 'Languages',
    text: 'Python, Java, JavaScript, SQL, C and Bash — and counting.',
  },
]

export const techStack: { area: string; icon: IconName; items: string[] }[] = [
  { area: 'Languages', icon: 'code', items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  {
    area: 'Networking',
    icon: 'network',
    items: ['Network design', 'VLSM & subnetting', 'Static routing', 'NAT', 'Cisco Packet Tracer'],
  },
  { area: 'Systems', icon: 'server', items: ['Linux', 'Bash', 'VMware'] },
  { area: 'Web', icon: 'globe', items: ['React', 'Vite', 'FastAPI', 'HTML', 'CSS'] },
  { area: 'Databases & Tools', icon: 'wrench', items: ['MySQL', 'Git', 'GitHub'] },
  { area: 'Embedded', icon: 'cpu', items: ['MicroPython', 'ESP32', 'Arduino', 'Raspberry Pi'] },
]

export interface Milestone {
  date: string
  title: string
  text: string
  tags: string[]
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
    text: 'Network design in Packet Tracer (VLSM, static routing, NAT), embedded programming with MicroPython on the ESP32, and security incident investigation. Now building ChronoAlarme and a turn-based RPG REST API in Java.',
    tags: ['Networking', 'ESP32', 'Security'],
    current: true,
  },
  {
    date: 'Summer 2027',
    title: 'Next: my first internship',
    text: 'I am looking for an internship starting Summer 2027 in networking, systems or backend development.',
    tags: ['Open to work'],
  },
]
