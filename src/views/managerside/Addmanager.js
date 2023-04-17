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
import { BiUserPlus } from "react-icons/bi";

const Addmanager = () => {


    const [user, setUser] = useState([])

    const getUser = () => {
        var token = `Bearer ${localStorage.getItem('token')}`;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user/findalluser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        }).then((response) => {
            const filteredUsers = response.data.data.filter(user => user.role_id === 4);
            setUser(filteredUsers);
        })
            .catch((error) => {
                console.log(error);
            });
    }

    const [assign, setAssign] = useState([])

    const assignuser = () => {

        var token = `Bearer ${localStorage.getItem('token')}`;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user/findalluser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                const filteredUsers1 = response.data.data.filter(user => user.role_id === 1);
                setAssign(filteredUsers1)
            }
        })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUser();
        assignuser();
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
            assign_id: data.assign_id,
        }
        console.log(passData);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/reporting/adddreporting`,
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
                    history.push("/attendanceuser")
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
                                        <h3 className='text-center'>Add Manager</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BiUserPlus />
                                            </CInputGroupText>
                                            <select className="form-select" aria-label="Default select example" value={user.user_id} onChange={handleChange} name="user_id">
                                                <option selected>choose Manager name</option>
                                                {user.map((user, index) => {
                                                    return (
                                                        <option key={index} value={user.user_id}>{user.username}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <BiUserPlus />
                                            </CInputGroupText>
                                            <select className="form-select" aria-label="Default select example" value={assign.user_id} onChange={handleChange} name="assign_id">
                                                <option selected>choose Assign name</option>
                                                {assign.map((assign, index) => {
                                                    return (
                                                        <option key={index} value={assign.user_id}>{assign.username}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </CInputGroup>
                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Manager</CButton>
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

export default Addmanager