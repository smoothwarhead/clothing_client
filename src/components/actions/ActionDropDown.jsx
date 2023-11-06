import { useContext } from 'react'
import './action-dropdown.css'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'






const ActionDropDown = ({ product }) => {

    const { message, setMessage, setDeleteMode } = useContext(DataContext);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/products/edit-product/${product.ProductId}`);

    }

    const handleDelete = () => {
        const msg = "Are you sure you want to delete this product?"
        setMessage({...message, body: msg, type: "error" });
        setDeleteMode(true);
    }

  return (
    <>
        <div className="action-d-con">

            <div className="action-links" onClick={handleEdit}>Edit</div>

            <div className="action-links" onClick={handleDelete}>Delete</div>

        </div>
    
    </>
  )
}

export default ActionDropDown;