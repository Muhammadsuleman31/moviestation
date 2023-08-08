import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();

function verify(req,res,next){
    
   const token = req.headers.authorization
  
    if(token==="null"){
       return  res.json({message : "login Credential Expired"})
       
    }
     
    jwt.verify(token,process.env.TOKEN_SECRET , function(err,decoded){
        if(err){
            return res.json({message :  "token not valid"})
        }else{
            req.userId = decoded._id;
            next();
        }
      
    })

}

export default verify