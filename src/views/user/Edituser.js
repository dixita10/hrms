import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiWorld } from "react-icons/gi";
import { MdDriveFileRenameOutline, MdOutlineAlternateEmail, MdPassword, MdOutlinePhoneInTalk } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { BsPersonBoundingBox, BsBuildingGear } from "react-icons/bs";


const Edituser = () => {

  const { id } = useParams()
  // console.log(id)

  var history = useHistory()

  const [data, setdata] = useState([])

  const getUser = () => {

    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findoneuser/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response.data.data);
        if (response.status === 200) {
          setdata(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getUser()
  }, [])


  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = `Bearer ${localStorage.getItem('token')}`

    var formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('username', data.username)
    formData.append('city_id', data.city_id)
    formData.append('address', data.address)
    formData.append('birth_date', data.birth_date)
    formData.append('age', data.age)
    formData.append('gender', data.gender)
    formData.append('role_id', data.role_id)
    formData.append('dep_id', data.dep_id)
    formData.append('contact', data.contact)
    formData.append('image', e.target.elements.image.files[0])

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/user/updateuser/${id}`,
      data: formData,
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
          history.push("/user")
        }
      })
      .catch((error) => {
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
                    <h3 className='text-center'>Edit User</h3><br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <MdDriveFileRenameOutline />
                      </CInputGroupText>
                      <CFormInput placeholder="name" autoComplete="name" name="name"
                        value={data.name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <MdOutlineAlternateEmail />
                      </CInputGroupText>
                      <CFormInput placeholder="email" autoComplete="email" name="email"
                        value={data.email}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <BiUser />
                      </CInputGroupText>
                      <CFormInput placeholder="username" autoComplete="username" name="username"
                        value={data.username}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <FaRegAddressCard />
                      </CInputGroupText>
                      <CFormInput placeholder="address" autoComplete="address" name="address"
                        value={data.address}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <SlCalender />
                      </CInputGroupText>
                      <CFormInput type="date" placeholder="birth_date" autoComplete="birth_date" name="birth_date"
                        value={data.birth_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GrUserManager />
                      </CInputGroupText>
                      <CFormInput placeholder="age" autoComplete="age" name="age"
                        value={data.age}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <BsPersonBoundingBox />
                      </CInputGroupText>
                      <CFormInput placeholder="gender" autoComplete="gender" name="gender"
                        value={data.gender}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <MdOutlinePhoneInTalk />
                      </CInputGroupText>
                      <CFormInput placeholder="contact" autoComplete="contact" name="contact"
                        value={data.contact}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <AiOutlineFileImage />
                      </CInputGroupText>
                      <CFormInput placeholder="image" autoComplete="image" name="image" type='file'
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" type='submit'>Edit User</CButton>
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

export default Edituser