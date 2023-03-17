import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom'




const View = () => {
     const [user,setUser] = useState({});
     const {id} = useParams();
     useEffect(() => {
      axios.get(`http://localhost:4000/api/get/${id}`).then((res)=> setUser({...res.data[0]}))
    
    }, [id])
  
  return (
    <div>
           <div>
           <div><h1>User Contact Details</h1></div>
           <div><strong>Id:</strong></div>
           <span>{id}</span>

           <br />
           <br />

           <div><strong>Name:</strong></div>
           <span>{user.name}</span>
            <div><strong>email:</strong></div>
           <span>{user.email}</span>

           <br />
           <br />
            <div><strong>Contact:</strong></div>
           <span>{user.contact}</span>

           <br />
           <br />


           </div>

           

    <Link to={'/'}>
        <input type="button" value='GoTo Homepage' />
            </Link>


    </div>
  )
}

export default View