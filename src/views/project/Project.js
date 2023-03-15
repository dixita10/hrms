import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Project = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: 'http://localhost:1010/project/findallproject',
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
            <th>pro_name</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>status</th>
            <th>description</th>
            <th>tec_id</th>
          </tr>
        {
          data.map((data) =>
              <tr>
                <td>{data.user_id}</td>
                <td>{data.pro_name}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
                <td>{data.status}</td>
                <td>{data.description}</td>
                <td>{data.tec_id}</td>

              </tr>
          )
        }
      </table>
    </div>
  )
}

export default Project