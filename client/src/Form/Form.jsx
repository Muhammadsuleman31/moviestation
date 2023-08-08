import React from "react"
import { useState } from "react";
import "./form.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Form(pros){
    const navigate = useNavigate();
 const [movie, setmovie] = useState({
    title:"",
    imdb: "",
    year:"",
    fullplot:"",
    genres:"",
    runtime:"",
    poster:"",
})   


 function handleChange(event){
    const {name,value} = event.target;
     if(name==='genres'){
        setmovie(prevmovie=>{ return {...prevmovie,[name]:value.split(",")}   }) 
     }
     else if(name==="imdb"){
        setmovie(prevmovie=>{ return {...prevmovie,[name]:{rating:parseFloat(value)}}   }) 
     }
     else{
        setmovie(prevmovie=>{ return {...prevmovie,[name]:value}   }) 
     }
     

}

function logout(){
    localStorage.clear()
    navigate("/login")
    
 }
 
function Addme(movie){
    axios.post("/addmovie",movie,{headers :{ Authorization : localStorage.getItem("token")}})
    .then(response=> {
      var datas = response.data
      if(datas.hasOwnProperty('message')){
        alert(datas.message)
        logout()
        return
     } })
    
  }

function done(e){
    e.preventDefault();
    Addme(movie)
    document.querySelector(".form").reset();
    alert("Data Submited")
    navigate('/')
}



return(
    
    <form className="form">
        <label>
            Title: 
            <input type="text" name="title" onChange={handleChange} />
        </label>

        <label>
            Rating:
            <input type="number"  step="0.1" min="0" max="10" name="imdb" onChange={handleChange} />
        </label>

        <label>
            Year:
            <input type="number" name="year" onChange={handleChange} />
        </label>

        <label>
             Genres:
            <input type="text" name="genres" onChange={handleChange} />
        </label>

        <label>
            Runtime (min):
            <input type="number" name="runtime" onChange={handleChange} />
        </label>


        <label>
            Poster (link):
            <input type="text" name="poster" onChange={handleChange} />
        </label>

        <label>
            Plot:
            <input type="text" name="fullplot" onChange={handleChange} />
        </label>

        <button type="submit" onClick={done}>Submit</button>

    </form>
)



}



export default Form