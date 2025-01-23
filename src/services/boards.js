const baseUrl = 'https://copy-trello-backend.vercel.app/my_trello'
const modBoardUrl = `${baseUrl}/board`

export const getBoardsByWorkspace = async (idWorkspace) => {
    const res = await fetch(`${baseUrl}/${idWorkspace}/boards`, { method: 'GET' })
    const resData = await res.json()
    return resData.data || []
}

export const addBoard = async (data, setBoards) => {
    const res = await fetch(modBoardUrl, { 
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setBoards(await getBoardsByWorkspace(data.idWorkspace))
    }
}

export const renameBoard = async (idWorkspace, idBoard, boardName, setBoards) => {
    const res = await fetch(`${modBoardUrl}/${idBoard}`, {
        method: 'PUT', 
        body: JSON.stringify({ name: boardName, idWorkspace }),  
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setBoards(await getBoardsByWorkspace(idWorkspace))
    }
    return resData.data
}

export const delBoard = async (idWorkspace, idBoard, setBoards) => {
    const res = await fetch(`${modBoardUrl}/${idBoard}`, { method: 'DELETE' })
    
    const resData = await res.json()
    if (resData.state === 'Success') {
        setBoards(await getBoardsByWorkspace(idWorkspace))
    }
    return resData.data
}