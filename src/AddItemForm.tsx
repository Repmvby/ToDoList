import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title:string) => void
}


function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required")
        }

        setTitle("")
    }



    return (
        <div>
            <TextField
                label={'Title'}
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;