import { useModal } from '@/contexts/Modal'
import FormAdd  from '@/components/UI/form_add/FormAdd'
import './ModalCustom.css'

const ModalCustom = ({ type, handleSave }) => {
    const { setShowModal } = useModal()

    return (
        <div className = 'modalcustom-wrapper'>
            <article className = 'modalcustom-container'>
                <FormAdd className = 'modalcustom-btn-close'
                         type = {type}
                         handleSave = {handleSave}
                         handleClose = {() => setShowModal(false)} />
            </article>
        </div>
    )
}

export default ModalCustom