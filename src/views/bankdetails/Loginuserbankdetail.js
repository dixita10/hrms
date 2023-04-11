import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Loginuserbankdetail = () => {

    const [data, setdata] = useState([])
    const getBankdetail = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/bankdetail/loginuserbankdetail`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response);
                setdata(response.data.bankdetail)
            })
    }

    useEffect(() => {
        getBankdetail()
    }, [])



    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>name</th>
                    <th>bank_name</th>
                    <th>acc_no</th>
                    <th>branch_name</th>
                    <th>city_id</th>
                    <th>ifsc_code</th>
                    <th>acc_type</th>
                    <th>Action</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.bank_name}</td>
                            <td>{data.acc_no}</td>
                            <td>{data.branch_name}</td>
                            <td>{data.city_name}</td>
                            <td>{data.ifsc_code}</td>
                            <td>{data.acc_type}</td>
                            <td style={{ fontSize: '24px' }}>
                                <Link to={`/editbankdetail/${data.bank_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                {/* <MdDeleteForever onClick={() => handleDelete(data.bank_id)} style={{ color: 'red' }} /> */}
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Loginuserbankdetail