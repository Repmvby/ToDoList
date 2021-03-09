import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


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
}

export function Todolist(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError("Title is required")
        }

        setTitle("")
    }


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => props.changeTodoListFilter("all",props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)


    const tasks = props.tasks.map(t => {

            const removeTask = () => props.removeTask(t.id,props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

            return (
                <li className={t.isDone ? "is-done" : ""}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span>{t.title}</span>
                    <button onClick={removeTask}>
                        del
                    </button>
                </li>
            )
        }
    )
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}><b>X</b></button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressAddTask}
                    className ={error ? "error" : ""}
                />
                <button onClick={addTask}>
                    ADD
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ''}
                    onClick={setAllFilter}>
                    All
                </button>
                <button
                    className={props.filter === "active" ? "active" : ''}
                    onClick={setActiveFilter}>
                    Active
                </button>
                <button
                    className={props.filter === "completed" ? "active" : ''}
                    onClick={setCompletedFilter}>
                    Completed
                </button>
            </div>
        </div>
    )
}