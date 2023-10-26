import { useState } from 'react'
import './style.css'

function App() {
  const [newitem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos((currentTodos) => {
      return [
        ...currentTodos, { id: crypto.randomUUID(), title: newitem, completed: false},
      ]
    })

    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className='form-row'>
        <label htmlFor='item'><b>New Item</b></label>
        <input value={newitem} onChange={e => setNewItem(e.target.value)} type="text" id='item' />
      </div>
      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              <button onClick={e => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
            </li>
          )
        })}
        
      </ul>
    </>
  )
}

export default App
