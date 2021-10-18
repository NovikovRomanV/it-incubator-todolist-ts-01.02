import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
};

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
};

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListId: string
};
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType
    todoListId: string
};

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            const newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            };
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListId}
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: todoListId}
}

export const changeTodoListFilterAC = (value: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", todoListId: todoListId, value: value}
}