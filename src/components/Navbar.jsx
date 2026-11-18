import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext"

const Navbar = () => {

  const { totalItem } = useContext(ShopContext);

  return (
    <div className="navbar">
      <Link to="/" style={{textDecoration:"none"}}>
        <b>E-Commerce Store</b>
      </Link>
      <div>
        <Link to="/cart">
          <span className="shoppingCart"><FaShoppingCart /></span>
        </Link>
        <span className="navCartTotal">{totalItem}</span>
        <span className="user"><FaUser /></span>
      </div>
    </div>
  )
}

export default Navbar
