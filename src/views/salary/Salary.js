import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Salary = () => {
  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/salary/findallsalary`,
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
          <th>salary</th>
          <th>bank_detail</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.user_id}</td>
              <td>{data.salary}</td>
              <td>{data.bank_detail}</td>
            </tr>
          )
        }
      </table>
    </div>
  )
}

export default Salary