import { useState, useEffect } from 'react'
import { AccessTimeOutlined } from '@mui/icons-material'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import './StateTask.css'

const StateTask = ({ completed, setCompleted, date }) => {
    const [color, setColor] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        let dateData = new Date(date).toISOString().split('T')[0]
        let dateNow = new Date().toISOString().split('T')[0]

        if (completed) {
            setColor('green')
            setStatus('Completada')
        } else if (dateNow > dateData) { 
            setColor('red')
            setStatus('Vencida')
        } else if (dateNow < dateData) { 
            setColor('green')
            setStatus('Por hacer')
        } else { 
            setColor('yellow')
            setStatus('En progreso')
        }
    }, [date, completed])
    
    return (
        <> { status && color && 
            <span className = {`statetask statetask-${color}`}>
                <IconBtn className = 'statetask-btn-clock' 
                         icon = {<AccessTimeOutlined sx = {{ fontSize: 16 }} />}
                         handleClick = {() => setCompleted(!completed)}
                         dimensions = '16px' />
                <span className = 'small_paragraph-text'>
                    {status}
                </span>
            </span>
        } </>
    )
}

export default StateTask