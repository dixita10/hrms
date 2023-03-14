import React, { useState, useEffect } from 'react'
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
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  var history = useHistory();

  const [data, setData] = useState({
    admin_name: '',
    email: '',
    contact: '',
    user_name: '',
    password: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.success('successful', { autoClose: 3000 })

    var passData = {
      admin_name: data.admin_name,
      email: data.email,
      contact: data.contact,
      user_name: data.user_name,
      password: data.password
    }
    axios({
      method: 'POST',
      url: "http://localhost:1010/auth/register",
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message)
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === false) {
        //   toast.error(error.response.data.message.contact)
        // }
        // if (error.response.status === false) {
        //   toast.error(error.response.data.message.email)
        // }
        // if (error.response.data.status === 500) {
        //   toast.error("phone no dublicated")
        // }
        // toast.warning(error.response.data.message);
      })
  }
  // console.log("data", data);

  // const navigate = useNavigate();
  // let history = useHistory();

  // const initialValues = {
  //   name: "",
  //   email: "",
  //   phno: "",
  //   dob: "",
  //   password: "",
  // };
  // const [isValue, setIsValue] = useState(initialValues);
  // const [errors, setErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // console.log(isValue)
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setIsValue({ ...isValue, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors(validate(isValue));
  //   setIsSubmit(true);

  // let passedData = {
  //   name: isValue.name,
  //   email: isValue.email,
  //   phno: isValue.phno,
  //   dob: isValue.dob,
  //   password: isValue.password,
  //   role: "admin",
  // };

  //   axios
  //     .post(
  //       "http://52.66.201.113/auth/register",
  //       passedData
  //     )
  //     .then((response) => {
  //       console.log(response.data)
  //       if (response.data.status === true) {
  //         toast.success(response.data.message)
  //         history.push("/");
  //         const { token } = response.data.data;
  //         localStorage.setItem("admin_token", token);
  //         // toast.success("Registration Successful")
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.data.status === false) {
  //         toast.error(error.response.data.message.phno)
  //       }
  //       if (error.response.data.status === false) {
  //         toast.error(error.response.data.message.email)
  //       }
  //       if (error.response.data.status === 500) {
  //         toast.error("phone no dublicated")
  //       }
  //       toast.warning(error.response.data.message);
  //     });
  // };

  // const validate = (values) => {
  //   const error = {};
  //   const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  //   if (!values.name) {
  //     error.name = "name is required";
  //   }
  //   if (!values.phno) {
  //     error.phno = "phno is required";
  //   }
  //   if (values.phno.length !== 10) {
  //     error.phno = "phno must be 10 digits";
  //   }
  //   if (!values.dob) {
  //     error.dob = "dob is required";
  //   }
  //   if (!values.email) {
  //     error.email = "email is required";
  //   } else if (!regex.test(values.email)) {
  //     error.email = "email is not valid format!";
  //   }
  //   if (!values.password) {
  //     error.password = "password is required";
  //   }
  //   return error;
  // };
  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && isSubmit) {
  //   }
  // }, [errors, isSubmit]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
            <CCard className="mx-4">
              <CCardBody className="p-4">

                <CForm onSubmit={handleSubmit} >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Adminname" autoComplete="adminname" name="admin_name"
                      value={data.admin_name}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" name="email"
                      value={data.email}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Contact"
                      autoComplete="contact"
                      name="contact"
                      value={data.contact}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" name="user_name"
                      value={data.user_name}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                  </div>
                </CForm>
                Do you have already account ? <Link to="/login">Login</Link>
              </CCardBody>

            </CCard>
          </CCol>
        </CRow>

      </CContainer>
    </div >
  )
}

export default Register
