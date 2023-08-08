import {useState , useContext, useEffect} from "react"
import AuthContext from "./AuthContext"
import {Navigate , Outlet} from "react-router-dom"

const AuthState = (props) => {


  const [auth,setAuth] = useState()

  useEffect(()=>{
    var user = JSON.parse(localStorage.getItem("user"))
    if(user){
        setAuth(user)
    }
},[])



  return(
    <AuthContext.Provider value={{auth,setAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState