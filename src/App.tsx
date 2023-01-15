import { ChangeEvent, FormEvent, useState } from 'react'
import {v4 as uuidV4 } from 'uuid'
import { Header } from './components/Header'
import style from './App.module.css'

import './global.css'
import { Task } from './models/Task'

export function App() {
  const [tasks, setTasks] = useState(Array<Task>);

  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);

  function handleCreateNewTask(event : FormEvent) {
    event.preventDefault();
    const task = new Task(title);
    setTasks([...tasks, task]);
    setTitle('');
    setCount(count+1);

    console.log(tasks);
  }

  function handleNewTitleChange(event : ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setTitle(event.target.value);
  }

  var isNewtaskEmpty = title.length === 0;

  return (
    <div>
      <Header/>
      <div>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text"
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTitleChange}
            value={title}
          />

          <button  type='submit' disabled={isNewtaskEmpty}> Criar </button>
        </form>
        {tasks.map( task => {
          return (
            <span>
              <div> { task.title  } </div>
            </span>
          )
        })}
      </div>
    </div>
  )
}