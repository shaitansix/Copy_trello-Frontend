import { Link } from 'react-router'
import { SpaceDashboardOutlined } from '@mui/icons-material'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import { routes } from '@/routes/routes.js'
import './Header.css'

const Header = () => {
    return (
        <section className = 'header-wrapper'>
            <div className = 'header-container'>
                <Link className = 'header-link' to = {routes.HOME}>
                    <LabelIcon type = 'header' 
                               icon = {<SpaceDashboardOutlined sx = {{ fontSize: 32 }} />}
                               text = 'Mi Trello' />
                </Link>
            </div>
        </section>
    )
}

export default Header