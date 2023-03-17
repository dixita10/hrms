import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

const User = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findalluser`,
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
          <th>action</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              <td>{data.password}</td>
              <td>{data.city_id}</td>
              <td>{data.address}</td>
              <td>{moment(data.birth_date).format("LLL")}</td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              <td>{data.role_id}</td>
              <td><Link to={`/singleuser/${data.user_id}`}><button type="button" className="btn btn-outline-secondary">view</button></Link></td>

            </tr>
          )
        }
      </table>
    </div>
  )
}

export default User