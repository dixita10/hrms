import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilLockLocked, cilUser, cilPhone
} from '@coreui/icons'
import { toast, ToastContainer } from 'react-toastify';
import { BiTimeFive, BiCommentCheck, BiRupee } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";

const Addsalary = () => {


    const [username, setUsername] = useState([])

    const Username = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user/findalluser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data.data);
                setUsername(response.data.data)
            })

    }
    // console.log(country);

    useEffect(() => {
        Username()
    }, [])

    var history = useHistory();

    const [data, setData] = useState([])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            user_id: data.user_id,
            salary: data.salary,
            bank_detail: data.bank_detail,
            // username: username.username,
        }

        console.log(passData);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/salary/addsalary`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    history.push("/salary")
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }


    return (
        <div>
            <div className="bg-light d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">

                                    <CForm onSubmit={handleSubmit} >
                                        <h3 className='text-center'>Add Salary</h3><br />
                                        {/* <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="user_id" autoComplete="user_id" name="user_id"
                                                value={data.user_id}
                                                onChange={handleChange} />
                                        </CInputGroup> */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BiRupee />
                                            </CInputGroupText>
                                            <CFormInput placeholder="salary" autoComplete="salary" name="salary"
                                                value={data.salary}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BsBank2 />
                                            </CInputGroupText>
                                            <CFormInput placeholder="bank_detail" autoComplete="bank_detail" name="bank_detail"
                                                value={data.bank_detail}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <select className="form-select" aria-label="Default select example" value={username.user_id} name="user_id" onChange={handleChange}>
                                                <option selected>choose  Username</option>
                                                {username.map((username, index) => {
                                                    return (
                                                        <option key={index} value={username.user_id}>{username.username}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </CInputGroup>


                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Salary</CButton>
                                        </div>



                                    </CForm>
                                </CCardBody>

                            </CCard>
                        </CCol>
                    </CRow>

                    <ToastContainer autoClose={2000} />
                </CContainer>

            </div >
        </div>
    )
}

export default Addsalary