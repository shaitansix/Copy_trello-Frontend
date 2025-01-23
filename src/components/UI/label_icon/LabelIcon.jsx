import './LabelIcon.css'

const LabelIcon = ({ type, icon, text }) => {
    return (
        <div className = 'labelicon-wrapper'>
            <article className = 'labelicon-container'>
                {icon}
                <span className = {`${type}-text`}>{text}</span>
            </article>
        </div>
    )
}

export default LabelIcon