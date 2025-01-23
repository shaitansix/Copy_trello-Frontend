import * as Accordion from '@radix-ui/react-accordion'
import MenuItemWorkspaces from '@/components/sidebar_workspaces/menu_item_workspaces/MenuItemWorkspaces'
import './MenuWorkspaces.css'

const MenuWorkspaces = ({ workspaces }) => {
    return (
        <Accordion.Root className = 'menuworkspaces' type = 'multiple' collapsible = 'true'>
            { workspaces.map((workspace) => (
                <MenuItemWorkspaces key = {workspace.id_workspace} 
                                    workspace = {workspace} />
            )) }
        </Accordion.Root>
    )
}

export default MenuWorkspaces