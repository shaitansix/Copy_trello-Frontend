import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import HeaderMenuBoards from '@/components/sidebar_boards/header_menu_boards/HeaderMenuBoards'
import MenuItemBoards from '@/components/sidebar_boards/menu_item_boards/MenuItemBoards'
import { getBoardsByWorkspace } from '@/services/boards.js'
import { routes } from '@/routes/routes.js'
import './MenuBoards.css'

const MenuBoards = ({ workspace, setData, setAddBoard }) => {
    const navigate = useNavigate()
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        const getBoards = async () => {
            const boardsData = await getBoardsByWorkspace(workspace.id_workspace)
            if (boardsData.length > 0) setBoards(boardsData)
            else navigate(routes.BOARDS)
        }

        getBoards()
    }, [workspace])

    const handleAddBoard = () => {
        setData({ 
            idWorkspace: workspace.id_workspace, 
            setBoards
        })
        setAddBoard(true)
    }

    return (
        <article className = 'menuboards-wrapper'>
            <div className = 'menuboards-container'>
                <HeaderMenuBoards handleAddBoard = {handleAddBoard} />
                <article className = 'menuboards-body'>
                    { boards?.map((board) => <MenuItemBoards key = {board.id_board} board = {board} />) }
                </article>
            </div>
        </article>
    )
}

export default MenuBoards