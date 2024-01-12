import { useQuery, useMutation, useQueryClient } from 'react-query'

import Axios from 'axios'
import { TaskInput } from '../Pages/Home/Components/Form'

export function useTasksAPI() {
  const queryClient = useQueryClient()
  const taskQuery = useQuery(['todos'], () => {
    return Axios.get('http://localhost:1337/tasks').then(
      (res) => res.data?.Tasks
    )
  })

  const taskMutation = useMutation({
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

  return { taskQuery, taskMutation }
}