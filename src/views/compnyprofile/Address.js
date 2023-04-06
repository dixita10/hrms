import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Address = () => {

    const [data, setData] = useState([])

    const getAddress = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/companyprofile/findallcompnayprofile`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.data);
                if (response.status === 200) {
                    setData(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getAddress()
    }, [])


    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>address</th>
                    <th>City Name</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.address}</td>
                            <td>{data.city_name}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Address