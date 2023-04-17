import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Loginsalary = () => {

    const [data, setData] = useState([])

    const getSalary = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/salary/loginusersalary`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data.salary);
                if (response.status === 200) {
                    setData(response.data?.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        getSalary();
    }, [])




    return (
        <div>
            <table className='responstable'>
                <tr>
                    {/* <th>user_id</th> */}
                    <th>salary</th>
                    <th>bank_detail</th>
                    <th>username</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            {/* <td>{data.user_id}</td> */}
                            <td>{data.salary}</td>
                            <td>{data.bank_detail}</td>
                            <td>{data.name}</td>

                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Loginsalary