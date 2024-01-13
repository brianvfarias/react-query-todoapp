import { useTasksAPI } from "../../../../Hooks/useTasksAPI"
import { Trash } from 'lucide-react'
import { TaskEdition } from "../TaskEdition"

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <input type="checkbox"
          checked={!!completed_at}
          onChange={() => { checkTaskAsDone.mutate(id) }} />
        {completed_at ? <del>{description}</del> : description}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <TaskEdition id={id} title={title} description={description} />
          <button style={{ padding: '0.5rem' }} onClick={() => deleteTaskMutation.mutate(id)} ><Trash color='white' size={14} /></button>
        </div>
      </div>
    </div>
  )
}