import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Technology = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findalltechnology`,
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
          <th>tec_name</th>
          <th>dep_id</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.tec_name}</td>
              <td>{data.dep_id}</td>
            </tr>
          )
        }
      </table>
    </div>
  )
}

export default Technology