import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {IconButton, AppBar, Toolbar, Button, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

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

function App() {
    //BLL

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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


    function removeTask(taskID: string, todoList_Id: string) { //id = 2
        const todoListTasks = tasks[todoList_Id]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID) //true
        tasks[todoList_Id] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoList_Id: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const todoListTasks = tasks[todoList_Id]
        tasks[todoList_Id] = [newTask, ...todoListTasks]
        setTasks({...tasks})

    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoList_Id: string) {
        const todoListTasks = tasks[todoList_Id]

        const task = todoListTasks.find(t => t.id === taskID)
        // false -> undefined, null, 0, "empty string", NaN
        // true -> [], {},"probel"
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoList_Id: string) {
        const todoListTasks = tasks[todoList_Id]

        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }


    function changeTodoListFilter(newFilterValue: FilterValuesType, todoList_Id: string) {
        const todoList = todoLists.find(tl => tl.id === todoList_Id)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(newTitle: string, todoList_Id: string) {
        const todoList = todoLists.find(tl => tl.id === todoList_Id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoList_Id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoList_Id))
        delete tasks[todoList_Id]
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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

export default App;

