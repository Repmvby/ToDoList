import {TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoList_Id: string,

}
type ChangeTaskActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string,
    isDone: boolean,
    todoList_Id: string
}

type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string,
    title: string,
    todoList_Id: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodoListActionType

const initialState: TaskStateType = {}

//const initialState = {}
//type initialStateType = typeof initialState

export const tasksReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
           // return {...state, [action.todoList_Id]: [newTask, ...state[action.todoList_Id]]}
             let copyState = {...state}
             const todoListTasks = copyState[action.todoList_Id]
             copyState[action.todoList_Id] = [newTask, ...todoListTasks]
             return  copyState
        }
        case  "CHANGE-TASK-STATUS": {

            return {
                ...state, [action.todoList_Id]: state[action.todoList_Id].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }


        }
        case  "CHANGE-TASK-TITLE": {

            return {
                ...state, [action.todoList_Id]: state[action.todoList_Id].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }


        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todoList_Id: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todoList_Id: todoList_Id}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoList_Id: string): ChangeTaskActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoList_Id}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoList_Id: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoList_Id}
}
