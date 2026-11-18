import React from 'react'

const CategoryFilter = ({category, catType, handleFilter}) => {
  return (
    <button className="categoryBtn" onClick={()=>handleFilter(catType)}>{category}</button>
  )
}

export default CategoryFilter
