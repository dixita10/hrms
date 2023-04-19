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
import { GiWorld, GiModernCity } from "react-icons/gi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDriveFileRenameOutline, MdOutlineAlternateEmail, MdPassword, MdOutlinePhoneInTalk } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { BsPersonBoundingBox, BsBuildingGear } from "react-icons/bs";

import CIcon from '@coreui/icons-react'
import {
  cilLockLocked, cilUser, cilPhone
} from '@coreui/icons'
const Adduser = () => {

  var history = useHistory();

  const [city, setCity] = useState([])
  const [role, setRole] = useState([])
  const [department, setDepartment] = useState([])


  const City = () => {

    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/city/findallcity`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        setCity(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const Role = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/role/findallrole`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        setRole(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const Department = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/department/findalldepartment`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        setDepartment(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    City();
    Role();
    Department()
  }, [])

  const [data, setData] = useState([])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const [image, setImage] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = `Bearer ${localStorage.getItem('token')}`

    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("city_id", data.city_id);
    formData.append("address", data.address);
    formData.append("birth_date", data.birth_date);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("role_id", data.role_id);
    formData.append("dep_id", data.dep_id);
    formData.append("contact", data.contact);
    formData.append("image", image);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/user/adduser`,
      // data: passData,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // setData(response.data)
          toast.success(response.data.message)
          history.push("/user")
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
                        <MdPassword />
                      </CInputGroupText>
                      <CFormInput placeholder="password" autoComplete="password" name="password" type='password'
                        value={data.password}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GiModernCity />
                      </CInputGroupText>
                      <select className="form-select" aria-label="Default select example" value={city.city_id} onChange={handleChange} name="city_id">
                        <option selected>choose City name</option>
                        {city.map((city, index) => {
                          return (
                            <option key={index} value={city.city_id}>{city.city_name}</option>
                          )
                        })
                        }
                      </select>
                      {/* <CFormInput placeholder="city_id" autoComplete="city_id" name="city_id"
                        value={data.city_id}
                        onChange={handleChange} /> */}
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
                        onChange={handleChange} dateFormat="yyyy-MM-dd" />
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
                      {/* <RadioGroup labelText='Basic Usage' id='basicGroup' name='basic' onChange={handleChange}>
                        <Radio
                          id='radio1'
                          labelText='Option one label'
                          value={data1.female} />

                        <Radio
                          id='radio2'
                          labelText='Option two label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines'
                          value={data1.male} />
                      </RadioGroup> */}
                      <CFormInput placeholder="gender" autoComplete="gender" name="gender"
                        value={data.gender}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>

                      <select className="form-select" aria-label="Default select example" value={role.role_id} onChange={handleChange} name="role_id">
                        <option selected>choose Role name</option>
                        {role.map((role, index) => {
                          return (
                            <option key={index} value={role.role_id}>{role.role_name}</option>
                          )
                        })
                        }
                      </select>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <BsBuildingGear />
                      </CInputGroupText>
                      <select className="form-select" aria-label="Default select example" value={department.dep_id} onChange={handleChange} name="dep_id">
                        <option selected>choose Department name</option>
                        {department.map((department, index) => {
                          return (
                            <option key={index} value={department.dep_id}>{department.dep_name}</option>
                          )
                        })
                        }
                      </select>
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
                        value={image.image}
                        onChange={(event) => {
                          setImage(event.target?.files[0])
                        }} />
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