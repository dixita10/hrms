import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singlecountry = () => {

    const { id } = useParams();
    console.log(id);

    // const [data, setData] = useState({
    //     user_id: user_id,
    //     intime: '',
    //     outtime: '',
    //     remark: ''
    // })

    const [data, setData] = useState([])
    // const [item , setitem] = useState()

    useEffect(() => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findonecountry/${id}`,
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
    }, [])
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
}

export default Singlecountry