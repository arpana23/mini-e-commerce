import React from 'react'
import Quantity from '../components/Quantity'
import { MdDelete } from "react-icons/md";

const CartItem = ({item, onIncrement, onDecrement, onDelete}) => {

  const discountedPrice = (item.price - (item.price * item.discountPercentage) / 100);
  const subTotal = discountedPrice * item.quantity

  return (
    <div className="cartItemInner">
      <div className="cartItemImgWrapper">
        <img className="cartItemImage" src={item.thumbnail} alt={item.title} />
      </div>
      <div className="cartItemDetails">
        <div><b>{item.title}</b></div>
        <div>Price: ${item.price}</div>
        <div><Quantity quantity={item.quantity} onIncrement={()=>onIncrement(item.id)} onDecrement={()=>onDecrement(item.id)} /></div>
      </div>
      <div className="cartDiscountPercentage">
        <b>Discount</b>
        <p>{item.discountPercentage}% </p>
      </div>
      <div className="cartFinalPrice">
        <b>Unit Price: ${discountedPrice.toFixed(2)}</b>
        <p className="deleteBtn" onClick={()=>onDelete(item.id)}><MdDelete /></p>
        <b>Sub Total: ${subTotal.toFixed(2)}</b>
      </div>
    </div>
  )
}

export default CartItem
