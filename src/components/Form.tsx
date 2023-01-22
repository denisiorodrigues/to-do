import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent } from 'react';
import style from './Form.module.css'

interface FormProps {
    title: string;
    disableButton : boolean;
    onCreateNewTask: (event : FormEvent) => void; 
    onNewTitleChange: (event : ChangeEvent<HTMLInputElement>) => void;
}

export function Form({title, disableButton, onCreateNewTask, onNewTitleChange} : FormProps) {
    return (
        <div className={style.newtask}>
        <form onSubmit={onCreateNewTask}>
          <input 
            type="text"
            placeholder='Adicione uma nova tarefa'
            onChange={onNewTitleChange}
            value={title}
          />

          <button type='submit' disabled={disableButton}> 
            Criar
            <PlusCircle size={14}/>
          </button>
        </form>
      </div>
    )
}