import type { ReactNode } from 'react'

interface PromptProps {
  /** Working directory shown before the prompt character. */
  dir?: string
  command: string
}

/** A shell prompt line: `~/projects ❯ ls`. Used as the eyebrow above headings. */
export function Prompt({ dir = '~', command }: PromptProps) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="prompt__dir">{dir}</span>
      <span className="prompt__char">❯</span>
      <span className="prompt__cmd">{command}</span>
    </p>
  )
}

interface SectionHeadProps extends PromptProps {
  title: string
  id: string
  children?: ReactNode
  /** Something to put on the right of the heading, like a "see all" button. */
  aside?: ReactNode
}

export function SectionHead({ dir, command, title, id, children, aside }: SectionHeadProps) {
  const head = (
    <div>
      <Prompt dir={dir} command={command} />
      <h2 className="section__title" id={id}>
        {title}
      </h2>
      {children && <p className="section__lead">{children}</p>}
    </div>
  )

  return <header className={`section__head${aside ? ' section__head--row' : ''}`}>{head}{aside}</header>
}
