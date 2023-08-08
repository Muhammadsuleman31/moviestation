import {Navigate , Outlet} from "react-router-dom"
// import {useContext } from "react"
// import AuthContext from "./AuthContext"



function PrivateRoutes(){
    var gg = false;
    
    // const a = useContext(AuthContext) 
    var user = JSON.parse(localStorage.getItem("user"))
    if(user){
         gg = true
    }

    return(
        
        gg ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;