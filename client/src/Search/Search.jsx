
import "./search.css"
import React from "react"
import  { useState } from 'react';

function Search(props){
    const [searchItem, setSearchItem] = useState('');

function changeHandler(e){
    setSearchItem(e.target.value) ;
}


function done(e){
    e.preventDefault();
    props.onSearch(searchItem)
    setSearchItem('')
}

    return(
        <form className="search">
            <label>
            <input type="text" value={searchItem} onChange={changeHandler}/>
            <button onClick={done}>Search</button><div>{props.result}</div>
            </label>
        </form>
    )
}

export default Search