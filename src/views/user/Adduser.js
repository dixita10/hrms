import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-dropdown/style.css';
import { GiWorld } from "react-icons/gi";


const Adduser = () => {



  var history = useHistory();

  const [data, setData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    city_id: '',
    address: '',
    birth_date: '',
    age: '',
    gender: '',
    role_id: '',
    contact: '',
    image: '',

  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = localStorage.getItem('token')

    var passData = {
      name: data.role_name,
      email: data.email,
      username: data.username,
      password: data.password,
      city_id: data.city_id,
      address: data.address,
      birth_date: data.birth_date,
      age: data.age,
      gender: data.gender,
      role_id: data.role_id,
      contact: data.contact,
      image: data.image,
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/user/adduser`,
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          toast.success(response.data.message)
          // history.push("/user")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
      })
  }


  return (
    <div>
      <div className="bg-light d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
              <CCard className="mx-4">
                <CCardBody className="p-4">

                  <CForm onSubmit={handleSubmit} >
                    <h3 className='text-center'>Add User</h3><br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="name" autoComplete="name" name="name"
                        value={data.name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="email" autoComplete="email" name="email"
                        value={data.email}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="username" autoComplete="username" name="username"
                        value={data.username}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="password" autoComplete="password" name="password"
                        value={data.password}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="city_id" autoComplete="city_id" name="city_id"
                        value={data.city_id}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="address" autoComplete="address" name="address"
                        value={data.address}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput type="date" placeholder="birth_date" autoComplete="birth_date" name="birth_date" 
                        value={data.birth_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="age" autoComplete="age" name="age"
                        value={data.age}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="gender" autoComplete="gender" name="gender"
                        value={data.gender}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="role_id" autoComplete="role_id" name="role_id"
                        value={data.role_id}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="contact" autoComplete="contact" name="contact"
                        value={data.contact}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="image" autoComplete="image" name="image"
                        value={data.image}
                        onChange={handleChange} />
                    </CInputGroup>


                    <div className="d-grid">
                      <CButton color="success" type='submit'>Add User</CButton>
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
  )
}

export default Adduser