import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import SidebarBoards from '@/sections/sidebar_boards/SidebarBoards'
import ContentBoard from '@/sections/content_board/ContentBoard'
import { listWorkspaces } from '@/services/workspace.js'
import { getBoardsByWorkspace } from '@/services/boards.js'
import { routes } from '@/routes/routes.js'
import './BoardLayout.css'

const BoardLayout = () => {
    const navigate = useNavigate()
    const { workspace, board } = useParams()
    const [workspaces, setWorkspaces] = useState(null)
    const [workspaceCurrent, setWorkspaceCurrent] = useState(null)
    const [boards, setBoards] = useState(null)
    const [boardCurrent, setBoardCurrent] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const workspacesData = await listWorkspaces()
            setWorkspaces(workspacesData)

            const workspaceFound = workspacesData.find((workspaceObj) => (
                workspaceObj.name_workspace === workspace?.replaceAll('_', ' ')
            ))

            if (workspaceFound) {
                setWorkspaceCurrent(workspaceFound)
                const boardsData = await getBoardsByWorkspace(workspaceFound.id_workspace)
                
                setBoards(boardsData)
                const boardFound = boardsData.find((boardObj) => boardObj.name_board === board?.replaceAll('_', ' '))
                
                if (boardFound) { 
                    setBoardCurrent(boardFound)
                } else { 
                    navigate(routes.BOARDS)
                }
            } else {
                navigate(routes.BOARDS)
            }
        }

        getData()
    }, [workspace, board])

    return (
        <section className = 'boardlayout-wrapper'>
            <div className = 'boardlayout-container'>
                { workspaces && workspaceCurrent && boards && boardCurrent && <>
                    <SidebarBoards workspace = {workspaceCurrent} setWorkspaces = {setWorkspaces} />

                    <article className = 'boardlayout-content'>
                        <ContentBoard workspace = {workspaceCurrent} 
                                      board = {boardCurrent} 
                                      setBoards = {setBoards} />
                    </article>
                </> }
            </div>
        </section>
    )
}

export default BoardLayout