import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { AssignmentOutlined } from '@mui/icons-material'
import { useWorkspace } from '@/contexts/Workspace'
import { useModal } from '@/contexts/Modal'
import RenameWorkspace from '@/components/UI/rename_workspace/RenameWorkspace'
import Boards from '@/components/UI/boards/Boards'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import ModalCustom from '@/components/UI/modal_custom/ModalCustom'
import { renameWorkspace } from '@/services/workspace.js'
import { addBoard } from '@/services/boards.js'
import { routes } from '@/routes/routes.js'
import './ContentWorkspace.css'

const ContentWorkspace = () => {
    const navigate = useNavigate()
    const { workspace } = useParams()
    const { workspaces, setWorkspaces } = useWorkspace()
    const { showModal, setShowModal } = useModal()
    const [workspaceCurrent, setWorkspaceCurrent] = useState(null)
    const [data, setData] = useState(null)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (workspaces) {
            const workspaceSelected = workspaces.find((workspaceObj) => (
                workspaceObj.name_workspace === workspace.replaceAll('_', ' ')
            ))
            
            if (workspaceSelected) setWorkspaceCurrent(workspaceSelected)
            else navigate(routes.BOARDS)
        }
    }, [workspace])

    const handleRename = async (name) => {
        const workspaceModified = await renameWorkspace(workspaceCurrent.id_workspace, name, setWorkspaces)
        if (workspaceModified) navigate(`/${workspaceModified.name_workspace.replaceAll(' ', '_')}/boards`)
        else setError(true)
    }

    const handleSave = async (name) => {
        await addBoard({ 
            name, 
            idWorkspace: data.idWorkspace
        }, data.setBoards)
        setShowModal(false)
    }

    return (
        <>
            <section className = 'contentworkspace-wrapper'>
                <div className = 'contentworkspace-container'>
                    { workspaceCurrent && <>
                        <RenameWorkspace workspaceName = {workspaceCurrent.name_workspace}
                                         edit = {edit}
                                         setEdit = {setEdit} 
                                         error = {error}
                                         setError = {setError}
                                         handleRename = {handleRename} />

                        <Boards workspace = {workspaceCurrent}
                                setData = {setData} 
                                header = {<LabelIcon type = 'subtitle' 
                                                    icon = {<AssignmentOutlined sx = {{ fontSize: 24 }} />} 
                                                    text = 'Tableros' />} />
                    </> }
                </div>
            </section>

            { showModal && 
                <ModalCustom type = 'board' handleSave = {handleSave} />
            }
        </>
    )
}

export default ContentWorkspace