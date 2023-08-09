import express from "express"
import path from "path"
import bodyParser from 'body-parser'
import cors from "cors"
import mongoose from "mongoose"
import Movies from "./models/movies.js"
import User from "./models/user.js"
import Series from "./models/series.js"
import url from "url"
import { request } from "http"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import verify from "./middlewear/verify.js"

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());
mongoose.set('strictQuery', false);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const uri = "mongodb+srv://Muhammadsuleman:4xPkTcYLKgK9hrw@cluster0.i8j8ksq.mongodb.net/sample_mflix?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true })
    .then(()=> app.listen(PORT, ()=>{ console.log('listening at port 5000')}))
    .catch(err => console.log(err))


    if ( process.env.NODE_ENV == "production"){

      app.use(express.static("client/build"));
  
  
      app.get("*", (req, res) => {
  
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  
      })
  
  
  }







const obj ={Rating:7.5 , Actor:[], Age:[]}

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === undefined || obj[propName].length === 0 || obj[propName].$in.length === 0) {
      delete obj[propName];
    }
  }
  return obj
}

var total;



app.post("/api", verify, (req, res) => {

  
  // console.log(req.userId)
  Movies.find().count(function(err, count){
    total = count;
    total = total - 1849;
});
  
  Movies.find()
  .limit(10)
  .then((result)=> res.json([...result,total]))
  .catch(err => res.json(err))
  
});




app.post("/addmovie", verify,(req,res)=>{
  console.log(req.body)
  const mongo = new Movies(req.body)

mongo.save()
    .then((result)=> res.send(result))
    .catch(err => connsole.log(err))
  
 

})

app.post("/removemovie", verify, (req,res)=>{

  Movies.deleteOne(req.body, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });   
})

var filterinfo;

app.post("/filter", verify, (req,res)=>{
  
  filterinfo = clean(req.body);
  console.log(filterinfo)

  Movies.find(filterinfo).count(function(err, count){
    total = count;
  });

  Movies.find(filterinfo)
  .limit(10)
  .then((result)=> res.json([...result,total]))
  .catch(err => res.json(err))
   
})

app.post("/page", verify, (req,res)=>{
  const queryObject = url.parse(req.url, true).query;
  Movies.find(filterinfo)
  .skip(queryObject.skip)
  .limit(10)
  .then((result)=> res.json(result))
  .catch(err => res.json(err))
   
})


app.post("/search", verify, (req,res)=>{
  const regex = new RegExp(req.body.title, 'i');
 
  Movies.find({ title: regex }).count(function(err, count){
    total = count;
  });
  
  Movies.find({ title: regex })
    .then((result)=> res.json([...result,total]))
  .catch(err => res.json(err))
   
})




app.post("/signupdetail", async (req,res)=>{
   const email = await User.findOne({email : req.body.email})
   if(email){
    res.status(200  ).json({message : "email already exist"})
  return;
}


var hashedpassword = bcrypt.hashSync(req.body.password, 8);

const newuser = new User({
  name : req.body.name,
  email : req.body.email,
  password : hashedpassword
})

newuser.save()

const token = jwt.sign({_id : newuser._id} ,process.env.TOKEN_SECRET,{ expiresIn : 86400 })
res.json({
  name : newuser.name,
  auth : true,
  token : token
})

})
  



app.post("/loginform", async (req,res)=>{
  const user = await User.findOne({email : req.body.email})
 
  if(!user){
    return res.json({message : "invalid email"})
  }
  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) return res.json({message : "invalid password"});

  const token = jwt.sign({_id : user._id} ,process.env.TOKEN_SECRET,{ expiresIn : 86400 })
  res.json({
    name : user.name,
    auth : true,
    token : token
  })

})
