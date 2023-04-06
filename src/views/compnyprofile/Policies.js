import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Policies = () => {

    const [data, setData] = useState([])

    const getPolicies = () => {
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
        getPolicies()
    }, [])

    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>company_policy</th>
                    <th>moonlight_policy</th>
                    <th>tour_policy</th>
                    <th>yearlyleave_policy</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.company_policy}</td>
                            <td>{data.moonlight_policy}</td>
                            <td>{data.tour_policy}</td>
                            <td>{data.yearlyleave_policy}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Policies