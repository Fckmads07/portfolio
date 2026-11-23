import type { IconName } from '../components/Icon'

export interface Job {
  slug: string
  role: string
  company: string
  location: string
  start: string
  end: string
  current?: boolean
  type: string
  icon: IconName
  summary: string
  duties: string[]
  skills: string[]
}

/** Work experience, from my CV. Most recent first. */
export const jobs: Job[] = [
  {
    slug: 'la-biscuitery',
    role: 'Team Leader',
    company: 'La Biscuitery',
    location: 'Montréal, QC',
    start: 'Nov 30, 2025',
    end: 'Present',
    current: true,
    type: 'Employment',
    icon: 'users',
    summary:
      'Leading a team in a fast-paced environment, following procedures and standards and staying reliable on every shift.',
    duties: [
      'Work as part of a team in a fast-paced environment',
      'Follow procedures and quality standards',
      'Show responsibility and punctuality on every shift',
      'Handle repetitive tasks with rigour',
      'Solve common technical problems as they come up',
    ],
    skills: ['Leadership', 'Teamwork', 'Reliability', 'Problem solving'],
  },
  {
    slug: 'chandar-lab',
    role: 'IT & Programming Intern',
    company: 'Chandar Lab',
    location: 'Montréal, QC',
    start: 'Jun 30, 2025',
    end: 'Aug 1, 2025',
    type: 'Internship',
    icon: 'code',
    summary:
      'A summer internship where I learned the foundations of computing and programming — the starting point of my path as a developer.',
    duties: [
      'Learned the fundamentals of computing and programming',
      'Developed algorithmic thinking and problem-solving skills',
      'Took part in collaborative projects and hands-on exercises',
      'Grew more independent in learning and researching information',
      'Applied transferable skills: teamwork, discipline and time management',
    ],
    skills: ['Programming basics', 'Algorithms', 'Collaboration', 'Self-learning'],
  },
]
