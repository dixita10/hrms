import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Technology = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: 'http://localhost:1010/technology/findalltechnology',
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
    <div className='table-responsive'>
      <table className='table table-bordered border' border="1">
        <thead>
          <tr>
            <th>tec_name</th>
            <th>dep_id</th>
          </tr>
        </thead>
        {
          data.map((data) =>
            <tbody>
              <tr>
                <td>{data.tec_name}</td>
                <td>{data.dep_id}</td>
              </tr>
            </tbody>
          )
        }
      </table>
    </div>
  )
}

export default Technology