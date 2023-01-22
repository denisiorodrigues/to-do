import { ChangeEvent, FormEvent, useState } from 'react'
import { Header } from './components/Header'
import style from './App.module.css'

import './global.css'
import { Task } from './models/Task'
import { Tasks } from './components/Tasks'
import { Form } from './components/Form'

export function App() {
  const [tasks, setTasks] = useState(Array<Task>);
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState(0);
  const [countComplete, setCountComplete] = useState(0);

  function handleCreateNewTask(event : FormEvent) {
    event.preventDefault();
    const task = new Task(title);
    setTasks([...tasks, task]);
    setTitle('');
    setTotal((state) => { return state + 1});
  }

  function handleNewTitleChange(event : ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setTitle(event.target.value);
  }

  function deleteTask(id: string){
    
    const taskDeleted =  tasks.find(task => {
      return task.id === id;
    });

    if(taskDeleted?.isComplete){
      setCountComplete((result) => { return result - 1});
    }

    var tasksWithoutDeleteOne = tasks.filter(task => {
      return task.id !== id;
    });

    setTasks(tasksWithoutDeleteOne);
    setTotal((state) => { return state - 1});
    
  }

  //Essa lógica eu pesquisei na internet
  function completeTask(id: string) {
    let newTasks = tasks.map(task => {
      return task.id === id ? {... task, isComplete: toogleCompleteTask(task.isComplete) } : {...task}
    })

    setTasks(newTasks);
  }

  function toogleCompleteTask(isComplete: boolean){
    if(isComplete) {
      setCountComplete((result) => { return result - 1});
      return false;
    } 
    else 
    {
      setCountComplete((result) => { return result + 1});
      return true;
    }
  }

  var isNewtaskEmpty = title.length === 0;

  return (
    <div>
      <Header/>
      <Form 
        title = {title}
        disableButton = {isNewtaskEmpty}
        onCreateNewTask = {handleCreateNewTask}
        onNewTitleChange = {handleNewTitleChange}
      />
        
      <div className={style.task}>  
        <div className={style.info}>
          <span className={style.created}>
            <div className={style.tarefascriada}>Tarefas Criadas</div> 
            <div className={style.counted }>{ total }</div> 
          </span>
          <span className={style.done}>
            <div className={style.concluidas}>
              Concluídas
            </div>
            <b className={style.counter}>{ countComplete } de { total } </b>
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