import { useState, useEffect } from 'react'
import { CloseOutlined } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import './FormAdd.css'

const FormAdd = ({ className = '', type, handleSave, handleClose }) => {
    const [valueInput, setValueInput] = useState('')
    const [placeholder, setPlaceholder] = useState(null)

    useEffect(() => {
        if (type === 'workspace') {
            setPlaceholder('Nombre del espacio de trabajo')
        } else if (type === 'board') {
            setPlaceholder('Nombre del tablero')
        } else if (type === 'card') {
            setPlaceholder('Nombre de la tarjeta')
        } else if (type === 'task') {
            setPlaceholder('Nombre de la tarea')
        }
    }, [type])

    const handleInput = (event) => {
        setValueInput(event.target.value)
    }

    const handleAdd = () => {
        handleSave(valueInput.trim())
    }

    return (
        <section className = 'formadd-wrapper'>
            <div className = 'formadd-container'>
                { placeholder && <>
                    <input className = 'formadd-input paragraph-text' 
                           value = {valueInput} 
                           onChange = {handleInput} 
                           placeholder = {placeholder} />
                    
                    <span>
                        <button className = 'formadd-btn-add' onClick = {handleAdd}>
                            Agregar
                        </button>

                        <IconBtn className = {`formadd-btn-close ${className}`}
                                 icon = {<CloseOutlined sx = {{ fontSize: 24 }} />}
                                 handleClick = {handleClose} 
                                 dimensions = '34px' />
                    </span>
                </> }
            </div>
        </section>
    )
}

export default FormAdd