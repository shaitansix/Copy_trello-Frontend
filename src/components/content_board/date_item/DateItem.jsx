import { useState, useEffect } from 'react'
import { AccessTimeOutlined } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import { completeTask } from '@/services/tasks.js'
import './DateItem.css'

const DateItem = ({ idCard, setTasks, idTask, date, fulfilled }) => {
    const [color, setColor] = useState('')
    const [dateForm, setDateForm] = useState(null)
    const [completed, setCompleted] = useState(null)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    
    useEffect(() => {
        setCompleted(fulfilled)
    }, [fulfilled])
    
    useEffect(() => {
        let dateData = new Date(date)
        setDateForm(`${dateData.getDate()} ${months[dateData.getMonth()]} ${dateData.getFullYear()}`)

        dateData = dateData.toISOString().split('T')[0]
        let dateNow = new Date().toISOString().split('T')[0]
        if (completed) setColor('green')
        else if (dateNow > dateData) setColor('red')
        else if (dateNow < dateData) setColor('green')
        else setColor('yellow')
    }, [date, completed])

    const handleComplete = async () => {
        const taskModified = await completeTask(idCard, idTask, !completed, setTasks)
        if (taskModified) setCompleted(taskModified.fulfilled)
    }

    return (
        <> { dateForm && 
            <span className = {`dateitem dateitem-${color}`}>
                <IconBtn className = 'dateitem-btn-clock' 
                         icon = {<AccessTimeOutlined sx = {{ fontSize: 16 }} />}
                         handleClick = {handleComplete}
                         dimensions = '16px' />
                
                <span className = 'small_paragraph-text'>
                    {dateForm}
                </span>
            </span>
        } </>
    )
}

export default DateItem