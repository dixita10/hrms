import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

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

    const handleDelete = (company_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`

        // var passData = {
        //     compnay_name: data.compnay_name,
        //     domain_name: data.domain_name,
        //     website: data.website,
        //     city_id: data.city_id,
        //     address: data.address,
        //     company_policy: data.company_policy,
        //     moonlight_policy: data.moonlight_policy,
        //     tour_policy: data.tour_policy,
        //     yearlyleave_policy: data.yearlyleave_policy,
        // }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/companyprofile/deletecompnayprofile/${company_id}`,
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={'/addcompanyprofile'}>
                        <button className="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                    </Link>
                </div>
            ) : null}<br />

            {/* {role_id === "3" ? (
                <th>action</th>
            ) : null} */}
            <div >
                <div className='myprofile p-1'>
                    <div className='row'>
                        <div className='col-md-11'>
                            <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>OVERVIEW</h6>
                        </div>
                        {role_id === "3" ? (<div className='col-md-1' style={{ marginTop: "5px" }} >
                            <Link to={`/editcompanyprofile/${data.company_id}`}><MdEdit style={{ fontSize: "20px" }} /></Link>
                            <MdDeleteForever onClick={() => handleDelete(data.company_id)} style={{ color: 'red', cursor: 'pointer', fontSize: "20px", marginLeft: "10px" }} />
                        </div>) : ""}
                    </div>
                    <hr />
                    <div className='row m-4'>
                        <div className='col-md-4'>
                            <h6>company_name</h6>
                            {data.company_name}
                        </div>
                        <div className='col-md-4'>
                            <h6>domain_name</h6>
                            {data.domain_name}
                        </div>

                    </div>
                    <div className='row m-4'>
                        <div className='col-md-4'>
                            <div>
                                <h6>website</h6>
                                {data.website}
                            </div>
                        </div>

                    </div>
                </div><br />
            </div>
            <div >
                <div className='myprofile p-1'>
                    <div className='row'>
                        <div className='col-md-11'>
                            <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>SOCOAL PROFILE</h6>
                        </div>
                    </div>
                    <hr />
                    <p className='compnyicon'>
                        <a href='https://www.linkedin.com/company/adsum-originator' target="_blank">
                            <span style={{ fontSize: "26px", color: "#0082CA", borderRadius: "50%", margin: "0 10px 0 15px" }}><BsLinkedin /></span>
                        </a>
                        <a href='https://www.facebook.com/AdsumOriginatorLLP/' target="_blank">
                            <span style={{ fontSize: "30px", color: "#3B5998", margin: "0 5px" }}><AiFillFacebook /></span>
                        </a>
                        <a href='https://twitter.com/navneetboghani' target="_blank">
                            <span style={{ fontSize: "30px", color: "#0082CA", margin: "0 5px" }}><AiFillTwitterSquare /></span>
                        </a>
                    </p>
                </div><br />
            </div>
            {/* <tr>
                        <td>{data.company_name}</td>
                       <td>{data.domain_name}</td>
                         <td>{data.website}</td>
                      {role_id === "3" ? (
                            <td style={{ fontSize: '24px' }}>
                                <Link to={`/editcompanyprofile/${data.company_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                <MdDeleteForever onClick={() => handleDelete(data.company_id)} style={{ color: 'red', cursor: 'pointer' }} />
                            </td>
                        ) : null}

                    </tr> */}
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Overview