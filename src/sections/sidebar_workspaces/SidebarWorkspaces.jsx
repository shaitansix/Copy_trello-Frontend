import { useState } from 'react'
import { AssignmentOutlined } from '@mui/icons-material'
import { NavLink } from 'react-router'
import { useWorkspace } from '@/contexts/Workspace'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import MenuWorkspaces from '@/components/sidebar_workspaces/menu_workspaces/MenuWorkspaces'
import BtnAdd from '@/components/UI/btn_add/BtnAdd'
import FormAdd from '@/components/UI/form_add/FormAdd'
import { addWorkspace } from '@/services/workspace.js'
import { routes } from '@/routes/routes.js'
import './SidebarWorkspaces.css'

const styles = {
    linkActive: 'menubtn-link menubtn-link-active', 
    linkDeactive: 'menubtn-link menubtn-link-deactive'
}

const SidebarWorkspaces = () => {
    const { workspaces, setWorkspaces } = useWorkspace()
    const [createWorkspace, setCreateWorkspace] = useState(false)

    const handleCreate = async (name) => {
        await addWorkspace({ name }, setWorkspaces)
        setCreateWorkspace(false)
    }

    return (
        <section className = 'sidebarworkspaces-wrapper'>
            <div className = 'sidebarworkspaces-container'>
                <article className = 'sidebarworkspaces-header'>
                    <NavLink className = {({ isActive }) => isActive ? styles.linkActive : styles.linkDeactive}
                             to = {routes.BOARDS}>
                        <LabelIcon type = 'subtitle' 
                                   icon = {<AssignmentOutlined sx = {{ fontSize: 24 }} />} 
                                   text = 'Tableros' />
                    </NavLink>
                </article>

                <article className = 'sidebarworkspaces-body'>
                    <MenuWorkspaces workspaces = {workspaces} />
                </article>

                <article className = 'sidebarworkspaces-footer'>
                    { createWorkspace ?  
                        <FormAdd type = 'workspace' 
                                 handleSave = {handleCreate} 
                                 handleClose = {() => setCreateWorkspace(false)} /> : 
                        <BtnAdd text = 'Agregar espacio de trabajo' 
                                onClick = {() => setCreateWorkspace(true)} />
                    }
                </article>
            </div>
        </section>
    )
}

export default SidebarWorkspaces