import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changedTitleTaskAC, changeTaskStatusAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch()

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }
    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }
    function changeTaskStatus(id: string, newIsDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(id, newIsDone, todoListId))
    }
    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatch(changedTitleTaskAC(id, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }
    function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }


    function getTasksForTodoList(todolist: TodolistType): Array<TasksType> {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} >
                    {
                        todolists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: "20px"}} elevation={5}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={getTasksForTodoList(tl)}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            todoListFilter={tl.filter}
                                            changeFilter={changeFilter}
                                            changeStatus={changeTaskStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
