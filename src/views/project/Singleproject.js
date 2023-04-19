import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
const Singleproject = () => {

  const { id } = useParams();

  const [data, setData] = useState([])

  useEffect(() => {
    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/project/findoneproject/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response.data);
        setData(response.data.data)
      })
  }, [])


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
        <tr>
          <td>{data.user_id}</td>
          <td>{data.pro_name}</td>
          <td>{data.start_date}</td>
          <td>{data.end_date}</td>
          <td>{data.status}</td>
          <td>{data.description}</td>
          <td>{data.tec_id}</td>
        </tr>
      </table>
    </div>
  )
}

export default Singleproject