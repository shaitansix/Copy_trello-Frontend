import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { LibraryAddOutlined } from '@mui/icons-material'
import { useModal } from '@/contexts/Modal'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import { getBoardsByWorkspace } from '@/services/boards.js'
import './Boards.css'

const Boards = ({ workspace, setData, header }) => {
    const { setShowModal } = useModal()
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        const getBoards = async () => {
            setBoards(await getBoardsByWorkspace(workspace.id_workspace))
        }

        getBoards()
    }, [workspace])

    const handleAddBoard = () => {
        setData({ 
            idWorkspace: workspace.id_workspace, 
            setBoards
        })

        setShowModal(true)
    }

    return (
        <div className = 'boards-wrapper'>
            <article className = 'boards-container'>
                { boards && <>
                    {header}

                    <article className = 'boards-list'>
                        { boards.map((board) => (
                            <BoardCard key = {board.id_board} 
                                       background = {true} 
                                       workspaceName = {workspace.name_workspace} 
                                       boardName = {board.name_board} />
                        )) }

                        <BoardCard background = {false}
                                   handleAddBoard = {handleAddBoard} />
                    </article>
                </>}
            </article>
        </div>
    )
}

const BoardCard = ({ background, workspaceName, boardName, handleAddBoard }) => {
    return (
        <>{ background ? 
            <Link className = 'boardcard bg-img' 
                  to = {`/${workspaceName.replaceAll(' ', '_')}/${boardName.replaceAll(' ', '_')}`}>
                <span className = 'title-text'>
                    {boardName}
                </span>

                <img src = '/img-space.jpg' 
                     alt = 'img-space.png' 
                     style = {{ width: '100%', height: '100%' }} />
            </Link> : 
            <button className = 'boardcard bg-default' onClick = {handleAddBoard}>
                <LabelIcon type = 'subtitle' 
                           icon = {<LibraryAddOutlined sx = {{ fontSize: 24 }} />} 
                           text = 'Agregar tablero' />
            </button>
        }</>
    )
}

export default Boards