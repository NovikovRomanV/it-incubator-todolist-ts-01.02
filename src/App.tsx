import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

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

function App() {
// BLL:
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    let [todolist, setTodoList] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Mit', isDone: false},
            {id: v1(), title: 'Apple', isDone: true},
        ]

    })

    // let [tasks, setTasks] = useState<Array<TasksType>>(
    //     [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: false},
    //         {id: v1(), title: 'React', isDone: true},
    //     ]
    // );
    // let [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: string, todoListId: string) {
        const updatedTasks = tasks[todoListId].filter(t => t.id !== id)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false,
        }
        const updatedTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    function addTodoList(title: string) {
        const newTodoListId: string = v1();
        const newTodoList: TodolistType = {
            id: newTodoListId,
            title,
            filter: "all"
        };
        setTodoList([...todolist, newTodoList]);
        setTasks({...tasks, [newTodoListId]: []});
    }

    function changeTaskStatus(id: string, newIsDone: boolean, todoListId: string) {
        const updatedTasks = tasks[todoListId].map(t => t.id === id ? {...t, isDone: newIsDone} : t)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        const updatedTasks = tasks[todoListId].map(t => t.id === id ? {...t, title} : t)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const updatedTodoLists = todolist.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoList(updatedTodoLists)
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        const updatedTodoLists = todolist.map(tl => tl.id === todoListId ? {...tl, title: title} : tl)
        setTodoList(updatedTodoLists)
    }

    function removeTodoList(todoListId: string) {
        const updateTodoList = todolist.filter(tl => tl.id !== todoListId)
        setTodoList(updateTodoList)
        delete tasks[todoListId]
    }

    // let tasksForTodoList = tasks;
    // if (todolist[0].filter === "active") {
    //     tasksForTodoList = tasks.filter(t => !t.isDone)
    // }
    //
    // if (filter === "completed") {
    //     tasksForTodoList = tasks.filter(t => t.isDone)
    // }
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

    //UI:
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
                        todolist.map(tl => {
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

export default App;
