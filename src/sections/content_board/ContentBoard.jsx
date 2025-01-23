import { useState } from 'react'
import { useNavigate } from 'react-router'
import ModBoard from '@/components/content_board/mod_board/ModBoard'
import Cards from '@/components/content_board/cards/Cards'
import { renameBoard, delBoard, getBoardsByWorkspace } from '@/services/boards.js'
import { routes } from '@/routes/routes.js'
import './ContentBoard.css'

const ContentBoard = ({ workspace, board, setBoards }) => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleRename = async (name) => {
        const boardModified = await renameBoard(workspace.id_workspace, board.id_board, name, setBoards)
        if (boardModified) navigate(`/${workspace.name_workspace.replaceAll(' ', '_')}/${boardModified.name_board.replaceAll(' ', '_')}`)
        else setError(true)
    }

    const handleDelete = async () => {
        const boardDrop = await delBoard(workspace.id_workspace, board.id_board, setBoards)
        if (boardDrop) {
            const boards = await getBoardsByWorkspace(workspace.id_workspace)
            if (boards.length > 0) navigate(`/${workspace.name_workspace.replaceAll(' ', '_')}/${boards[0].name_board.replaceAll(' ', '_')}`)
            else navigate(routes.BOARDS)
        }
    }

    return (
        <section className = 'contentboard-wrapper'>
            <div className = 'contentboard-container'>
                <article className = 'contentboard-header'>
                    <ModBoard boardName = {board.name_board} 
                              error = {error} 
                              setError = {setError} 
                              handleRename = {handleRename}
                              handleDelete = {handleDelete} />
                </article>

                <article className = 'contentboard-body'>
                    <Cards board = {board} />
                </article>
            </div>
        </section>
    )
}

export default ContentBoard