import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

function TodoList(props: TodoListType) {

    const addTask = (title: string) => props.addTask(title, props.id)

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/*<span>{ task.title }</span>*/}
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                    <button onClick={removeTodoList}>X</button>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >All
                </button>
                <button
                    className={props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >Active
                </button>
                <button
                    className={props.todoListFilter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
