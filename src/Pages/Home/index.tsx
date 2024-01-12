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
        ({ description, id, title }: TaskProps) => <Task key={id} title={title} description={description} />
      )
      }
    </div>
  )
}