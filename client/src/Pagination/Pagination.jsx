import {useEffect,useState} from "react"
import Pagination from '@mui/material/Pagination';

var didMount = false


function Pages(props){


  const [page, setPage] = useState(1);
    const pageSize = 10;
    const [pageinfo,setPageinfo] = useState({
        page : 1,
        to : 10,
        from: 0
      })

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
    props.onPageChange(pageinfo)
  }
}, [pageinfo])




return(
     <>
     <Pagination count={10} page={page} onChange={handlePage} />
    
     </>

)
}

export default Pages