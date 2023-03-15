import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Department() {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/department/findalldepartment`,
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
            .catch((error) => {
                console.log(error);
            })

    }, [])

    const [data, setdata] = useState([])
    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>dep_name</th>
                    <th>description</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.dep_name}</td>
                            <td>{data.description}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Department