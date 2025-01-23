import { motion } from 'motion/react'
import { CreateOutlined, NotesOutlined } from '@mui/icons-material'
import { useModal } from '@/contexts/Modal'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import DateItem from '@/components/content_board/date_item/DateItem'
import './Task.css'

const Task = ({ task, tasks, setData, idCard, setTasks }) => {
    const { setShowModal } = useModal()

    const handleDragStart = (event) => {
        event.dataTransfer.setData('idTask', task.id_task)
    }

    const handleEdit = () => {
        setData({ 
            idCard, 
            task, 
            tasks, 
            setTasks 
        })
        setShowModal(true)
    }

    return (
        <motion.article className = 'task-wrapper' 
                        layout 
                        layoutId = {task.id}
                        draggable = 'true' 
                        onDragStart = {(event) => handleDragStart(event, task.id)}>
            <span className = 'task-container'>
                <span className = 'task-header'>
                    <span className = 'paragraph-text'>{task.title_task}</span>
                    <IconBtn className = 'task-btn-edit' 
                             icon = {<CreateOutlined sx = {{ fontSize: 16 }} />}
                             handleClick = {handleEdit}
                             dimensions = '24px' />
                </span>

                <span className = 'task-content'>
                    { task.exp_date &&  
                        <DateItem idCard = {idCard} 
                                  setTasks = {setTasks} 
                                  idTask = {task.id_task} 
                                  date = {task.exp_date} 
                                  fulfilled = {task.fulfilled} />
                    }

                    { task.description && 
                        <NotesOutlined sx = {{ fontSize: 20 }} />
                    }
                </span>
            </span>
        </motion.article>
    )
}

export default Task