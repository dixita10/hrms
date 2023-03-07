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



const Login = () => {


  let initialValues = { email: "", password: "", }
  const [isValue, setIsValue] = useState(initialValues);
  const [isRevealPwd, setIsRevealPwd] = useState(false);



  const history = useHistory();
  const handleSubmit = () => {
    // e.preventDefault();
    let data = {
      email: isValue.email,
      password: isValue.password,
      login_as: "admin"
    }

    axios.post("http://52.66.201.113/auth/login", data)
      .then(response => {
        console.log(response)
        if (response.data.status === true) {
          toast.success(response.data.message)
        }
        const { token } = response.data.data
        console.log(token)
        localStorage.setItem("admin_token", token)
        history.push("/dashboard");
      })
      .catch(error => {
        console.log(error)
        if (error.response.data.status === false) {
          toast.error(error.response.data.message);
        }
      })

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsValue({ ...isValue, [name]: value })
    console.log(isValue);
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type='email'
                        placeholder="enter email"
                        // autoComplete="id"
                        name='email'
                        value={isValue.email}
                        onChange={handleChange}
                      />

                    </CInputGroup>

                    <div className="pwdcontainer">
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={isRevealPwd ? "text" : "password"}
                          placeholder="enter password"
                          name='password'
                          value={isValue.password.trim()}
                          onChange={handleChange}
                        />

                      </CInputGroup>
                    </div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton style={{ background: '#3C4B64' }} className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <Link to="/register">
                        Register Now!
                      </Link>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
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

export default Login
