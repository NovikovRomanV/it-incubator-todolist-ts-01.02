import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void

}

function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onEnterOfEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ? <TextField
                size={"small"}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeHandler}
                onKeyPress={onEnterOfEditMode}
            />
            // <input
            //     value={title}
            //     autoFocus={true}
            //     onBlur={offEditMode}
            //     onChange={onChangeHandler}
            //     onKeyPress={onEnterOfEditMode}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;