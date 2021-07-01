import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {IconButton, AppBar, Toolbar, Button, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListFilterAC,
    todoListsReducer,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    AddTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    //BLL

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React&JS", isDone: false},
        ],

        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ],
    })

    function removeTask(taskID: string, todoList_Id: string) {
        let action = removeTaskAC(taskID, todoList_Id)
        dispatchToTasks(action)
    }
    function addTask(title: string, todoList_Id: string) {
        let action = addTaskAC(title, todoList_Id)
        dispatchToTasks(action)
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoList_Id: string) {
        let action = changeTaskStatusAC(taskID, isDone, todoList_Id)
        dispatchToTasks(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoList_Id: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoList_Id)
        dispatchToTasks(action)
    }
    function changeTodoListFilter( newFilterValue: FilterValuesType,todoList_Id: string ) {
        let action = ChangeTodoListFilterAC(newFilterValue, todoList_Id)
        dispatchToTodoLists(action)
    }
    function changeTodoListTitle(newTitle: string, todoList_Id: string) {
        let action = ChangeTodoListTitleAC(newTitle, todoList_Id)
        dispatchToTodoLists(action)
    }
    function removeTodoList(todoList_Id: string) {
        let action = RemoveTodoListAC(todoList_Id)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)

    }


    //UI: user interface
    //CRUD: create read update delete
    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: '20px'}}>
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

