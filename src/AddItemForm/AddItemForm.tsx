import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField, IconButton} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log("AddItemForm")

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>("")

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            label={'Title'}
            helperText={error}
        />
        <IconButton color='primary' onClick={addItem}>+</IconButton>
    </div>
})