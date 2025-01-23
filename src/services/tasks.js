const baseUrl = 'https://copy-trello-backend.vercel.app/my_trello'
const modTaskUrl = `${baseUrl}/task`

export const getTasksByCard = async (idCard) => {
    const res = await fetch(`${baseUrl}/${idCard}/tasks`, { method: 'GET' })
    const resData = await res.json()
    return resData.data || []
}

export const addTask = async (data, setTasks) => {
    const res = await fetch(modTaskUrl, { 
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setTasks(await getTasksByCard(data.idCard))
    }
}

export const updateIndexTask = async (idTask, index) => {
    const res = await fetch(`${modTaskUrl}/idx/${idTask}`, {
        method: 'PUT', 
        body: JSON.stringify({ index }), 
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    return resData.data
}

export const completeTask = async (idCard, idTask, fulfilled, setTasks) => {
    const res = await fetch(`${modTaskUrl}/complete/${idTask}`, { 
        method: 'PUT', 
        body: JSON.stringify({ fulfilled }), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setTasks(await getTasksByCard(idCard))
    }
    return resData.data
}

export const updateDataTask = async (idCard, idTask, data, setTasks) => {
    const res = await fetch(`${modTaskUrl}/data/${idTask}`, { 
        method: 'PUT', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setTasks(await getTasksByCard(idCard))
    }
    return resData.data
}

export const updatePositionTask = async (idTask, data) => {
    const res = await fetch(`${modTaskUrl}/position/${idTask}`, { 
        method: 'PUT', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    return resData.data
}

export const delTask = async (idCard, idTask, setTasks) => {
    const res = await fetch(`${modTaskUrl}/${idTask}`, { method: 'DELETE' })
    
    const resData = await res.json()
    if (resData.state === 'Success') {
        setTasks(await getTasksByCard(idCard))
    }
    return resData.data
}