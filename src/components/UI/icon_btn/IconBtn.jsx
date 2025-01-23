import './IconBtn.css'

const IconBtn = ({ className = '', icon, handleClick, dimensions }) => {
    return (
        <button className = {`iconbtn ${className}`} 
                style = {{ minWidth: dimensions, minHeight: dimensions, maxWidth: dimensions, maxHeight: dimensions }}
                onClick = {handleClick}>
            {icon}
        </button>
    )
}

export default IconBtn