import * as Accordion from '@radix-ui/react-accordion'
import { NavLink, useParams, useNavigate } from 'react-router'
import { WebStoriesOutlined, AssignmentOutlined, KeyboardArrowDownOutlined, DeleteOutlineOutlined } from '@mui/icons-material'
import { useWorkspace } from '@/contexts/Workspace'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import { delWorkspace } from '@/services/workspace.js'
import { routes } from '@/routes/routes.js'
import './MenuItemWorkspaces.css'

const styles = {
    linkActive: 'menubtn-link menubtn-link-active', 
    linkDeactive: 'menubtn-link menubtn-link-deactive'
}

const MenuItemWorkspaces = ({ workspace }) => {
    return (
        <Accordion.Item className = 'menuitemworkspaces' value = {workspace.id_workspace} >
            <Accordion.Header>
                <Accordion.Trigger className = 'menuitemworkspaces-trigger'>
                    <article className = 'menuitemworkspaces-trigger-content'>
                        <LabelIcon type = 'subtitle' 
                                icon = {<WebStoriesOutlined sx = {{ fontSize: 24 }} />}  
                                text = {workspace.name_workspace} />
                        <KeyboardArrowDownOutlined className = 'menuitemworkspaces-trigger-icon' sx = {{ fontSize: 20 }} />
                    </article>
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className = 'menuitemworkspaces-content'>
                <NavLink className = {({ isActive }) => isActive ? styles.linkActive : styles.linkDeactive} 
                         to = {`/${workspace.name_workspace.replaceAll(' ', '_')}/boards`}>
                    <LabelIcon type = 'subtitle' 
                               icon = {<AssignmentOutlined sx = {{ fontSize: 24 }} />} 
                               text = 'Tableros' />
                </NavLink>

                <MenuBtn idWorkspace = {workspace.id_workspace} />
            </Accordion.Content>
        </Accordion.Item>
    )
}

const MenuBtn = ({ idWorkspace }) => {
    const navigate = useNavigate()
    const { workspace } = useParams()
    const { setWorkspaces } = useWorkspace()

    const handleDelete = async () => {
        const workspaceDrop = await delWorkspace(idWorkspace, setWorkspaces)
        if (workspaceDrop?.name_workspace === workspace?.replaceAll('_', ' ')) {
            navigate(routes.BOARDS)
        }
    }

    return (
        <button className = 'menubtn-btn' onClick = {handleDelete}>
            <LabelIcon type = 'subtitle' 
                       icon = {<DeleteOutlineOutlined sx = {{ fontSize: 24 }} />} 
                       text = 'Eliminar' />
        </button>
    )
}

export default MenuItemWorkspaces