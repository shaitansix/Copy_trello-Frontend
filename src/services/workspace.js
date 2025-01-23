const baseUrl = 'https://copy-trello-backend.vercel.app/my_trello'
const listWorkspacesUrl = `${baseUrl}/workspaces`
const modWorkspaceUrl = `${baseUrl}/workspace`

export const listWorkspaces = async () => {
    const res = await fetch(listWorkspacesUrl, { method: 'GET' })
    const resData = await res.json()
    return resData.data || []
}

export const addWorkspace  = async (data, setWorkspaces) => {
    const res = await fetch(modWorkspaceUrl, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setWorkspaces(await listWorkspaces())
    }
}

export const renameWorkspace = async (idWorkspace, workspaceName, setWorkspaces) => {
    const res = await fetch(`${modWorkspaceUrl}/${idWorkspace}`, {
        method: 'PUT', 
        body: JSON.stringify({ name: workspaceName }), 
        headers: { 'Content-Type': 'application/json' }
    })

    const resData = await res.json()
    if (resData.state === 'Success') {
        setWorkspaces(await listWorkspaces())
    }
    return resData.data
}

export const delWorkspace = async (idWorkspace, setWorkspaces) => {
    const res = await fetch(`${modWorkspaceUrl}/${idWorkspace}`, { method: 'DELETE' })
    const resData = await res.json()

    if (resData.state === 'Success') {
        setWorkspaces(await listWorkspaces())
    }
    return resData.data
}