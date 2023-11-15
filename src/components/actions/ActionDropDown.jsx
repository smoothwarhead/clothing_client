import { useContext } from 'react'
import './action-dropdown.css'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import Modal from '../modals/Modal'
import useApi from '../../hooks/useApi'
import ConfirmationPage from '../modals/ConfirmationPage'






const ActionDropDown = ({ product }) => {

    const {setEditMode, deleteMode, setModalOpen, message, setMessage, setDeleteMode } = useContext(DataContext);

    const { deleteProduct } = useApi();

    const navigate = useNavigate();

    const handleEdit = () => {
        setEditMode(true);
        navigate(`/admin/products/edit-product/${product.ProductId}`);

    }

    const handleDelete = () => {
        const msg = "Are you sure you want to delete this product?"
        setMessage({...message, body: msg, type: "error" });
        setDeleteMode(true);
       
    }

    const handleOk = () => {
        
        deleteProduct(product.ProductId);
       

    }


    const handleCloseModal = () => {
        setModalOpen(false);
        setDeleteMode(false);
    }




  return (
    <>

        
        { deleteMode &&
            <Modal                     
                modalBody={ <ConfirmationPage handleOk={handleOk} doubleBtn={true} /> }
                modalType={message.type}
                closeModal={handleCloseModal}
                
            />
        }
   

        <div className="action-d-con">

            <div className="action-links" onClick={handleEdit}>Edit</div>

            <div className="action-links" onClick={handleDelete}>Delete</div>

        </div>
    
    </>
  )

}

export default ActionDropDown;