import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType, TodoListType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./state/Task";


type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoList_Id: string) => void;
    addTask: (title: string, todoList_Id: string) => void;
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoList_Id: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todoList_Id: string) => void;
    removeTodoList: (todoList_Id: string) => void;
    changeTaskTitle: (taskID: string, newTitle: string, todoList_Id: string) => void;
    changeTodoListTitle: (newTitle: string, todoList_Id: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask,props.todoListID])
    const removeTodoList =useCallback (() => props.removeTodoList(props.todoListID),[props.removeTodoList,props.todoListID])
    const setAllFilter = useCallback(() => props.changeTodoListFilter("all", props.todoListID), [props.changeTodoListFilter,props.todoListID])
    const setActiveFilter = useCallback(() => props.changeTodoListFilter("active", props.todoListID), [props.changeTodoListFilter,props.todoListID])
    const setCompletedFilter = useCallback(() => props.changeTodoListFilter("completed", props.todoListID), [props.changeTodoListFilter,props.todoListID])
    const changeTodoListTitle = useCallback ((title: string) => props.changeTodoListTitle(title, props.todoListID),[props.changeTodoListTitle, props.todoListID])
    let tasksForTodoList = props.tasks;

    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }
    const removeTask = useCallback((taskId: string, todoList_Id: string) => {
        props.removeTask(taskId, todoList_Id)
    }, [props.removeTask])
    const changeTaskStatus = useCallback((taskId: string, newDoneValue: boolean, todoList_Id: string) => {
        props.changeTaskStatus(taskId, newDoneValue, todoList_Id)
    }, [props.changeTaskStatus])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoList_Id: string) => {
        props.changeTaskTitle(taskId, newTitle, todoList_Id)
    }, [props.changeTaskTitle])
    const tasks = tasksForTodoList.map( t=> {

            return <Task
                key={Math.random()}
                todoList_Id={props.todoListID}
                task={t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />


        }
    )


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodoList}>*/}
                {/*    <b>X</b>*/}
                {/*</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : 'primary'}
                    size={"small"}
                    onClick={setAllFilter}>
                    All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : 'primary'}
                    size={"small"}
                    onClick={setActiveFilter}>
                    Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : 'primary'}
                    size={"small"}
                    onClick={setCompletedFilter}>
                    Completed
                </Button>
            </div>
        </div>
    )
})