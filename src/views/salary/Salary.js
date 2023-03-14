import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Salary = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: 'http://localhost:1010/salary/findallsalary',
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
            <th>user_id</th>
            <th>salary</th>
            <th>bank_detail</th>
          </tr>
        </thead>
        {
          data.map((data) =>
            <tbody>
              <tr>
                <td>{data.user_id}</td>
                <td>{data.salary}</td>
                <td>{data.bank_detail}</td>
              </tr>
            </tbody>
          )
        }
      </table>
    </div>
  )
}

export default Salary