import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

const Singlestate = () => {

  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState([])

  useEffect(() => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/state/findonestate/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("response", response.data.data);
        if (response.status === 200) {
          setData(response.data?.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <div>
      <table className='responstable'>
        <tr>
          <th>state_name</th>
          <th>country_id</th>
        </tr>
        <tr>
          <td>{data.state_name}</td>
          <td>{data.country_id}</td>
        </tr>
      </table>
    </div>
  )
}

export default Singlestate