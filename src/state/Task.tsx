import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";

type TaskPropsType = {
    todoList_Id: string
    task: TaskType
    removeTask: (taskID: string, todoList_Id: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todoList_Id: string) => void;
    changeTaskTitle: (taskID: string, newTitle: string, todoList_Id: string) => void;


}
export const Task = React.memo ((props: TaskPropsType) => {
    function changeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
        let newDoneValue = e.currentTarget.checked
        props.changeTaskStatus(
            props.task.id,newDoneValue , props.todoList_Id
        )
    }

    const changeTaskTitle = useCallback ((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoList_Id);

    },[props.changeTaskTitle,props.todoList_Id,props.task.id])

    function removeTask() {
        props.removeTask(props.task.id, props.todoList_Id)
    }

    return (

        <div  className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={'secondary'}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )


})
