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
import resentimage from '../../../assets/images/reset.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePassword } from "react-icons/md";

const Passwordreset = () => {

    var history = useHistory();

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // const [isRevealPwd, setIsRevealPwd] = useState(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        var passData = {
            email: data.email,
            password: data.password,
            confirmpassword: data.confirmpassword,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/userlogin/simpleresetpassword`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success(response.data.message)
                    history.push("/login");
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // Validate the form data
        const newErrors = {};

        if (!data.email) {
            newErrors.email = 'Email is required';
        }

        if (!data.password) {
            newErrors.password = 'Password is required';
        }

        if (data.password !== data.confirmpassword) {
            newErrors.confirmpassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Submit the form
        }
    }

    return (
        <div>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center loginform"  >
                        <CCol md={8} style={{ width: '50rem' }}>
                            <CCardGroup >
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Reset Password</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type='email'
                                                    placeholder="enter email"
                                                    name='email'
                                                    value={data.email}
                                                    onChange={handleChange}
                                                />
                                            </CInputGroup>
                                            {errors.email && <div className="error">{errors.email}</div>}
                                            <div className="pwdcontainer">
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <MdOutlinePassword />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type='password'
                                                        placeholder="enter password"
                                                        name='password'
                                                        value={data.password.trim()}
                                                        onChange={handleChange}
                                                    />
                                                </CInputGroup>
                                                {errors.password && <div className="error">{errors.password}</div>}

                                                <CInputGroup className="mb-4">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilLockLocked} />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type='password'
                                                        placeholder="enter confirmpassword"
                                                        name='confirmpassword'
                                                        value={data.confirmpassword.trim()}
                                                        onChange={handleChange}
                                                    />
                                                </CInputGroup>
                                                {errors.confirmpassword && <div className="error">{errors.confirmpassword}</div>}
                                            </div>
                                            <br />
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton style={{ background: '#3C4B64' }} className="px-4" onClick={handleSubmit}>
                                                        Done
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                                <CCard className="text-white  py-4  " style={{ width: '44%', background: '#3C4B64' }}>
                                    <img src={resentimage} alt="login img" />

                                    {/* </CCardBody> */}
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
                <ToastContainer autoClose={2000} />

            </div>
        </div>
    )
}

export default Passwordreset