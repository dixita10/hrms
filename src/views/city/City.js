import React, { useState, useEffect } from 'react'
import axios from 'axios'


const City = () => {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/city/findallcity',
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

export default City