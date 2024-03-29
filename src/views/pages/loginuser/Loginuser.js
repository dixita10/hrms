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
import { MdOutlineAlternateEmail } from "react-icons/md";

const Loginuser = () => {

    var history = useHistory();

    const [user, setUser] = useState([])

    const [data, setData] = useState({
        official_email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        official_email: '',
        password: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        var passData = {
            official_email: data.official_email,
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
                    console.log(response);
                    toast.success(response.data.message)
                    localStorage.setItem('token', token)

                    var token = `Bearer ${localStorage.getItem('token')}`

                    axios({
                        method: 'GET',
                        url: `${process.env.REACT_APP_URL}/userlogin/loggedUser`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                            Accept: "application/json",
                        },
                    })
                        .then((response) => {
                            console.log(response);
                            var username = response.data.user.username
                            var user_id = response.data.user.user_id
                            // console.log();
                            if (response.status === 200) {
                                localStorage.setItem('username', username)
                                localStorage.setItem('role_id', role_id)
                                setUser(response.data.user.username)
                                localStorage.setItem('user_id', user_id)
                                history.push("/home");
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 401) {
                    toast.error(error.response.data.message);
                }
                // if (error.response.status === false) {
                //   toast.error(error.response.data.message.contact) 
                // }
                // if (error.response.status === false) {
                //   toast.error(error.response.data.message.official_email)
                // }
                // if (error.response.data.status === 500) {
                //   toast.error("phone no dublicated")
                // }
            })

        const MIN_PASSWORD_LENGTH = 6;
        const MAX_PASSWORD_LENGTH = 20;

        const newErrors = {};
        if (!data.official_email) {
            newErrors.official_email = 'Email is required';
        }
        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (data.password.length < MIN_PASSWORD_LENGTH || data.password.length > MAX_PASSWORD_LENGTH) {
            newErrors.passwordLength = `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters .`;
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // submit data to server or perform any other action
        }

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
                                                <MdOutlineAlternateEmail />
                                            </CInputGroupText>
                                            <CFormInput
                                                type='email'
                                                placeholder="enter official_email"
                                                // autoComplete="id"
                                                name='official_email'
                                                value={data.official_email}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        {errors.official_email && <div className="error">{errors.official_email}</div>}<br />
                                        <div className="pwdcontainer">
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type='password'
                                                    placeholder="enter password"
                                                    name='password'
                                                    value={data.password}
                                                    onChange={handleChange}
                                                />
                                            </CInputGroup>
                                            {errors.password && <div className="error">{errors.password}</div>}
                                            {errors.passwordLength && <div className="error">{errors.passwordLength}</div>}
                                        </div> <br />
                                        <a href={"/forgotpassword"} className='forgotpswd'>Forgot Password ?</a>
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