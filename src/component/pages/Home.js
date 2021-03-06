import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUsers(result.data.reverse());
  };

  const onDeleteUser = async(id)=>{
    await axios.delete(`http://localhost:3003/users/${id}`)
    loadUsers();
  }

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
             users.map(( user, index ) =>(
               <tr key={user.id}>
                 <th scope="row">{index + 1}</th>
                 <td>{user.name}</td>
                 <td>{user.username}</td>
                 <td>{user.email}</td>
                 <td>
                   <Link type="button" className="btn btn-primary" to={`/users/${user.id}`} >View</Link>
                   <Link type="button" className="btn btn-outline-success"  style={{margin:'0rem 1rem'}} to={`/users/edit/${user.id}`}>Edit</Link>
                   <button onClick={()=> onDeleteUser(user.id)} type="button" className="btn btn-danger">Delete</button>
                 </td>
               </tr>
             ))
           }
          </tbody>
        </table>
     
      </div>
    </div>
  );
}

export default Home;
