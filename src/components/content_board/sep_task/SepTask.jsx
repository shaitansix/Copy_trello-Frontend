import { useState, useEffect } from 'react'
import './SepTask.css'

const SepTasks = ({ setIdxDest }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(false)
    }, [setIdxDest])

    const handleDragOver = (event) => {
        event.preventDefault()
        setIdxDest()
        setActive(true)
    }

    const handleDragLeave = (event) => {
        event.preventDefault()
        setActive(false)
    }

    return (
        <div className = {`septasks${active ? '-active' : ''}`}
             onDragOver = {handleDragOver} 
             onDragLeave = {handleDragLeave} />
    )
}

export default SepTasks