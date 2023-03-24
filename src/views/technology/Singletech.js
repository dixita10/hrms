import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singletech = () => {

  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState([])

  useEffect(() => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findonetechnology/${id}`,
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

export default Singletech