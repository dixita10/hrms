import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Department() {
    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/department/findalldepartment',
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
            .catch((error)=>{
                console.log(error);
            })

    }, [])

    const [data, setdata] = useState([])
    return (
        <div className='table-responsive'>
            <table className='table table-bordered border' border="1">
                <thead>
                    <tr>
                        <th>dep_name</th>
                        <th>description</th>
                    </tr>
                </thead>
                {
                    data.map((data) =>
                        <tbody>
                            <tr>
                                <td>{data.dep_name}</td>
                                <td>{data.description}</td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}

export default Department