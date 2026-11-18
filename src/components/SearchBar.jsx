import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = ({search, setSearch}) => {
  return (
    <div className="searchWrapper">
      <input className="search" value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search" />
      <button className="searchBtn"><CiSearch /></button>
    </div>
  )
}

export default SearchBar
