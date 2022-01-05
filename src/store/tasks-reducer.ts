import {TasksStateType} from "../App";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {v1} from "uuid";

export type removeTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
};

export type addTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistId: string
};

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type changedTitleTaskAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

let initialState: TasksStateType = {}

export type ActionsType =
    removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changedTitleTaskAT
    | AddTodoListAT
    | RemoveTodoListAT;

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.taskId);
            return copyState;
        }
        case "ADD-TASK": {
            let copyState = {...state};
            let newTask = {id: v1(), title: action.title, isDone: false};
            if (newTask) {
                copyState[action.todolistId].unshift(newTask)
            }
            return copyState;
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id === action.taskId) return {...t, isDone: action.isDone}
                    else return {...t}
                })
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id === action.taskId) return {
                        ...t,
                        title: action.title
                    }
                    else return {...t}
                })
            };
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            };
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.todoListId];
            // const {[action.todoListId]: [], ...rest} = state
            // return rest
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}

export const changedTitleTaskAC = (taskId: string, title: string, todolistId: string): changedTitleTaskAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
