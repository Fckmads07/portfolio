import type { ReactNode } from 'react'

interface PromptProps {
  /** Working directory shown in the prompt. */
  dir?: string
  command: string
}

/**
 * A two-line shell prompt, used as the eyebrow above headings:
 *
 *   ┌──(madhav㉿kali)-[~/projects]
 *   └─$ ls
 *
 * The frame, user, host and $ sign come from CSS variables set by the active
 * skin (styles/theme.css), so Kali, Kali root and Parrot each get their own.
 */
export function Prompt({ dir = '~', command }: PromptProps) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="prompt__line">
        <span className="prompt__frame prompt__frame--open" />
        <span className="prompt__id" />
        <span className="prompt__frame prompt__frame--mid" />
        <span className="prompt__dir">{dir}</span>
        <span className="prompt__frame prompt__frame--close" />
      </span>
      <span className="prompt__line">
        <span className="prompt__frame prompt__frame--tail" />
        <span className="prompt__sign" />
        <span className="prompt__cmd">{command}</span>
      </span>
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
