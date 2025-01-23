import { Outlet } from 'react-router'
import { WorkspaceProvider } from '@/contexts/Workspace'
import SidebarWorkspaces from '@/sections/sidebar_workspaces/SidebarWorkspaces'
import './WorkspacesLayout.css'

const WorkspacesLayout = () => {
    return (
        <WorkspaceProvider>
            <section className = 'workspaceslayout-wrapper'>
                <div className = 'workspaceslayout-container'>
                    <SidebarWorkspaces />

                    <article className = 'workspaceslayout-content'>
                        <Outlet />
                    </article>
                </div>
            </section>
        </WorkspaceProvider>
    )
}

export default WorkspacesLayout