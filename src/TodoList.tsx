import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
            <li key={task.id} >
                <Checkbox
                    color={"primary"}
                    size={"small"}
                    onChange={changeStatus}
                    checked={task.isDone}
                />
                {/*<input*/}
                {/*    onChange={changeStatus}*/}
                {/*    type="checkbox"*/}
                {/*    checked={task.isDone}*/}
                {/*/>*/}
                <span className={task.isDone ? "is-done" : ""} >
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                </span>
                {/*<span>{ task.title }</span>*/}
                <IconButton
                    onClick={removeTask}
                    // color={"primary"}
                    size={"small"}
                    style={{color: "black"}}
                >
                    <Delete fontSize={"small"}/>
                </IconButton>
                {/*<button onClick={removeTask}>X</button>*/}
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
                    <IconButton
                        onClick={removeTodoList}
                         // color={"primary"}
                        size={"small"}
                        style={{color: "black"}}
                    >
                        <Delete />
                    </IconButton>
                    {/*<button onClick={removeTodoList}>X</button>*/}
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
            <ul className={"ul"}>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={props.todoListFilter === "all" ? "outlined" : "contained"}
                    color={props.todoListFilter === "all" ? "secondary" : "primary"}
                    // className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    style={{margin: "0 3px"}}
                    size={"small"}
                    variant={props.todoListFilter === "active" ? "outlined" : "contained"}
                    color={props.todoListFilter === "active" ? "secondary" : "primary"}
                    // className={props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.todoListFilter === "completed" ? "outlined" : "contained"}
                    color={props.todoListFilter === "completed" ? "secondary" : "primary"}
                    // className={props.todoListFilter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;
