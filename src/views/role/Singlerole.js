import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singlerole = () => {

    const { id } = useParams();
    // console.log(id);

    const [data, setData] = useState([])

    useEffect(() => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/role/findonerole/${id}`,
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
        <div className='role_single'>
            <div className='row'>
                <div className='col-md-3 admin m-3'>
                    <p style={{ fontWeight: 500 }}>Role_name</p>
                    {
                        data.map((data) =>
                            <p>{data.role_name}</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Singlerole