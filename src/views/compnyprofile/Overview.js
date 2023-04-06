import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Overview = () => {

    var role_id = localStorage.getItem('role_id')

    const [data, setData] = useState([])

    const getOverview = () => {
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
        getOverview()
    }, [])

    const handleDelete = (compnay_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            compnay_name: data.compnay_name,
            domain_name: data.domain_name,
            website: data.website,
            city_id: data.city_id,
            address: data.address,
            company_policy: data.company_policy,
            moonlight_policy: data.moonlight_policy,
            tour_policy: data.tour_policy,
            yearlyleave_policy: data.yearlyleave_policy,
        }

        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/companyprofile/deletecompnayprofile/${compnay_id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    getOverview()
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
            {/* <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={'/addcompanyprofile'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br /> */}
            {role_id === "3" ? (
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={'/addcompanyprofile'}>
                        <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                    </Link>
                </div>
            ) : null}<br />
            <table className='responstable'>
                <tr>
                    <th>compnay_name</th>
                    <th>domain_name</th>
                    <th>website</th>
                    {role_id === "3" ? (
                        <th>action</th>
                    ) : null}
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.compnay_name}</td>
                            <td>{data.domain_name}</td>
                            <td>{data.website}</td>
                            {role_id === "3" ? (
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/editcompanyprofile/${data.compnay_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.compnay_id)} style={{ color: 'red' }} />
                                </td>
                            ) : null}

                        </tr>
                    )
                }
            </table>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Overview