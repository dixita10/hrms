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

                if (response.status === 200) {
                    toast.success(response.data.message)
                    localStorage.setItem('token', token)
                    history.push("/loggeduser");
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
        // <div>
        //     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        //         <CContainer>
        //             <CRow className="justify-content-center"  >
        //                 <CCol md={8} style={{ width: '50rem' }}>
        //                     <CCard className="p-4">
        //                         <CCardBody>
        //                             <CForm onSubmit={handleSubmit} >
        //                                 <h1> User Login</h1>
        //                                 <p className="text-medium-emphasis">Create your account</p>
        //                                 <CInputGroup className="mb-3">
        //                                     <CInputGroupText>@</CInputGroupText>
        //                                     <CFormInput placeholder="Email" autoComplete="email" name="email"
        //                                         value={data.email}
        //                                         onChange={handleChange} />
        //                                 </CInputGroup>
        //                                 <CInputGroup className="mb-3">
        //                                     <CInputGroupText>
        //                                         <CIcon icon={cilLockLocked} />
        //                                     </CInputGroupText>
        //                                     <CFormInput
        //                                         type="password"
        //                                         placeholder="Password"
        //                                         autoComplete="password"
        //                                         name="password"
        //                                         value={data.password}
        //                                         onChange={handleChange}
        //                                     />
        //                                 </CInputGroup>

        //                                 <div className="d-grid">
        //                                     <CButton color="success" type='submit'>Create Account</CButton>
        //                                 </div>
        //                             </CForm>
        //                             {/* <Link to="/loggeruser">Login</Link> */}
        //                         </CCardBody>

        //                     </CCard>
        //                 </CCol>
        //             </CRow>

        //         </CContainer>
        //         <ToastContainer autoClose={2000} />

        //     </div >
        // </div>

        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center loginform"  >
                    <CCol md={8} style={{ width: '50rem' }}>
                        <CCardGroup >
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit} >
                                        <h1 style={{ color: '#3C4B64' }}> User Login</h1>
                                        <p className="text-medium-emphasis" >Sign In to your account</p>
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
                                        </div>
                                        <CRow>
                                            {/* <div className="d-grid">
                                                <CButton color="success" ></CButton>
                                            </div> */}
                                            <CCol xs={12} style={{ textAlign: 'center' }}>
                                                <CButton style={{ background: '#3C4B64' }} className="px-4" type='submit' >
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