import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')


useEffect(() => {
  const saved = localStorage.getItem('reactTasks')
  if (saved) {
    setTasks(JSON.parse(saved))
  }
}, [])


const isFirstRender = useRef(true)

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }
  localStorage.setItem('reactTasks', JSON.stringify(tasks))
}, [tasks])

  const addTask = () => {
    if (inputValue.trim() === '') return
    setTasks([...tasks, inputValue])
    setInputValue('')
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <div className="todo-container">
      <h1>📝 ToDo-лист на React</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Что нужно сделать?"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>➕ Добавить</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">✨ Пока нет задач. Добавьте первую!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>🗑 Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App