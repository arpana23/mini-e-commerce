import React, { useState, useMemo, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'

const Home = () => {

  const {isLoading, products, categories, isError, selectedCategory, setSelectedCategory, handleSelectedCategory} = useContext(ShopContext);
  
  const [search, setSearch] = useState("")
  const [sortPrice, setSortPrice] = useState("low")
  



     
     const memoCalculation = useMemo(()=> {

        const filteredProducts = products.filter((product)=>(selectedCategory === "all" || product.category === selectedCategory) && (search === "" || product.title.toLowerCase().includes(search.toLowerCase())))

        const sortedProducts = sortPrice === "low"? filteredProducts.sort((a,b) => (a.price - (a.price * a.discountPercentage / 100))-(b.price - (b.price * b.discountPercentage / 100))) :
        filteredProducts.sort((a,b) => (b.price - (b.price * b.discountPercentage / 100)) - (a.price - (a.price * a.discountPercentage / 100)))

        return sortedProducts

      },[products, search, selectedCategory, sortPrice])
    

 

    // const selectedCategories = categories.slice(0, 4);



  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="hero"></div>
      <div className="heading">
          <p>Shop by <span className="headingText">Categories</span></p>
      </div>

      <div className="categoryWrapper">
        <button className="categoryBtn" onClick={()=>handleSelectedCategory("all")}>All Products</button>
        { 
          categories.map((category) => (
              <CategoryFilter key={category.slug} category={category.name} catType={category.slug} handleFilter={handleSelectedCategory} />
          ))
        }
      </div>

      <div className="heading">
          <p>Sort By  <span className="headingText">Price</span></p>
      </div>
      
      { isError ? "" : (
        <select value = {sortPrice} onChange={(e)=>setSortPrice(e.target.value)} className="sortPriceWrapper">
          <option value="low">Low To High</option>
          <option value="high">High To Low</option>
        </select>
      )}
      

      <div className="heading">
          <p>Discover Our  <span className="headingText">Products</span></p>
      </div>

        
        { isError ? <h2 style={{textAlign:"center", color: "red"}}>{isError}</h2> : ( 
          isLoading === true ? <h2 style={{textAlign:"center"}}>Loading...</h2> : (
            <div className="productGridWrapper">
              {
                memoCalculation.map((product)=>(
                  <ProductGrid key={product.id} product={product} />
                ))
              }
            </div>
          ))
        
        }

        <div className="paginationWrapper">
          <Pagination />
        </div>
      
    </>

  )
}

export default Home
