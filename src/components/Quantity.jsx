import React from 'react'

const Quantity = ({quantity, onIncrement, onDecrement}) => {


   
  return (
    <div className="quantityWrapper">
      <span onClick={onDecrement} className="qDecrement">-</span><span className="qNumber">{quantity}</span><span onClick={onIncrement} className="qIncrement">+</span>
    </div>
  )
}

export default Quantity
