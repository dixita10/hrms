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

const Login = () => {

  var history = useHistory();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // const [isRevealPwd, setIsRevealPwd] = useState(false);

  }
  const handleSubmit = (e) => {
    var token = localStorage.getItem('token')

    e.preventDefault();

    var passData = {
      email: data.email,
      password: data.password,
      // login_as: "admin"
    }


    axios({
      method: 'POST',
      url: "http://localhost:1010/auth/login",
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
          history.push("/dashboard");
          localStorage.setItem('token', (response.data.token))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // let initialValues = { email: "", password: "", }
  // const [isValue, setIsValue] = useState(initialValues);

  //   axios.post("http://52.66.201.113/auth/login", data)
  //     .then(response => {
  //       console.log(response)
  //       if (response.data.status === true) {
  //         toast.success(response.data.message)
  //       }
  //       const { token } = response.data.data
  //       console.log(token)
  //       localStorage.setItem("admin_token", token)
  //       history("/dashboard");

  //     })
  //     .catch(error => {
  //       console.log(error)
  //       if (error.response.data.status === false) {
  //         toast.error(error.response.data.message);
  //       }
  //     })

  // }
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setIsValue({ ...isValue, [name]: value })
  //   console.log(isValue);
  // }



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
                          value={data.password.trim()}
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
