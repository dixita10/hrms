import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = () => {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/country/findallcountry',
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
    return (
        <div className='table-responsive'>
            <table className='table table-bordered border' border="1">
                <thead>
                    <tr>
                        <th>country_name</th>
                    </tr>
                </thead>
                {
                    data.map((data) =>
                        <tbody>
                            <tr>
                                <td>{data.country_name}</td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    )

  return (
    <div>

    </div>
  )
}

export default Country