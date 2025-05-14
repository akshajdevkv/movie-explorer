import React from 'react'

const Search = (props) => {
  return (
    <div className='search'>
        <div>
             <img src='./search.svg'/>
        <input type="text" 
        placeholder='Search through thousands of movies'
        value={props.searchTerm}
      
       
        />
        </div>
    </div>
  )
}

export default Search