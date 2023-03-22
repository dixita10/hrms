import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const singleuser = () => {
    const [data, setData] = useState([])

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user/findoneuser/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data);
                setData(response.data)
            })
    }, [])

    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>username</th>
                    <th>city_id</th>
                    <th>address</th>
                    <th>birth_date</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>role_id</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.username}</td>
                            <td>{data.city_id}</td>
                            <td>{data.address}</td>
                            <td>{moment(data.birth_date).format("LLL")}</td>
                            <td>{data.age}</td>
                            <td>{data.gender}</td>
                            <td>{data.role_id}</td>
                            {/* <td><Link to={`/singleuser/${data.city_id}`}><button type="button" className="btn btn-outline-secondary">view</button></Link></td> */}

                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default singleuser