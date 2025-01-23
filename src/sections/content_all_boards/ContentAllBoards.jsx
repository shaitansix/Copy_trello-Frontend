import { useState } from 'react'
import { WebStoriesOutlined } from '@mui/icons-material'
import { useWorkspace } from '@/contexts/Workspace'
import { useModal } from '@/contexts/Modal'
import ModalCustom from '@/components/UI/modal_custom/ModalCustom'
import Boards from '@/components/UI/boards/Boards'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import { addBoard } from '@/services/boards'
import './ContentAllBoards.css'

const ContentAllBoards = () => {
    const { workspaces } = useWorkspace()
    const { showModal, setShowModal } = useModal()
    const [data, setData] = useState(null)

    const handleSave = async (name) => {
        await addBoard({ 
            name, 
            idWorkspace: data.idWorkspace
        }, data.setBoards)
        setShowModal(false)
    }

    return (
        <>
            <section className = 'contentallboards-wrapper'>
                <div className = 'contentallboards-container'>
                    <span className = 'header-text'>
                        Tus espacios de trabajo
                    </span>

                    <article className = 'contentallboards-body'>
                        { workspaces.map((workspace) => (
                            <Boards key = {workspace.id_workspace} 
                                    workspace = {workspace} 
                                    setData = {setData} 
                                    header = {<LabelIcon type = 'subtitle' 
                                                        icon = {<WebStoriesOutlined sx = {{ fontSize: 24 }} />} 
                                                        text = {workspace.name_workspace} />} />
                        )) }
                    </article>
                </div>
            </section>

            { showModal && 
                <ModalCustom type = 'board' handleSave = {handleSave} />
            }
        </>
    )
}

export default ContentAllBoards