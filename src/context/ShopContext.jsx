import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'


export const ShopContext = createContext();



const ShopContextProvider = ({children}) => {

    const url = 'https://dummyjson.com/products'

    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    const getAllProducts = async () => {
        try {
            setIsLoading(true)
            setIsError("")
            const limit = 30
            const skip = (currentPage-1)*limit
            
            if(selectedCategory === "all"){
                const response = await axios.get(`${url}?limit=${limit}&skip=${skip}`);
                 console.log(response)
                if(response.status === 200) {
                    setProducts(response.data.products)
                    setTotalPages(Math.ceil((response.data.total) / limit))
                }
            } else {
                const response = await axios.get(`${url}/category/${selectedCategory}?limit=${limit}&skip=${skip}`);
                 console.log(response)
                if(response.status === 200) {
                    setProducts(response.data.products)
                    setTotalPages(Math.ceil((response.data.total) / limit))
                }
            }
            
                    
        } catch (error) {
            console.log(error);
            setIsError("Something went wrong. Please try again.")
           
            
        } finally {
            setIsLoading(false)
        }
    }


    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${url}/categories`);
            if(response.status === 200) {
                setCategories(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectedCategory = (status) => {
      setSelectedCategory(status)
      setCurrentPage(1)
    }

    useEffect(()=> {
        getAllProducts() 
    },[currentPage, selectedCategory])

    useEffect(()=> {
        getAllCategory()
    },[])

    const incrementQuantity = (id) => {
        setCartItems((prev) => {
        return prev.map((item) => (
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        ))
        })
    }

    const decrementQuantity = (id) => {
        setCartItems((prev) => {
        return prev.map((item) => (
            item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
        ))
        })
    }

    const deleteItem = (id) => {
        setCartItems((prev) => (
        prev.filter((item)  => item.id !== id)
        ))
    }

   

     const addToCart = (product, quantity) => {
        setCartItems((prev)=>{
            const existingItem = prev.find(
                (item)=> item.id === product.id
            )

            if(existingItem){
                return prev.map((item) => 
                    item.id === product.id ?
                    {...item, quantity: item.quantity + quantity} 
                    : item
                )
                
            } else {
                return [...prev, { ...product, quantity: quantity }]
            }
        }
      )
    }

    const totalItem = cartItems.reduce((total, item) => {
        return total + item.quantity
    },0)
    
  


  const value = {
    cartItems, incrementQuantity, decrementQuantity, deleteItem, addToCart, totalItem, products, categories, isLoading, isError,
    currentPage, setCurrentPage, totalPages, 
    selectedCategory, setSelectedCategory, handleSelectedCategory
  }


  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
