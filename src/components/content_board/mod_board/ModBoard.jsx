import { useState, useEffect } from 'react'
import { CreateOutlined, SaveOutlined, DeleteOutline } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import './ModBoard.css'

const ModBoard = ({ boardName, error, setError, handleRename, handleDelete }) => {
    const [inputValue, setInputValue] = useState(boardName)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (error) { 
            setInputValue(boardName)
            setError(false)
        }
    }, [error])

    useEffect(() => {
        setInputValue(boardName)
    }, [boardName])

    const handleInput = (event) => {
        setInputValue(event.target.value)
    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleSave = () => {
        let newName = inputValue.trim()
        if (newName !== '' && newName !== boardName) { 
            handleRename(newName)
            setInputValue(newName)
        } else { 
            setInputValue(boardName)
        }
        setEdit(false)
    }

    return (
        <span className = 'modboard'>
            { edit ? 
                <input className = 'modboard-input paragraph-text' 
                       value = {inputValue} 
                       onChange = {handleInput} /> : 
                <span className = 'modboard-text subtitle-text'>
                    {boardName}
                </span>
            }
            <span className = 'modboard-iconbtns'>
                <IconBtn className = 'modboard-iconbtn' 
                         icon = {edit ? <SaveOutlined sx = {{ fontSize: 20 }} /> : <CreateOutlined sx = {{ fontSize: 20 }} />}
                         handleClick = {edit ? handleSave : handleEdit}
                         dimensions = '28px' />
                <IconBtn className = 'modboard-iconbtn-delete' 
                         icon = {<DeleteOutline sx = {{ fontSize: 20 }} />}
                         handleClick = {handleDelete}
                         dimensions = '28px' />
            </span>
        </span>
    )
}

export default ModBoard