import { useQuery, useMutation, useQueryClient } from 'react-query'

import Axios from 'axios'
import { TaskInput } from '../Pages/Home/Components/Form'
import axios from 'axios'

export function useTasksAPI() {
  const queryClient = useQueryClient()
  const taskQuery = useQuery(['todos'], () => {
    return Axios.get('http://localhost:1337/tasks').then(
      (res) => res.data?.Tasks
    )
  })

  const newTaskMutation = useMutation({
    mutationFn: ({ title, description }: TaskInput) => {
      return Axios.post('http://localhost:1337/tasks', {
        title,
        description,
      }).then((res) => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`http://localhost:1337/tasks/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const checkTaskAsDone = useMutation({
    mutationFn: (id: string) => {
      return axios.patch(`http://localhost:1337/tasks/${id}/complete`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  return { taskQuery, newTaskMutation, deleteTaskMutation, checkTaskAsDone }
}
