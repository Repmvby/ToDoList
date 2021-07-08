import React, {useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {
    //BLL

    const todolists = useSelector<AppRootStateType, TodoListType[]>(
        state => state.todolists
    )
    const tasks = useSelector<AppRootStateType, TaskStateType>(
        state => state.tasks
    )
    const dispatch = useDispatch()

    const removeTask = useCallback ((taskID: string, todoList_Id: string) => {
        const action = removeTaskAC(taskID, todoList_Id)
        dispatch(action)
    },[dispatch])

    const addTask = useCallback ((title: string, todoList_Id: string) => {
        const action = addTaskAC(title, todoList_Id)
        dispatch(action)
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoList_Id: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoList_Id)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoList_Id: string) => {
        const action = changeTaskTitleAC(taskID, newTitle, todoList_Id)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoList_Id: string) => {
        const action = ChangeTodoListFilterAC(newFilterValue, todoList_Id)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoList_Id: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoList_Id))
    }, [dispatch])

    const removeTodoList = useCallback((todoList_Id: string) => {
        const action = RemoveTodoListAC(todoList_Id)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

    }, [dispatch])


    //UI: user interface
    //CRUD: create read update delete
    const todoListsComponents = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: '20px'}}>
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux;

