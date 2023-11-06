import React, { useContext } from 'react'
import { MdError } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { DataContext } from '../../context/DataContext';










const ConfirmationPage = (props) => {

    const { message, setModalOpen } = useContext(DataContext);

    const { handleOk, doubleBtn } = props;

  return (
    <div className='confirmation-page'>
        <div className="con-icon">
            {
                message.type === "error" ? 
                <MdError className='con-icons con-error-icon' />
                :
                <IoMdCheckmarkCircle className='con-icons con-success-icon' />
            }

        </div>

        <div className={`con-body ${message.type === "error" ? "err-msg" : "success-msg"}`}>
            {/* An admin is successfully created. A confirmation email has been sent to their email address */}
            { message.body }
        </div>
        {
            doubleBtn ? 
            <div className="con-btn-flex">

                <div className='con-btns con-error-btn' onClick={() => setModalOpen(false)}>Back</div>

                <div className='con-btns con-success-btn'
                    onClick={handleOk}
                >
                    Ok
                </div>

            </div>


            :

            <div className="con-btn">
                {
                    message.type === "error"  ? 
                    <div className='con-btns con-error-btn' onClick={() => setModalOpen(false)}>Back</div>
                    :
                    <div className='con-btns con-success-btn'
                        onClick={handleOk}
                    >
                        Ok
                    </div>

                }
            </div>
        }

    </div>
  )
}

export default ConfirmationPage;