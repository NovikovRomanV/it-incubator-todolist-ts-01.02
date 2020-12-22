import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
        ]
    );
    let [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(id: string, isDone: boolean){
        const task = tasks.find(t => t.id === id)
        if(task){
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
