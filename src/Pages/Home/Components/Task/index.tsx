export interface TaskProps {
  title: string
  description: string
  id?: string
  created_at?: Date
}

export function Task({ description, title }: TaskProps) {
  return (
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}