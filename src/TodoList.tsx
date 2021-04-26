import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksType} from "./App";


type TodoListType = {
    id: string
    title: string
    tasks: Array<TasksType>
    todoListFilter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError("Title is requires!")
        }
        setTitle("")
    }

    const tasks = props.tasks.map(task => {
        const removeTask = () => { props.removeTask(task.id, props.id) }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            {props.changeStatus(task.id, e.currentTarget.checked, props.id)}
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    onChange={ changeStatus }
                    type="checkbox"
                    checked={ task.isDone }
                />
                <span>{ task.title }</span>
                <button onClick={ removeTask }>X</button>
            </li>
        )
    })

    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = ( e: KeyboardEvent<HTMLInputElement> ) => {
        if(e.key === "Enter") addTask()
    }

    const onAllClickHandler = () => { props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => { props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}



    // let errorMessage = null
    // if(error){
    //     errorMessage = <div className={"error_message"}>{error}</div>
    // }



    return (
        <div>
            <div>
                <h3>{ props.title }<button onClick={removeTodoList}>X</button></h3>

            </div>
            <div>
                <input
                    value={ title }
                    onChange={ onChangeHandler }
                    onKeyPress={ onKeyPressHandler }
                    className={ error ? "error" : "" }
                />
                <button onClick={ addTask }>+</button>

                {error && <div className={"error-message"}>{error}</div>}
                {/*или так*/}
                {/*{ errorMessage }*/}

            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={ onAllClickHandler }
                >All</button>
                <button
                    className={props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={ onActiveClickHandler }
                >Active</button>
                <button
                    className={props.todoListFilter === "completed" ? "active-filter" : ""}
                    onClick={ onCompletedClickHandler }
                >Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
