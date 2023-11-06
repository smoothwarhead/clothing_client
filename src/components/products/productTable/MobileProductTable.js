

const MobileProductTable = ({ product }) => {
  return (
    <div className='mobile-prdt-table-container'>
        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-id">Prdt ID</div>
            <div className="mobile-prdt-el mobile-prdt-el-id">{product.id}</div>

        </div>

        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-img">Prdt Image</div>
            <div className="mobile-prdt-el mobile-prdt-el-image">
                <div className="prdt-img">
                    {product.productImage}
                </div>
            </div>

        </div>

        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-name">Prdt Name</div>
            <div className="mobile-prdt-el mobile-prdt-el-name">{product.productName}</div>

        </div>

        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-desc">Description</div>
            <div className="mobile-prdt-el mobile-prdt-el-desc">{product.description}</div>

        </div>

        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-qty">Quantity</div>
            <div className="mobile-prdt-el mobile-prdt-el-qty">{product.quantity}</div>

        </div>

        <div className="mobile-prdt-table-flex-container">

            <div className="mobile-prdt-title mobile-prdt-price">Price</div>
            <div className="mobile-prdt-el mobile-prdt-el-price">{product.price}</div>

        </div>

        
    </div>
  )
}

export default MobileProductTable;