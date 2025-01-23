import { AddOutlined } from '@mui/icons-material'
import './BtnAdd.css'

const BtnAdd = ({ text, onClick }) => {
    return (
        <button className = 'btnadd' onClick = {onClick}>
            <AddOutlined sx = {{ fontSize: 24 }} />
            <span className = 'subtitle-text'>{text}</span>
        </button>
    )
}

export default BtnAdd