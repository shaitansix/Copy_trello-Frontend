import { useState, useEffect } from 'react'
import { Reorder, useDragControls } from 'motion/react'
import { DragIndicator, DeleteOutlineOutlined } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import SepTasks from '@/components/content_board/sep_task/SepTask'
import Task from '@/components/content_board/task/Task'
import FormAdd from '@/components/UI/form_add/FormAdd'
import BtnAdd from '@/components/UI/btn_add/BtnAdd'
import { updateIndexCard } from '@/services/cards.js'
import { getTasksByCard, updatePositionTask, addTask } from '@/services/tasks.js'
import './Card.css'

const Card = ({ card, cards, error, renderCards, setError, setData, setRenderCards, handleRename, handleDelete }) => {
    const [tasks, setTasks] = useState(null)
    const [createTask, setCreateTask] = useState(false)
    const [inputValue, setInputValue] = useState(card.name_card)
    const [idxDest, setIdxDest] = useState()
    const dragControls = useDragControls()

    useEffect(() => {
        const getTasks = async () => {
            setTasks(await getTasksByCard(card.id_card))
        }

        getTasks()
        if (renderCards) {
            setRenderCards(false)
        }
    }, [card, renderCards])

    useEffect(() => {
        if (error) {
            setInputValue(card.name_card)
            setError(false)
        }
    }, [error])

    const handleInput = (event) => {
        setInputValue(event.target.value)
    }

    const handleInputBlur = () => {
        handleRename(card.id_card, inputValue.trim())
    }

    const handleClick = async () => {
        handleDelete(card.id_card)
    }

    const handleDrag = (event) => {
        dragControls.start(event)
    }

    const handleDragEnd = async () => {
        for (let i = 0; i < cards.length; i++) {
            await updateIndexCard(cards[i].id_card, i)
        }
    }

    const handleSave = async (name) => {
        await addTask({ 
            title: name, 
            expDate: null, 
            fulfilled: false, 
            description: '', 
            idCard: card.id_card 
        }, setTasks)
        setCreateTask(false)
    }

    const handleDrop = async (event) => {
        let idTask = Number(event.dataTransfer.getData('idTask'))
        const data = {  
            idCard: card.id_card, 
            index: idxDest
        }

        await updatePositionTask(idTask, data)
        setRenderCards(true)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    return (
        <Reorder.Item className = 'card-wrapper' value = {card} dragListener = {false} dragControls = {dragControls} drag onDragEnd = {handleDragEnd}>
            <div className = 'card-container'>
                <article className = 'card-header'>
                    <input className = 'card-input subtitle-text' 
                           type = 'text' 
                           value = {inputValue} 
                           onChange = {handleInput}
                           onBlur = {handleInputBlur} />

                    <IconBtn className = 'card-btn-delete'
                             icon = {<DeleteOutlineOutlined sx = {{ fontSize: 24 }} />} 
                             handleClick = {handleClick} 
                             dimensions = '28px' />
                    
                    <button className = 'card-btn-drag' onPointerDown = {handleDrag}>
                        <DragIndicator sx = {{ fontSize: 24 }} />
                    </button>
                </article>

                { tasks && 
                    <article className = 'card-body' onDrop = {handleDrop} onDragOver = {handleDragOver}>
                        {tasks.map((task, idx) => (
                            <span key = {task.id_task}>
                                <SepTasks setIdxDest = {() => setIdxDest(idx)} />
                                <Task task = {task} 
                                      tasks = {tasks}
                                      setData = {setData}
                                      idCard = {card.id_card} 
                                      setTasks = {setTasks} />
                            </span>
                        ))}
                        <SepTasks setIdxDest = {() =>setIdxDest(-1)} />
                    </article>
                }

                <article className = 'card-footer'>
                    { createTask ? 
                        <FormAdd className = '' 
                                 type = 'task' 
                                 handleSave = {handleSave}
                                 handleClose = {() => setCreateTask(false)} /> : 
                        <BtnAdd text = 'Agregar tarea' onClick = {() => setCreateTask(true)} />
                    }
                </article>
            </div>
        </Reorder.Item>
    )
}

export default Card