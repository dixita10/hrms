import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = () => {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findallcountry`,
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
                    <th>country_name</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.country_name}</td>
                        </tr>
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