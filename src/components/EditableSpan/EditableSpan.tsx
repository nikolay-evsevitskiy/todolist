import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({value, onChange, disabled}) => {


    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(value)

    const activeEditMode = () => {
        if (!disabled) {
            setEditMode(true)
            setTitle(value)
        }
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode
        ?
            <TextField
                value={title}
                autoFocus onBlur={activateViewMode}
                onKeyDown={onKeyPressHandler}
                onChange={changeTitle}
            />
        : <span onDoubleClick={activeEditMode} style={disabled ? {'color': 'gray'} : {'color': 'black'}}>{value}</span>
})
