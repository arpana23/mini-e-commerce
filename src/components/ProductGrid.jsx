import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'

const ProductGrid = ({product}) => {

  const {addToCart} = useContext(ShopContext)

  return (
    <div className="productGridInner">
        <Link className="productLink" to={`/product/${product.id}`}>
            <div className="thumbnail">
                    <img src={product.thumbnail} alt="title" />
            </div>
        
            <div className="title">
                    <p>{product.title}</p>
                    <p>${product.price}</p>
            </div>
        </Link>
        
      <button className="addToCartBtn" onClick={() => addToCart(product,1)}>Add to Cart</button>
    </div>
  )
}

export default ProductGrid
