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
import Forgot from "../../../assets/images/forgot.avif";
import { GrFormNextLink } from "react-icons/gr";
import Nextarrow from "../../../assets/images/nextarrow.svg"

const Forgotpassword = () => {

    var history = useHistory();

    const [data, setData] = useState({
        official_email: '',
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // const [isRevealPwd, setIsRevealPwd] = useState(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.official_email) {
            setErrors({ official_email: 'Email is required' });
            return;
        }

        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            official_email: data.official_email,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/userlogin/forgotpassword`,
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
                    toast.success(response.data.message)
                    history.push("/passwordreset");
                }
            })
            .catch((error) => {
                console.log(error);
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
                                    <CForm>
                                        <h1>Forgot Password</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type='email'
                                                placeholder="enter official_email"
                                                name='official_email'
                                                value={data.official_email}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        {errors.official_email && <div className="error">{errors.official_email}</div>}
                                        <br />
                                        <CRow>
                                            <CCol style={{ display: "flex", justifyContent: 'end' }}>
                                                <CButton style={{ background: 'white', color: "black", borderRadius: '50px', border: "1px solid black" }} className="px-4 forgotpswd" onClick={handleSubmit}>
                                                    Next <GrFormNextLink className='forgotnext' />
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white  py-4  " style={{ width: '44%', background: '#3C4B64' }}>
                                <img src={Forgot} alt="login img" />

                                {/* </CCardBody> */}
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer autoClose={2000} />

        </div>
    )
}

export default Forgotpassword