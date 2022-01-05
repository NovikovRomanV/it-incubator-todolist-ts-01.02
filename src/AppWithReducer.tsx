import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changedTitleTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

function AppWithReducer() {
// BLL:
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    let [todolists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
        dispatchToTasks(removeTaskAC(id, todoListId))
    }
    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    function changeTaskStatus(id: string, newIsDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(id, newIsDone, todoListId))
    }
    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatchToTasks(changedTitleTaskAC(id, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchToTodoLists(changeTodoListFilterAC(value, todoListId))
    }
    function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function changeTodoListTitle(title: string, todoListId: string) {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListId))
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

export default AppWithReducer;
