
import OneProductRecord from '../productRecord/OneProductRecord';
import './productTable.css';



const ProductTable = ({ products }) => {
  return (
    <div className="products-container">
        <div className="product-titles">

            <div className="product-title-elements product-title-id">prdt ID</div>
            <div className="product-title-elements product-title-image">Prdt Image</div>
            <div className="product-title-elements product-title-name">Prdt Name</div>
            <div className="product-title-elements product-title-desc">Description</div>
            <div className="product-title-elements product-title-qty">Qty</div>
            <div className="product-title-elements product-title-price">Price</div>
            <div className="product-title-elements product-title-action">Actions</div>

        </div>

        <div className="product-content">
            {
                products.map((product, index) => (
                    <OneProductRecord product={product} key={index} />
                ))
            }
        </div>

    </div>
  )
}

export default ProductTable