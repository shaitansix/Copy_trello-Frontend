import './InputCheck.css'

const InputCheck = ({ checkValue, setCheckValue }) => {
    return(
        <div className = 'inputcheck'>
            <input type = 'checkbox' 
                   defaultChecked = {checkValue} 
                   onChange = {() => setCheckValue(!checkValue)} />
            <div className = {`${checkValue ? 'inputcheck-marked' : 'inputcheck-unmarked'}`} />
        </div>
    )
}

export default InputCheck