import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import loginimg from '../../../assets/images/login.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginuser = () => {

    var history = useHistory();

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        var passData = {
            email: data.email,
            password: data.password,
            // login_as: "admin"
        }


        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/userlogin/`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                var token = response.data.token
                var role_id = response.data.roleResults[0].role_id

                if (response.status === 200) {
                    // console.log(response.data.roleResults[0].role_id);
                    toast.success(response.data.message)
                    localStorage.setItem('token', token)
                    localStorage.setItem('role_id', role_id)
                    history.push("/dashboard");
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === false) {
                    toast.error(error.response.data.message);
                }
                // if (error.response.status === false) {
                //   toast.error(error.response.data.message.contact)
                // }
                // if (error.response.status === false) {
                //   toast.error(error.response.data.message.email)
                // }
                // if (error.response.data.status === 500) {
                //   toast.error("phone no dublicated")
                // }
            })

    }


    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center loginform"  >
                    <CCol md={8} style={{ width: '50rem' }}>
                        <CCardGroup >
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit} >
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type='email'
                                                placeholder="enter email"
                                                // autoComplete="id"
                                                name='email'
                                                value={data.email}
                                                onChange={handleChange}
                                            />

                                        </CInputGroup>

                                        <div className="pwdcontainer">
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    // type={isRevealPwd ? "text" : "password"}
                                                    type='password'
                                                    placeholder="enter password"
                                                    name='password'
                                                    value={data.password}
                                                    onChange={handleChange}
                                                />

                                            </CInputGroup>
                                        </div> <br />
                                        <CRow>
                                            <CCol xs={12} >
                                                <CButton style={{ background: '#3C4B64' }} className="px-4" type='submit'  >
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white  py-4  " style={{ width: '44%', background: '#3C4B64' }}>
                                <img src={loginimg} alt="login img" />
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer autoClose={2000} />

        </div>
    )
}

export default Loginuser