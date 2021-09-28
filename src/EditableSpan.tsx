import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)
    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (editMode
        ? <input value={title}
                 autoFocus onBlur={activateViewMode}
                 onChange={changeTitle}/>
        : <span onDoubleClick={activeEditMode}>{props.value}</span>)
}