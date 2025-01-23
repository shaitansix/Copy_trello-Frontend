const baseUrl = 'https://copy-trello-backend.vercel.app/my_trello'
const modCardUrl = `${baseUrl}/card`

export const getCardsByBoard = async (idBoard) => { 
    const res = await fetch(`${baseUrl}/${idBoard}/cards`, { method: 'GET' })
    const resData = await res.json()
    return resData.data || []
}

export const renameCard = async (idBoard, idCard, cardName, setCards) => {
    const res = await fetch(`${modCardUrl}/name/${idCard}`, {
        method: 'PUT', 
        body: JSON.stringify({ name: cardName, idBoard }),  
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setCards(await getCardsByBoard(idBoard))
    }
    return resData.data
}

export const updateIndexCard = async (idCard, index) => {
    const res = await fetch(`${modCardUrl}/idx/${idCard}`, {
        method: 'PUT', 
        body: JSON.stringify({ index }), 
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    return resData.data
}

export const addCard = async (data, setCards) => {
    const res = await fetch(modCardUrl, { 
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' } 
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setCards(await getCardsByBoard(data.idBoard))
    }
}

export const delCard = async (idBoard, idCard, setCards) => {
    const res = await fetch(`${modCardUrl}/${idCard}`, { method: 'DELETE' })
    
    const resData = await res.json()
    if (resData.state === 'Success') {
        setCards(await getCardsByBoard(idBoard))
    }
    return resData.data
}