// import { useState } from 'react'
import { Home } from './Pages/Home'
import './App.css'
import { useTasksAPI } from './Hooks/useTasksAPI'


export function App() {
  const { taskQuery: {
    error,
    isLoading
  } } = useTasksAPI()
  return (
    <div>
      <Home />
      {isLoading && <p>Loding tasks</p>}
      {error != null && <p>Error</p>}
    </div>
  )
}

