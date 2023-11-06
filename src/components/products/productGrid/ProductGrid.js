import ProductCard from '../productCards/ProductCard'
import './productGrid.css';



const ProductGrid = ({ products }) => {
  return (
    <div className="admin-products-container">
        {
            products.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))
        }
    </div>
  )
}

export default ProductGrid