import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import App from "./App";
import {AddBox} from "@material-ui/icons";

type AddItemFromPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFromPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = ( e: KeyboardEvent<HTMLInputElement> ) => {
        if(e.key === "Enter") addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is requires!")
        }
        setTitle("")
    }

    // let errorMessage = null
    // if(error){
    //     errorMessage = <div className={"error_message"}>{error}</div>
    // }

    return(
        <div>
            <TextField
                value={ title }
                onChange={ onChangeHandler }
                onKeyPress={ onKeyPressAddItem }
                error={!!error}
                helperText={error && "Title is requires!"}
                label={"Title"}
                variant={"outlined"}
                size={"small"}
            />
            {/*<input*/}
            {/*    value={ title }*/}
            {/*    onChange={ onChangeHandler }*/}
            {/*    onKeyPress={ onKeyPressAddItem }*/}
            {/*    className={ error ? "error" : "" }*/}
            {/*/>*/}
            <IconButton
                onClick={ addItem }
                color={"primary"}
                size={"small"}
            >
                <AddBox
                    fontSize={"large"}
                />
            </IconButton>
            {/*<button onClick={ addItem }>+</button>*/}
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
            {/*или так*/}
            {/*{ errorMessage }*/}
        </div>
    )
}

export default AddItemForm;