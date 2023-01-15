import styles from './App.module.css';

import todoLogo from '../assets/Logo.svg'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={todoLogo} alt='Logo do ToDo List'/>
        </header>
    );
}