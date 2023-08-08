import React from "react"
import {useState} from "react"
import validator from "validator"
import axios from "axios"
import {useContext} from "react"
import AuthContext from "../utensils/AuthContext"
import { useNavigate } from "react-router-dom"
import './signupform.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Tooltip from '@mui/material/Tooltip';

function SignupForm(){

    
    
const [userData ,setUserData] = useState({
    name : '',
    email : '',
    password : ''
})



const [validemail,setValidemail] = useState(true)
const [validpassword,setValidpassword] = useState(true)
const a = useContext(AuthContext)
const navigate = useNavigate()
const [passwordr,setpasswordr] = useState()
const [emailr,setemailr] = useState()

    
function changeHandler(e){
    const {name,value} = e.target;
     setUserData(prevdata=>{
        return({...prevdata,[name]:value})
     })

     if(e.target.name==='email'){
    if(!validator.isEmail(e.target.value)){
        setValidemail(false)
        setemailr('input-error')
    }else{setValidemail(true)
        console.log(e.target.value)
        setemailr('')
    }
}

  if(e.target.name==='password'){
    if(!validator.isStrongPassword(e.target.value)){
        setValidpassword(false)
        setpasswordr('input-error')
    }
    else{setValidpassword(true)
          setpasswordr('') 
        }
    }    
}








async function done(e){
        e.preventDefault()
        if(validator.isEmail(userData.email) && validator.isStrongPassword(userData.password)){
          
             var response = await axios.post("/signupdetail",userData)
             var data = response.data
             if(data.hasOwnProperty('message')){
                alert(data.message)
                setUserData({
                    name : userData.name,
                    email : '',
                    password : userData.password
                })
                return
             }  
             var token = data.token 
             localStorage.setItem('user' , JSON.stringify(data))
             localStorage.setItem('token' , token)
             a.setAuth(data)
            setUserData({
                name : '',
                email : '',
                password : ''
            })
             navigate("/") 
            }
  
            
    }
    const [showPassword, setShowPassword] = useState(false);

    const toggle = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
      console.log(showPassword)
    };
  

 
   


    return(
        <div className="signuppage">
        <form>
           <label>
            Name: <input type="text" name="name" required onChange={changeHandler} value={userData.name} />
           </label>
           
           <label>
            Email: 
            <div style={{ display: 'flex', alignItems: 'center' }}> 
            <input type="text" name="email" required onChange={changeHandler} value={userData.email}  className={emailr} /> 
             {!validemail && ( <Tooltip title="invalid email"  placement="right" arrow><i className="fas fa-exclamation-circle" style={{ color: '#FF7F7F', fontSize: '24px' }}></i> </Tooltip> )}
            </div>
           </label>
  
           <label>
          Password:
          <div style={{ display: 'flex', alignItems: 'center' }}>
           <input type={showPassword ? 'text' : 'password'} name="password" required onChange={changeHandler} value={userData.password}   className={passwordr}  /> 
           {!validpassword && (<Tooltip title="Password must contain at least 8 characters with uppercase, lowercase, digits, and special characters" placement="right" arrow> <i className="fas fa-exclamation-circle" style={{ color: '#FF7F7F', fontSize: '24px' }}></i></Tooltip>)}
          </div> 
          <input type="checkbox" onChange={toggle}/><span className="pass">show password</span>
           </label>
        
           <button type="submit" className="btn" onClick={done}>sign up</button>
           <div className="text" >Already sign up ? <a href="/login">Login</a> </div>
        </form>
   
       
        </div>
    )
}

export default SignupForm