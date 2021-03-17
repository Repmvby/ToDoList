import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";


type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string,todoList_Id: string) => void;
    addTask: (title: string,todoList_Id: string) => void;
    changeTodoListFilter: (newFilterValue: FilterValuesType,todoList_Id: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean,todoList_Id: string) => void;
    removeTodoList: (todoList_Id: string) => void;
    changeTaskTitle :(taskID: string, newTitle: string, todoList_Id: string) => void;
    changeTodoListTitle: (newTitle:string, todoList_Id: string) => void
}

export function Todolist(props: TodoListPropsType) {
    
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => props.changeTodoListFilter("all",props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListID)


    const tasks = props.tasks.map(t => {

            const removeTask = () => props.removeTask(t.id,props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (newTitle:string) =>props.changeTaskTitle(t.id, newTitle, props.todoListID)
            return (
                <li className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={'secondary'}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask}>
                        <Delete/>
                    </IconButton>
                </li>
            )
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
           <AddItemForm addItem={addTask} />
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
}