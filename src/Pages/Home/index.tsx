import { Form } from "./Components/Form";

import { Task, TaskProps } from "./Components/Task";
import { useTasksAPI } from '../../Hooks/useTasksAPI'

export function Home() {
  const { taskQuery: { data: tasks } } = useTasksAPI()

  return (
    <div>
      <strong>Todo list</strong>
      <Form />
      {tasks && tasks.map(
        ({ description, id, title, completed_at }: TaskProps) => <Task completed_at={completed_at ? completed_at : undefined} id={id} key={id} title={title} description={description} />
      )
      }
    </div>
  )
}