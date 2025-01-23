import { useState } from 'react'
import { ViewDayOutlined, CloseOutlined, NotesOutlined } from '@mui/icons-material'
import { useModal } from '@/contexts/Modal'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import InputCheck from '@/components/content_board/input_check/InputCheck'
import InputDate from '@/components/content_board/input_date/InputDate'
import { updateIndexTask, updateDataTask, delTask } from '@/services/tasks.js'
import './ModalTask.css'

const ModalTask = ({ data }) => {
    const { setShowModal } = useModal()
    const [titleValue, setTitleValue] = useState(data.task.title_task)
    const [fulfilledValue, setFulfilledValue] = useState(data.task.fulfilled)
    const [dateActive, setDateActive] = useState(data.task.exp_date ? true : false)
    const [expirationValue, setExpirationValue] = useState(data.task.exp_date ? new Date(data.task.exp_date) : new Date())
    const [descriptionValue, setDescriptionValue] = useState(data.task.description || '')

    const handleTitle = (event) => {
        setTitleValue(event.target.value)
    }

    const handleDescription = (event) => {
        setDescriptionValue(event.target.value)
    }

    const handleSave = async () => {
        const dataUpdate = { 
            title: titleValue, 
            fulfilled: dateActive ? fulfilledValue : false, 
            expDate: dateActive ? expirationValue : null, 
            description: descriptionValue
        }

        if (dateActive) {
            dataUpdate.fulfilled = fulfilledValue
        }

        const taskModified = await updateDataTask(data.idCard, data.task.id_task, dataUpdate, data.setTasks)
        if (taskModified) setShowModal(false)
    }

    const handleDelete = async () => {
        const taskDrop = await delTask(data.idCard, data.task.id_task, data.setTasks)
        if (taskDrop) {
            const tasksFiltered = data.tasks.filter((taskObj) => taskObj.id_task !== taskDrop.id_task)
            for (let i = 0; i < tasksFiltered.length; i++) {
                await updateIndexTask(tasksFiltered[i].id_task, i)
            }
        }
        setShowModal(false)
    }

    return (
        <div className = 'modaltask-wrapper'>
            <article className = 'modaltask-container'>
                <article className = 'modaltask-header'>
                    <span>
                        <ViewDayOutlined sx = {{ fontSize: 24 }} />
                        <input className = 'modaltask-input subtitle-text' 
                               type = 'text' 
                               value = {titleValue} 
                               onChange = {handleTitle} />
                    </span>
                    <IconBtn className = 'modaltask-btn-close' 
                             icon = {<CloseOutlined sx = {{ fontSize: 24 }} />} 
                             handleClick = {() => setShowModal(false)} 
                             dimensions = '28px' />
                </article>

                <article className = 'modaltask-section-date'>
                    <span className = 'small_paragraph-text'>Expiración</span>
                    <span className = 'modaltask-exp-content'>
                        <InputCheck checkValue = {dateActive} 
                                    setCheckValue = {setDateActive} />
                        <InputDate completedValue = {fulfilledValue} 
                                   setCompletedValue = {setFulfilledValue} 
                                   dateValue = {expirationValue} 
                                   setDateValue = {setExpirationValue} />
                    </span>
                </article>

                <article className = 'modaltask-section-description'>
                    <LabelIcon type = 'subtitle'
                               icon = {<NotesOutlined sx = {{ fontSize: 24 }} />} 
                               text = 'Descripción' />
                    <textarea className = 'modaltask-textarea paragraph-text' 
                              value = {descriptionValue} 
                              onChange = {handleDescription}
                              placeholder = 'Agrega una descripción a la tarea...' />
                </article>

                <article className = 'modaltask-section-btns'>
                    <button className = 'modaltask-btn modaltask-btn-save' onClick = {handleSave}>
                        Guardar
                    </button>

                    <button className = 'modaltask-btn modaltask-btn-delete' onClick = {handleDelete}>
                        Eliminar
                    </button>
                </article>
            </article>
        </div>
    )
}

export default ModalTask