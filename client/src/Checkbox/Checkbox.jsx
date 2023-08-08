import React from "react"
import "./checkbox.css"
import {useState} from "react"
import { useEffect } from "react"



var rating =[]
var genres = []
var didMount = false

function Checkbox(props){
 
  
    const [filter , setFilter] = useState({
        " imdb.rating" :[],
         genres:[]
    })

    
   

    function changeRating(e){
      
        if(filter['imdb.rating']===undefined)
        rating=[]
        
        if(e.target.checked){
            // rating.push(parseInt(e.target.value))
            var all = e.target.value.split(",")
            all = all.map(item => parseFloat(item))
           rating =   [...rating,...all]
          makeObject();
        }
        else{
            var alll = e.target.value.split(",")
            alll = alll.map(item => parseFloat(item))
            rating = rating.filter(item => !alll.includes(item))
            makeObject();
        }

    }
  
    function changeHandler(e){
        
        

        if(filter.genres.length === 0)
        genres = [];

        if(e.target.checked){
            genres.push(e.target.value)
            makeObject();
         }
         else{
            genres = genres.filter(item => item !== e.target.value)
            makeObject();
         }
      if(filter['imdb.rating']===undefined)
        rating=[]
        
    }

   function makeObject(){
   
    didMount = true;
    setFilter({"imdb.rating":{ "$in" : rating}, genres: { "$in" : genres}})
    }
   
   useEffect(()=>{
    if(didMount){
        console.log('hello')
        props.onfilter(filter)
    }
   },[filter])
   

    return(
        <>
        <div className="entire">
        <div className="rating">
        <h5>Rating</h5>
        <label>
        <input type="checkbox" value="5,5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9" onChange={changeRating} />  5
        </label>
        <label>
        <input type="checkbox" value="6,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9" onChange={changeRating} />  6
        </label>
        <label>
        <input type="checkbox" value="7,7.1,7.2,7.3,7.4,7.5,7.6,7.7,7.8,7.9" onChange={changeRating} />  7
        </label>
        <label>
        <input type="checkbox" value="8,8.1,8.2,8.3,8.4,8.5,8.6,8.7,8.8,8.9" onChange={changeRating} />  8
        </label>
        <label>
        <input type="checkbox" value="9,9.1,9.2,9.3,9.4,9.5,9.6,9.7,9.8,9.9" onChange={changeRating} />  9
        </label>
        </div>
 
        <div className="genres">
        <h5>Genres</h5>
        <label>
        <input type="checkbox" value="Action" onChange={changeHandler} />  Action
        </label><label>
        <input type="checkbox" value="Comedy" onChange={changeHandler} />  Comedy
        </label><label>
        <input type="checkbox" value="Drama" onChange={changeHandler} />  Drama
        </label><label>
        <input type="checkbox" value="Fantasy" onChange={changeHandler} />  Fantasy
        </label><label>
        <input type="checkbox" value="Horror" onChange={changeHandler} />  Horror
        </label>
        <label>
        <input type="checkbox" value="Mystery" onChange={changeHandler} />  Mystery
        </label>
        <label>
        <input type="checkbox" value="Romance" onChange={changeHandler} />  Romance
        </label>
        <label>
        <input type="checkbox" value="Thriller" onChange={changeHandler} />  Thriller
        </label>
        <label>
        <input type="checkbox" value="Western" onChange={changeHandler} />  Western
        </label>
        <label>
        <input type="checkbox" value="Documentary" onChange={changeHandler} />  Documentary
        </label>
        <label>
        <input type="checkbox" value="Biography" onChange={changeHandler} />  Biography
        </label>
        <label>
        <input type="checkbox" value="Crime" onChange={changeHandler} />  Crime
        </label>
        <label>
        <input type="checkbox" value="Short" onChange={changeHandler} />  Short
        </label>
        </div>
        </div>
        </>
    
    
    )

}

export default Checkbox