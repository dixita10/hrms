import React, { useState, useEffect } from 'react'
import axios from 'axios'


const State = () => {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/state/findallstate',
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
                        <th>state_name</th>
                        <th>country_id</th>
                    </tr>
                </thead>
                {
                    data.map((data) =>
                        <tbody>
                            <tr>
                                <td>{data.state_name}</td>
                                <td>{data.country_id}</td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    )
  
}

export default State