import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTasksAPI } from '../../../../Hooks/useTasksAPI'



export interface TaskInput {
  title: string
  description: string
}



export function Form() {

  const { newTaskMutation } = useTasksAPI();

  const taskInputSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required')
  })

  const { register, setValue, handleSubmit, formState: { errors: formError } } = useForm<TaskInput>({
    resolver: zodResolver(taskInputSchema)
  })

  function addTask(data): SubmitHandler<TaskInput> {
    const { title, description } = data
    newTaskMutation.mutate({ title, description })
    setValue("title", "")
    setValue("description", "")
    return data
  }
  return (
    <form
      onSubmit={handleSubmit(addTask)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}
    >
      <input disabled={newTaskMutation.isLoading} type="text" placeholder="Title" {...register("title")} />
      {formError.title?.message}
      <input disabled={newTaskMutation.isLoading} type="text" placeholder="Description" {...register("description")} />
      {formError.description?.message}
      <button disabled={newTaskMutation.isLoading} >+ Add task</button>
    </form >
  )
}