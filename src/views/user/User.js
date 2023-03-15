import React, { useState, useEffect } from 'react'
import axios from 'axios'

const User = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: 'http://localhost:1010/user/findalluser',
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response);
        setdata(response.data.data)
      })

  }, [])


  const [data, setdata] = useState([])

  // console.log(data);
  return (
    <div>
      <table className='responstable'>
        <tr>
          <th>user_id</th>
          <th>name</th>
          <th>email</th>
          <th>username</th>
          <th>password</th>
          <th>city_id</th>
          <th>address</th>
          <th>birth_date</th>
          <th>age</th>
          <th>gender</th>
          <th>role_id</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.user_id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              <td>{data.password}</td>
              <td>{data.city_id}</td>
              <td>{data.address}</td>
              <td>{data.birth_date}</td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              <td>{data.role_id}</td>

            </tr>
          )
        }
      </table>
    </div>
  )
}

export default User