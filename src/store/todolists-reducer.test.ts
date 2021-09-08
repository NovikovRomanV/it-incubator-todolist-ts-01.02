import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
    expect(endState[0].title).toBe("What to buy")
})

test("correct todolist should be added", () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
    let newTodoListTitle = "New TodoList"

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]

    const endState = todoListsReducer(startState,AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);

})

test("correct todolist should change its name", () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
    let newTodoListTitle = "New TodoList";

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]

    const action: ChangeTodoListTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId: todoListId2,
        title: newTodoListTitle
    };

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListId2, newTodoListTitle));


    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct filter of todolist should be changed", () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = "completed";
    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]

    const action: ChangeTodoListFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId: todoListId2,
        value: newFilter
    }

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
