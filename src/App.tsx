import { useState } from 'react'
import './App.css'

export type Todo = {
  id: number
  title: string
}

export function addTodo(todos: Todo[], title: string) {
  const newTodo = { id: todos.length + 1, title: title }
  return [...todos, newTodo]
}

export function removeTodo(todos: Todo[], id: number) {
  return todos.filter(todo => todo.id !== id)
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <div className='App'>
      <h1 data-testid='display-title'>Todo app</h1>

      <button
        onClick={() => {
          const updatedTodos = addTodo(todos, 'New todo, yay!')
          setTodos(updatedTodos)
        }}
      >
        ADD TODO
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-${todo.id}`}>
            {todo.title}
            <button data-testid='remove'
              onClick={() => {
                const updatedTodos = removeTodo(todos, todo.id)
                setTodos(updatedTodos)
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
