import './App.css';
import Form from "./Form/Form"
import Movies from "./Movies/Movies"
import { useState, useEffect , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Checkbox from "./Checkbox/Checkbox"
import Pagination from '@mui/material/Pagination';
import AuthContext from "./utensils/AuthContext"
import "./App.css"
import Search from './Search/Search';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';


var didMount = false


var total;


function App() {
  
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    
    function toggleMenu(){
      setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
      
    }
 

    const navigate = useNavigate();

    
// const navigate = useNavigate();
// auth && navigate("/login")

const a = useContext(AuthContext)
const [data,setdata] = useState([])
const [page, setPage] = useState(1);
const pageSize = 10;
const [pageinfo,setPageinfo] = useState({})


function helper(){
  axios.post("/api",page, { headers: { Authorization: localStorage.getItem("token") } })
    .then(response => {
      var datas = response.data;
      if (datas.hasOwnProperty('message')) {
        alert(datas.message);
        logout();
        return;
      }
      total = datas.pop();
      setdata(datas);
  
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });

}



useEffect(() => {
  axios.post("/api",page, { headers: { Authorization: localStorage.getItem("token") } })
    .then(response => {
      var datas = response.data;
      if (datas.hasOwnProperty('message')) {
        alert(datas.message);
        logout();
        return;
      }
      total = datas.pop();
      setdata(datas);
  
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
}, []);

function Addme(movie){
  axios.post("/addmovie",movie,{headers :{ Authorization : localStorage.getItem("token")}})
  .then(response=> {
    var datas = response.data
    if(datas.hasOwnProperty('message')){
      alert(datas.message)
      logout()
      return
   } })
    setdata(prevdata=>{
      return(
        [...prevdata,movie]
      )
    })
}

function deleted(key){  
  axios.post("/removemovie",{title : key},{headers :{ Authorization : localStorage.getItem("token")}})
  .then(response => {
    var datas = response.data
    if(datas.hasOwnProperty('message')){
      alert(datas.message)
      logout()
      return
   } })
   setdata(prevdata =>{
    return data.filter((item) => {
      return item.title !== key
    })
   })
}

async function filterMe(obj){
  await axios.post("/filter",obj,{headers :{ Authorization : localStorage.getItem("token")}})
  .then(response=>{
    var datas = response.data
    if(datas.hasOwnProperty('message')){
      alert(datas.message)
      logout()
      return
   } 
    total = datas.pop()
    setdata(datas)}) 
  setPage(1)
}


async function searchMe(item){

  await axios.post("/search",{title: item},{headers :{ Authorization : localStorage.getItem("token")}})
  .then(response=>{
    console.log("searched")
    if(response.data!==null)
    {var datas = response.data
    if(datas.hasOwnProperty('message')){
      alert(datas.message)
      logout()
      return
     }
  
     if(response.data[0].title===undefined){
      alert("not found");
      window.location.reload(true);

     }
     total = datas.pop()
     setdata(datas)
     setPage(1)
    }else{
      console.log("hello")

    }
  })
}



function handlePage(event,page){
setPage(page);
setPageinfo({
  to: page*pageSize,
  from: page*pageSize - pageSize
})
didMount = true;
}

useEffect(() => {
if (didMount){
    const params = new URLSearchParams({
      skip:pageinfo.from 
    }).toString();

    axios.post("/page?"+params,{}, {headers :{ Authorization : localStorage.getItem("token")}} )
   .then(response=>{
  
    var datas = response.data
    if(datas.hasOwnProperty('message')){
      alert(datas.message)
      logout()
      return
   } 
    setdata(response.data)})  
}
}, [pageinfo])

function logout(){
   localStorage.clear()
   a.setAuth(null)
   navigate("/login")
   
}

function changepage(){
  navigate("/addmovie")
}



  return (
  <>
  <div className='nav'>
    <h2><a  href="/">MovieHub</a></h2>

   { a.auth && <div className='namelog'>  <button className='home-button' onClick={helper}>Home</button><div className='nam'>{a.auth.name}</div><button onClick={logout}>Logout</button>  {/* Button to toggle the menu */}
<div className='slider'>
<MenuIcon onClick={toggleMenu} />
<Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
  <List>
    <ListItem>
      <ListItemText onClick={changepage} primary="Add Movie" />
      <IconButton onClick={toggleMenu}>
      <ClearIcon />
    </IconButton>
    </ListItem>
    <ListItem>
    <Checkbox onfilter={filterMe}/>
    </ListItem>
    {/* Add more menu items as needed */}
  </List>
</Drawer>
</div>
</div>}
   
    </div>
       
  
  <div><Search onSearch={searchMe} /></div>




  <div className="hero">
  <div className="item-1">
  {
    data.map((item,index) =>{
      return (
      <Movies 
         Name={item.title} 
         Imdb={item.imdb.rating } 
         Year={item.year} 
         Plot={item.fullplot}
         Genres={item.genres}
         Runtime={item.runtime}
         Poster={item.poster}
         Index={index}
         key={index}
         ondelete={deleted}
      />
      );
    })
  }
  </div>
  <div  className="item-2">
  <Form onAdd={Addme} />
  <Checkbox onfilter={filterMe}/>
  </div>



  </div>
    <Pagination count={Math.ceil(total/pageSize)} page={page} onChange={handlePage} />
   
    </>
  );
}

export default App;
