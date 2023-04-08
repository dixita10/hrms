import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';


const Loginleave = () => {

    const [data, setData] = useState([])

    const getLeave = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/leave/getleavebyloginuser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response);
                if (response.status === 200) {
                    setData(response.data.leave)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getLeave()
    }, [])

    const handleDelete = (leave_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/leave/deleteleave/${leave_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getLeave()
                    toast.success(response.data.message)
                }
            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }


    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={'/addleave'}>
                    <button type="button" class="btn btn-primary">Apply For Leave </button>
                </Link>
            </div><br />
            <table className='responstable'>
                <tr>
                    <th>tittle</th>
                    <th>start_date</th>
                    <th>end_date</th>
                    <th>days</th>
                    <th>status</th>
                    <th>name</th>
                    <th>action</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.tittle}</td>
                            <td>{data.start_date}</td>
                            <td>{data.end_date}</td>
                            <td>{data.days}</td>
                            <td>{data.status}</td>
                            <td>{data.name}</td>
                            <td><button
                                className="btn btn-outline-danger mx-2"
                                onClick={() => handleDelete(data.leave_id)}
                            >
                                Delete
                            </button></td>
                        </tr>
                    )
                }

            </table>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Loginleave