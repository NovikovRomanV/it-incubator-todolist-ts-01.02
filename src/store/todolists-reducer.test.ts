import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodoListAC, changeTodoListFilterAC,
    ChangeTodoListFilterAT, changeTodoListTitleAC,
    ChangeTodoListTitleAT,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]
})

test("correct todolist should be removed", () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
    expect(endState[0].title).toBe("What to buy")
})

test("correct todolist should be added", () => {
    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);

})

test("correct todolist should change its name", () => {
    let newTodoListTitle = "New TodoList";

    // const action: ChangeTodoListTitleAT = {
    //     type: "CHANGE-TODOLIST-TITLE",
    //     todoListId: todoListId2,
    //     title: newTodoListTitle
    // };

    const endState = todoListsReducer(startState, changeTodoListTitleAC(newTodoListTitle, todoListId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct filter of todolist should be changed", () => {
    let newFilter: FilterValuesType = "completed";

    // const action: ChangeTodoListFilterAT = {
    //     type: "CHANGE-TODOLIST-FILTER",
    //     todoListId: todoListId2,
    //     value: newFilter
    // }

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todoListId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
