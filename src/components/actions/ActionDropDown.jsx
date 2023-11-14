import { useContext } from 'react'
import './action-dropdown.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import Modal from '../modals/Modal'
import useApi from '../../hooks/useApi'
import ConfirmationPage from '../modals/ConfirmationPage'






const ActionDropDown = ({ product }) => {

    const {isDeleted, setIsDeleted, deleteMode, setModalOpen, message, setMessage, setDeleteMode } = useContext(DataContext);

    const { deleteProduct } = useApi();

    const navigate = useNavigate();

    const handleEdit = () => {
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

    const handleDeleteOk = () => {
        
        return <Navigate to={`/admin/products`} />
               

    }

    const handleCloseDeleteModal = () => {
        setModalOpen(false);
        setDeleteMode(false);
        setIsDeleted(false);
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
        { isDeleted &&
            <Modal                     
                modalBody={ <ConfirmationPage handleOk={handleDeleteOk} doubleBtn={false} /> }
                modalType={message.type}
                closeModal={handleCloseDeleteModal}
                
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