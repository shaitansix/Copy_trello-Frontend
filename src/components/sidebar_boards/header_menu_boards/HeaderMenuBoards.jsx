import { AssignmentOutlined, AddOutlined } from '@mui/icons-material'
import LabelIcon from '@/components/UI/label_icon/LabelIcon'
import IconBtn from '@/components/UI/icon_btn/IconBtn'
import './HeaderMenuBoards.css'

const HeaderMenuBoards = ({ handleAddBoard }) => {
    return (
        <article className = 'headermenuboards-wrapper'>
            <div className = 'headermenuboards-container'>
                <LabelIcon type = 'subtitle' 
                           icon = {<AssignmentOutlined sx = {{ fontSize: 24 }} />} 
                           text = 'Tableros' />
                <IconBtn className = 'headermenuboards-btn' 
                         icon = {<AddOutlined sx = {{ fontSize: 24 }} />}
                         handleClick = {handleAddBoard}
                         dimensions = '24px' />
            </div>
        </article>
    )
}

export default HeaderMenuBoards