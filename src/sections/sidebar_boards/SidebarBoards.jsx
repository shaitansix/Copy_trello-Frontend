import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import RenameWorkspace from '@/components/UI/rename_workspace/RenameWorkspace'
import MenuBoards from '@/components/sidebar_boards/menu_boards/MenuBoards'
import FormAdd from '@/components/UI/form_add/FormAdd'
import { renameWorkspace } from '@/services/workspace.js'
import { addBoard } from '@/services/boards.js'
import './SidebarBoards.css'

const SidebarBoards = ({ workspace, setWorkspaces }) => {
    const navigate = useNavigate()
    const { board } = useParams()
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const [createBoard, setCreateBoard] = useState(false)
    const [data, setData] = useState(null)

    const handleRename = async (name) => {
        const workspaceModified = await renameWorkspace(workspace.id_workspace, name, setWorkspaces)
        if (workspaceModified) navigate(`/${workspaceModified.name_workspace.replaceAll(' ', '_')}/${board}`)
        else setError(true)
    }

    const handleSave = async (name) => { 
        await addBoard({
            name, 
            idWorkspace: data.idWorkspace
        }, data.setBoards)
        setCreateBoard(false)
    }

    return (
        <section className = 'sidebarboards-wrapper'>
            <div className = 'sidebarboards-container'>
                <article className = 'sidebarboards-header'>
                    <RenameWorkspace workspaceName = {workspace.name_workspace} 
                                     edit = {edit} 
                                     setEdit = {setEdit} 
                                     error = {error} 
                                     setError = {setError} 
                                     handleRename = {handleRename} />
                </article>

                <article className = 'sidebarboards-body'>
                    <MenuBoards workspace = {workspace} 
                                setData = {setData} 
                                setAddBoard = {setCreateBoard} />
                </article>

                { createBoard && 
                    <article className = 'sidebarboards-footer'>
                        <FormAdd className = 'sidebarboards-btn-close'
                                 type = 'board' 
                                 handleSave = {handleSave} 
                                 handleClose = {() => setCreateBoard(false)} />
                    </article>
                }
            </div>
        </section>
    )
}

export default SidebarBoards