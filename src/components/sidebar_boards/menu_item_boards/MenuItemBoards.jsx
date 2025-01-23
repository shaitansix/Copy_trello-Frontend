import { NavLink, useParams } from 'react-router'
import './MenuItemBoards.css'

const MenuItemBoards = ({ board }) => {
    const { workspace } = useParams()

    return (
        <NavLink className = {({ isActive }) => isActive ? 'menuitemboard menuitemboard-active' : 'menuitemboard menuitemboard-default'} 
                 to = {`/${workspace?.replaceAll(' ', '_')}/${board.name_board.replaceAll(' ', '_')}`} >
            <span>
                <img src = '/img-space.jpg' alt = 'img-space.png' style = {{ width: '100%', height: '100%' }} />
            </span>
            <span className = 'paragraph-text'>
                {board.name_board}
            </span>
        </NavLink>
    )
}

export default MenuItemBoards