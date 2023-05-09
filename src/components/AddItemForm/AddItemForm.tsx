import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>("")

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title)
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
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            label={'Title'}
            helperText={error}
            disabled={disabled}
        />
        <IconButton color='primary' onClick={addItemHandler} disabled={disabled}
                    style={{marginLeft: '5px'}}>+</IconButton>
    </div>
})
