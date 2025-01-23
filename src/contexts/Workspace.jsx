import { createContext, useState, useEffect, useContext } from 'react'
import { listWorkspaces } from '@/services/workspace.js'

const WorkspaceContext = createContext()

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState(null)

    useEffect(() => {
        const getData = async () => {
            setWorkspaces(await listWorkspaces())
        }

        getData()
    }, [])

    return (
        <>{ workspaces && 
            <WorkspaceContext.Provider value = {{ workspaces, setWorkspaces }}>
                {children}
            </WorkspaceContext.Provider>
        }</>
    )
}

export const useWorkspace = () => useContext(WorkspaceContext)