import React,{ useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {

  const { cartItems, incrementQuantity, decrementQuantity, deleteItem, totalItem } = useContext(ShopContext)


  const totalAmount = cartItems.reduce((total, item) => {
      const discountedPrice = (item.price - (item.price * item.discountPercentage) / 100)
      return total + (discountedPrice * item.quantity)
  },0)
  
    
  
  return (
      <div className="cartItemWrapper">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item)=>(
              <CartItem key={item.id} item={item} onIncrement={incrementQuantity} onDecrement={decrementQuantity} onDelete={deleteItem} />
            ))}
          

            <div className="totalAmountWrapper">
              <div className="totalAmountInner">
                <h2>Order Summary</h2>
                <p>Total Item: {totalItem}</p>
                <span>Total Amount</span><span className="totalAmount">${totalAmount.toFixed(2)}</span>
                <button className="checkoutBtn">Checkout</button>
              </div>
              
            </div>
          </> ) : (<>
                      <h2 className="emptyCart">Cart is empty</h2>
                      <Link to="/" className="continueBtn">
                        Continue Shopping
                      </Link>
                    </>
                  )
          }      
        </div>
        
  )
}

export default Cart
