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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePassword } from "react-icons/md";

function resetpswd() {

  var history = useHistory();

  const [data, setData] = useState({
    official_email: '',
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

    var token = `Bearer ${localStorage.getItem('token')}`

    var passData = {
      official_email: data.official_email,
      password: data.password,
      confirmpassword: data.confirmpassword,
      // login_as: "admin"
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/userlogin/userresetpassword`,
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
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      })

    // Validate the form data
    const newErrors = {};

    if (!data.official_email) {
      newErrors.official_email = 'Email is required';
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
                        placeholder="enter official_email"
                        name='official_email'
                        value={data.official_email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {errors.official_email && <div className="error">{errors.official_email}</div>}
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
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-4  " style={{ width: '44%', background: '#3C4B64' }}>
                {/* <CCardBody className="text-center"> */}

                {/* <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p> */}

                <img src={loginimg} alt="login img" />

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

export default resetpswd