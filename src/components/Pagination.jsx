import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'

 
const Pagination = () => {

  const {currentPage, setCurrentPage, totalPages} = useContext(ShopContext)

  const handlePrev = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(currentPage)
    }
  }

  const handleNext = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(currentPage)
    }
  }

  const indexedArrayPages = Array.from({ length: totalPages });

  

  return (
    <div className="paginationInner">
        <button className="prev" onClick={handlePrev}>Prev</button>
        {
          indexedArrayPages.map((_, index) => {
            return <button key={index} value={index + 1} onClick={(e)=>setCurrentPage(Number(e.target.value))} className="pageCircle">{index + 1}</button>
          })
        }
        <button className="next" onClick={handleNext}>Next</button>
    </div>
  )
}

export default Pagination
