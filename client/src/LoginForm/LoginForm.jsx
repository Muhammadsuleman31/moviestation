import React, { useEffect } from "react"
import {useState} from "react"
import './loginform.css'
import validator from "validator"
import axios from "axios"
import {useContext} from "react"
import AuthContext from "../utensils/AuthContext"
import { useNavigate } from "react-router-dom"

function LoginForm(){
    
const [userData ,setUserData] = useState({
    email : '',
    password : ''
})

const [validemail,setValidemail] = useState(true)
const a = useContext(AuthContext)
const navigate = useNavigate()


    function changeHandler(e){
        const {name,value} = e.target;
         setUserData(prevdata=>{
            return({...prevdata,[name]:value})
         })

        
    }

    async function done(e){
        e.preventDefault()
       
       
        if(!validator.isEmail(userData.email)){
            setValidemail(false)
        }
        else{
            setValidemail(true)
        }
       
       if(validator.isEmail(userData.email)){
          
        var response = await axios.post("/loginform",userData)
        var data = response.data
         if(data.hasOwnProperty('message')){
             alert(data.message)
             return
          } 
           var token = data.token 
          localStorage.setItem('user' , JSON.stringify(data))
          localStorage.setItem('token' , token)
          a.setAuth(data)
          setUserData({
            email : '',
            password : ''
        }) 
          
        
          navigate("/")

        }   
        
   }


   const [showPassword, setShowPassword] = useState(false);

  const toggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    
  };

 function signuppage(){
    navigate("/signup")
 }
    return(

        <>
        <div className="loginpage">
        <form className="loginform"  autocomplete="off">
            <h1>Sign in</h1>
           <label>
            Email: <input type="text" name="email" required onChange={changeHandler} value={userData.email} />
           </label>
  
           <label>
            Password: <input type={showPassword ? 'text' : 'password'} name="password" value={userData.password} required onChange={changeHandler} />
            <input type="checkbox" onChange={toggle}/><span className="pass">show password</span>
           </label>
        
           <button type="submit" className="btn" onClick={done}>Login</button>
           <div className="text" >Don't have Account ? <span onClick={signuppage}>Signup</span> </div>
   
        </form> 
        {!validemail && <div>Email is not valid</div>}
      
        </div>
        
        </>
    )
}

export default LoginForm