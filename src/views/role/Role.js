import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Role = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/role/findallrole`,
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
          <th>role_name</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.role_name}</td>
            </tr>
          )
        }
      </table>
    </div>
  )
}

export default Role