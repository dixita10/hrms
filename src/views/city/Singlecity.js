import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singlecity = () => {


  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState([])

  useEffect(() => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/city/findonecity/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <div>
      <table className='responstable'>
        <tr>
          <th>city_name</th>
          <th>state_id</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.city_name}</td>
              <td>{data.state_id}</td>

            </tr>
          )
        }
      </table>
    </div>
  )
}

export default Singlecity