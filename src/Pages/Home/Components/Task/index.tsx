import { useTasksAPI } from "../../../../Hooks/useTasksAPI"

export interface TaskProps {
  title: string
  description: string
  id: string
  created_at?: Date
  completed_at: Date | undefined
}

export function Task({ id, description, title, completed_at }: TaskProps) {
  const { deleteTaskMutation, checkTaskAsDone } = useTasksAPI()
  return (
    <div>
      <strong>{title}</strong>
      <div>
        <input type="checkbox"
          checked={!!completed_at}
          onChange={() => { checkTaskAsDone.mutate(id) }} />
        {completed_at ? <del>{description}</del> : description}
        <button onClick={() => deleteTaskMutation.mutate(id)} >X</button>
      </div>
    </div>
  )
}