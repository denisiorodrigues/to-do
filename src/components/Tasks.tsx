import { Trash } from "phosphor-react";
import { Task } from "../models/Task";
import style from './Tasks.module.css'

interface TaskasProps {
    task: Task;
    onDeleteTask: (id: string) => void
    onCompleteTask: (id: string) => void
}

export function Tasks({ task, onDeleteTask, onCompleteTask } : TaskasProps){
    
    function handleIsCompleteTask(){
        onCompleteTask(task.id);
    }

    function hadleDeleteTask(){
        onDeleteTask(task.id);
    }

    return (
        <div className={style.task}>
            <input 
                type="checkbox" 
                checked={task.isComplete}
                onChange={handleIsCompleteTask}
            />
            <p className={task.isComplete ? style.strike : ""}> 
                { task.title } 
            </p>
            
            <button onClick={hadleDeleteTask} title='Deletar comentário'>
                <Trash size={24} />
            </button>
        </div>
    );
}