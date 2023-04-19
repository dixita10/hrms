import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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
import { FaRegUserCircle } from "react-icons/fa";

const Editmanager = () => {

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
            // console.log(response);
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


    const { id } = useParams();

    const getmanager = () => {

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/reporting/findonereporting/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response", response.data.data);
                    console.log(response.data.data.user_id);
                    console.log(response.data.data.assign_id);

                    setData(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getmanager()
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
            assign_id: data.assign_id
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/reporting/updatereporting/${id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response);
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
            <div>
                <div className="bg-light d-flex flex-row align-items-center">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
                                <CCard className="mx-4">
                                    <CCardBody className="p-4">

                                        <CForm onSubmit={handleSubmit} >
                                            <h3 className='text-center'>Edit Manager</h3><br />
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <FaRegUserCircle />
                                                </CInputGroupText>
                                                {/* <CFormInput placeholder="user_id" autoComplete="user_id" name="user_id"
                                                    value={data.user_id}
                                                    onChange={handleChange} /> */}
                                                <select className="form-select" aria-label="Default select example" onChange={handleChange} name="user_id">
                                                    <option value=''>{data.user_id}</option>
                                                    {user.map((user, index) => {
                                                        return (
                                                            <option key={index} value={user.user_id}>{user.username}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <BiUserPlus />
                                                </CInputGroupText>
                                                {/* <CFormInput placeholder="assign_id" autoComplete="assign_id" name="assign_id"
                                                    value={data.assign_id}
                                                    onChange={handleChange} /> */}
                                                <select className="form-select" aria-label="Default select example" onChange={handleChange} name="assign_id">
                                                    <option value=''>{data.assign_id}</option>
                                                    {assign.map((assign, index) => {
                                                        return (
                                                            <option key={index} value={assign.user_id}>{assign.username}</option>
                                                        )
                                                    })
                                                    }
                                                </select>

                                            </CInputGroup>

                                            <div className="d-grid">
                                                <CButton color="success" type='submit'>Edit Manager</CButton>
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
        </div>
    )
}

export default Editmanager