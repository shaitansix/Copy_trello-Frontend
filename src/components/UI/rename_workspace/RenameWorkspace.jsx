import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { WebStoriesOutlined, SaveOutlined, CreateOutlined } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import './RenameWorkspace.css'

const RenameWorkspace = ({ workspaceName, edit, setEdit, error, setError, handleRename }) => {
    const { board } = useParams()
    const [inputValue, setInputValue] = useState(null)

    useEffect(() => {
        if (error) { 
            setInputValue(workspaceName)
            setError(false)
        }
    }, [error])

    useEffect(() => {
        setInputValue(workspaceName)
    }, [workspaceName])
    
    const handleInput = (event) => {
        setInputValue(event.target.value)
    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleSave = () => {
        let newName = inputValue.trim()
        if (newName !== '' && newName !== workspaceName) { 
            handleRename(newName)
            setInputValue(newName)
        } else { 
            setInputValue(workspaceName)
        }
        setEdit(false)
    }

    return (
        <div className = 'renameworkspace-wrapper'>
            <article className = 'renameworkspace-container'>
                { (inputValue || inputValue === '') && <>
                    <WebStoriesOutlined sx = {{ fontSize: 48 }} />

                    <span className = 'renameworkspace-body'>
                        { edit ? <>
                            <input className = 'renameworkspace-input subtitle-text' 
                                   value = {inputValue} 
                                   onChange = {handleInput} /> 
                            <span className = 'renameworkspace-info'>
                                <span className = 'small_paragraph-text'>Guardar</span>
                                <IconBtn className = {`renameworkspace-btn ${board ? 'renameworkspace-btn-board' : 'renameworkspace-btn-workspace'}`} 
                                         icon = {<SaveOutlined sx = {{ fontSize: 16 }} />} 
                                         handleClick = {handleSave} 
                                         dimensions = '24px' />
                            </span> </> : <>
                            <span className = 'title-text'>
                                {inputValue}
                            </span>
                            <span className = 'renameworkspace-info'>
                                <span className = 'small_paragraph-text'>Editar</span>
                                <IconBtn className = {`renameworkspace-btn ${board ? 'renameworkspace-btn-board' : 'renameworkspace-btn-workspace'}`} 
                                         icon = {<CreateOutlined sx = {{ fontSize: 16 }} />} 
                                         handleClick = {handleEdit} 
                                         dimensions = '24px' />
                            </span> </>
                        }
                    </span>
                </> }
            </article>
        </div>
    )
}

export default RenameWorkspace