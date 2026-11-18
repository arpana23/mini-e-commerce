import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Quantity from "../components/Quantity"

const Product = () => {

    const {productId} = useParams();

    const [quantity, setQuantity] = useState(1)
    

    const { isLoading, products, addToCart, isError } = useContext(ShopContext)

    const product = products.find(
      (item) => item.id === Number(productId)
    )

  if (isError) {
    return <h2 style={{textAlign:"center", color: "red"}}>{isError}</h2>
  }

  if (isLoading)  {
    return <h2 style={{textAlign:"center"}}>Loading...</h2>
  }
 
  if (!product) {
    return <h2 style={{textAlign:"center", color: "red"}}>Product not found</h2>;
  } else {
    return (
      <div className="singleProductMain">
          <div className="singleProductInner">
            <img className="singleProductImage" src={product.images[0]} alt={product.title} />
            <div className="singleProductDesc">
              <b>{product.title}</b>
              <div className="ratings">
                <span>{product.rating}</span><span> ({product.reviews?.length} Reviews)</span>
              </div>
              <b>${product.price}</b>
              <p>{product.description}</p>
            <div className="quantityCart">
              <Quantity quantity={quantity} onIncrement={() => setQuantity(prev => prev + 1)} onDecrement={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)} />
              <button className="addToCartBtn" onClick={()=>addToCart(product,quantity)}>Add to Cart</button>
            </div>
            <hr />
            <div className="productExtraDetail">
              <p>Size: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</p>
              <p>warranty: {product.warrantyInformation}</p>
              <p>Availability Status: {product.availabilityStatus}</p>
            </div>
          </div>
        </div>
      </div>
  )}
}

export default Product
