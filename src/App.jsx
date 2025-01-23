import { Routes, Route } from 'react-router'
import Header from '@/components/UI/header/Header'
import WorkspacesLayout from '@/layouts/workspaces_layout/WorkspacesLayout'
import AboutProject from '@/sections/about_project/AboutProject'
import ContentAllBoards from '@/sections/content_all_boards/ContentAllBoards'
import ContentWorkspace from '@/sections/content_workspace/ContentWorkspace'
import BoardLayout from '@/layouts/board_layout/BoardLayout'
import NotFound from '@/layouts/not_found/NotFound'
import { routes } from '@/routes/routes.js'
import './App.css'

function App() {
  return (
    <main className = 'app'>
      <Header />
      <Routes>
        <Route path = {routes.HOME} element = {<WorkspacesLayout />}>
          <Route path = '/' element = {<AboutProject />} />
          <Route path = {routes.BOARDS} element = {<ContentAllBoards />} />
          <Route path = {routes.WORKSPACE} element = {<ContentWorkspace />} />
        </Route>

        <Route path = {routes.BOARD} element = {<BoardLayout />} />

        <Route path = '*' element = {<NotFound />} />
      </Routes>
    </main>
  )
}

export default App