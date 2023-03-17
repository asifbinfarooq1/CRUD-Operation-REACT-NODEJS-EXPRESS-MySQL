import React from 'react';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [data,setData] = useState([])
    const loadData = async()=>{
        const response = await axios.get('http://localhost:4000/api/get');
        setData(response.data)
    }
    useEffect(()=>{
        loadData();
    },[]);
    const deletContact = (id) =>{
        if(window.confirm('Are you sure to delete?')) {
            axios.delete(`http://localhost:4000/api/remove/${id}`);
            toast.success("User Deleted");
            setTimeout(() => loadData(), 500);
        }
    }
  return (
    <div className='main'>
       

        <table className="styled-tabled">
            <thead>
                <tr className='cols'>
                    <th>No.</th>
                    <th >Name</th>
                    <th >Email</th>
                    <th >Contact</th>
                    <th >Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item,index)=>{
                return(
                    <tr key={item.id} className='userData'>
                        <th scope='row'>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>

                        <td>
                            <Link to={`/update/${item.id}`}>
                            <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete" onClick={()=> deletContact(item.id) }>Delete</button>
                                <Link to={`/view/${item.id}`}>
                            <button className="btn btn-view">View</button>
                            </Link>
                        </td>

                    </tr>
                )
            })}
            </tbody>
        </table>
         <Link to={'/addContact'}>
        <button className="btn btn-add" style={{marginRight:'500px',marginTop:'0'}}>Add Contact</button>
        </Link>



    </div>

  )
}


export default Home