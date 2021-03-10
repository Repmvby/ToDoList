import React, {useState, KeyboardEvent, ChangeEvent} from "react";


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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>
                ADD
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
};
export default AddItemForm;