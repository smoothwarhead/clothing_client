import { useNavigate } from 'react-router-dom';
import '../../../styles/adminStyles/oneOrderRecord.css';

const OneOrderRecord = ({item}) => {

    const navigate = useNavigate();

    const makeStatusText = (el) => {

        if(el.isShipped){
            return "Shipped"
        }
        if(el.isDelivered){
            return "Delivered"
        }
        if(el.isCanceled){
            return "Canceled"
        }
        if(el.isNewOrder){
            return "New Order"
        }
    }

    const makeStatusStyle = (el) => {

        if(el.isShipped){
            return "order-title-status-1 shipped"
        }
        if(el.isDelivered){
            return "order-title-status-1 delivered"
        }
        if(el.isCanceled){
            return "order-title-status-1 canceled"
        }
        if(el.isNewOrder){
            return "order-title-status-1 newOrder"
        }
    }


    const navigateToOrderDetails = () => {
        navigate("/business/admin/orders/order-details", {replace:false});
    }



  return (
    <div className="order-content-elements" onClick={navigateToOrderDetails}>

        <div className="order-elements order-title-id">{item.id}</div>
        <div className="order-elements order-title-name">{item.customerName}</div>
        <div className="order-elements order-title-product">{item.product}</div>
        <div className="order-elements order-title-qty">{item.quantity}</div>
        <div className="order-elements order-title-amt">{item.amount}</div>
        <div className="order-elements order-title-loc">{item.location}</div>
        <div className="order-elements order-stat order-title-status">
            <div className={makeStatusStyle(item)}>
                {makeStatusText(item)}
            </div>            
        </div>
        <div className="order-elements order-title-date">{item.date}</div>

    </div>
  )
}

export default OneOrderRecord;