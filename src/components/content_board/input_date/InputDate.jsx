import { CalendarTodayOutlined } from '@mui/icons-material'
import DatePicker from 'react-datepicker'
import StateTask from '@/components/content_board/state_task/StateTask'
import 'react-datepicker/dist/react-datepicker.css'
import './InputDate.css'

const InputDate = ({ completedValue, setCompletedValue, dateValue, setDateValue }) => {
    return (
        <span className = 'inputdate-infodate'>
            <DatePicker className = 'inputdate-field small_paragraph-text' selected = {dateValue} onChange = {(date) => setDateValue(date)} />
            <StateTask completed = {completedValue} 
                       setCompleted = {setCompletedValue} 
                       date = {dateValue} />
            <CalendarTodayOutlined sx = {{ fontSize: 16 }} />
        </span>
    )
}

export default InputDate