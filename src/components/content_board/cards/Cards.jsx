import { useState, useEffect } from 'react'
import { Reorder } from 'motion/react'
import { useModal } from '@/contexts/Modal'
import Card from '@/components/content_board/card/Card'
import BtnAdd from '@/components/UI/btn_add/BtnAdd'
import FormAdd from '@/components/UI/form_add/FormAdd'
import ModalTask from '@/components/UI/modal_task/ModalTask'
import { getCardsByBoard, addCard, updateIndexCard, renameCard, delCard } from '@/services/cards.js'
import './Cards.css'

const Cards = ({ board }) => {
    const { showModal } = useModal()
    const [cards, setCards] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [createCard, setCreateCard] = useState(false)
    const [renderCards, setRenderCards] = useState(false)

    useEffect(() => {
        const getCards = async () => {
            setCards(await getCardsByBoard(board.id_board))
        }

        getCards()
    }, [board])

    const handleSave = async (name) => { 
        await addCard({ 
            name, 
            idBoard: board.id_board 
        }, setCards)
        setCreateCard(false)
    }

    const handleRename = async (idCard, name) => {
        const modifiedCard = await renameCard(board.id_board, idCard, name, setCards)
        if (!modifiedCard) setError(true)
    }

    const handleDelete = async (idCard) => { 
        const cardDrop = await delCard(board.id_board, idCard, setCards)
        const cardsFiltered = cards.filter((cardObj) => cardObj.id_card !== cardDrop.id_card)
        for (let i = 0; i < cardsFiltered.length; i++) {
            await updateIndexCard(cardsFiltered[i].id_card, i)
        }
    }

    return (
        <> { cards && 
            <Reorder.Group className = 'cards-wrapper' axis = 'x' values = {cards} onReorder = {setCards}>
                <article className = 'cards-container'>
                    {cards.map((card) => <Card key = {card.id_card} 
                                               card = {card} 
                                               cards = {cards} 
                                               error = {error} 
                                               renderCards = {renderCards}
                                               setError = {setError} 
                                               setData = {setData} 
                                               setRenderCards = {setRenderCards} 
                                               handleRename = {handleRename}
                                               handleDelete = {handleDelete} />)}

                    <article className = 'cards-section-add'>
                        { createCard ? 
                            <FormAdd className = 'cards-btn-close' 
                                     type = 'card'
                                     handleSave = {handleSave}
                                     handleClose = {() => setCreateCard(false)} /> : 
                            <BtnAdd text = 'Agregar tarjeta'
                                    onClick = {() => setCreateCard(true)} />
                        }
                    </article>
                </article>
            </Reorder.Group> }

            { showModal && data && 
                <ModalTask data = {data} />
            }
        </>
    )
}

export default Cards