import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksType} from "./App";


type TodoListType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
}

function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError("Title is requires!")
        }
        setTitle("")
    }

    const tasks = props.tasks.map(t => {
        const removeTask = () => { props.removeTask(t.id) }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            {props.changeStatus(t.id, e.currentTarget.checked)}
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    onChange={ changeStatus }
                    type="checkbox"
                    checked={ t.isDone }
                />
                <span>{ t.title }</span>
                <button onClick={ removeTask }>X</button>
            </li>
        )
    })

    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = ( e: KeyboardEvent<HTMLInputElement> ) => { if(e.key === "Enter") addTask() }

    const onAllClickHandler = () => { props.changeFilter("all") }
    const onActiveClickHandler = () => { props.changeFilter("active") }
    const onCompletedClickHandler = () => { props.changeFilter("completed") }

    // let errorMessage = null
    // if(error){
    //     errorMessage = <div className={"error_message"}>{error}</div>
    // }



    return (
        <div>
            <div>
                <h3>{ props.title }</h3>
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
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={ onAllClickHandler }
                >All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={ onActiveClickHandler }
                >Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={ onCompletedClickHandler }
                >Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
