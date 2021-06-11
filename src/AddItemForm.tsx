import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                value={ title }
                onChange={ onChangeHandler }
                onKeyPress={ onKeyPressAddItem }
                className={ error ? "error" : "" }
            />
            <button onClick={ addItem }>+</button>
            {error && <div className={"error-message"}>{error}</div>}
            {/*или так*/}
            {/*{ errorMessage }*/}
        </div>
    )
}

export default AddItemForm;