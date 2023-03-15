import React, { useState, useEffect } from 'react'
import axios from 'axios'


const State = () => {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/state/findallstate`,
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
                    <th>state_name</th>
                    <th>country_id</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.state_name}</td>
                            <td>{data.country_id}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )

}

export default State