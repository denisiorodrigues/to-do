import { ChangeEvent, FormEvent, useState } from 'react'
import {v4 as uuidV4 } from 'uuid'
import { Header } from './components/Header'
import style from './App.module.css'

import './global.css'
import { Task } from './models/Task'
import { Tasks } from './components/Tasks'

export function App() {
  const [tasks, setTasks] = useState(Array<Task>);
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState(0);

  function handleCreateNewTask(event : FormEvent) {
    event.preventDefault();
    const task = new Task(title);
    setTasks([...tasks, task]);
    setTitle('');
    setTotal((state) => { return state + 1});
  }

  function handleNewTitleChange(event : ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setTitle(event.target.value);
  }

  function getCompletetasks(){
    const completeTasks = tasks.filter((task) => { task.isComplete === true });
    return completeTasks.length;
  }

  function deleteTask(id: string){
    
    const tasksWithoutDeleteOne =  tasks.filter(task => {
      return task.id !== id;
    });

    setTasks(tasksWithoutDeleteOne);
    setTotal((state) => { return state - 1});
  }

  //Essa lógica eu pesquisei na internet
  function completeTask(id: string) {
    let newTasks = tasks.map(task => {
      return task.id === id ? {... task, isComplete: !task.isComplete } : {...task}
    })

    setTasks(newTasks);
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
        <div>
          <span>
            Tarefas Criadas { total }
          </span>
          <span> 
            Concluídas  <b>{ getCompletetasks() } de { total } </b>
          </span>
        </div>
        {tasks.map( task => {
          return <Tasks
                    key={task.id}
                    task={task}
                    onDeleteTask={deleteTask}
                    onCompleteTask={completeTask}
                  />
        })}
      </div>
    </div>
  )
}