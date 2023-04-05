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
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked, cilUser, cilPhone
} from '@coreui/icons'
import { toast, ToastContainer } from 'react-toastify';
import { BiTimeFive, BiCommentCheck } from "react-icons/bi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Addproject = () => {


  var history = useHistory();

  const [data, setData] = useState({
    user_id: '',
    pro_name: '',
    start_date: '',
    end_date: '',
    status: '',
    description: '',
    tec_id: '',
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = `Bearer ${localStorage.getItem('token')}`

    var passData = {
      user_id: data.user_id,
      pro_name: data.pro_name,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      description: data.description,
      tec_id: data.tec_id,
    }
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/project/addproject`,
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
          history.push("/project")
          // console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
      })
  }
  const [user, setUser] = useState([])

  const userid = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findalluser`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        setUser(response.data.data)
      })
  }
  const [tech, setTech] = useState([])

  const techid = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findalltechnology`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response);
        setTech(response.data.data)
      })
  }

  useEffect(() => {
    userid(),
      techid()
  }, [])

  return (
    <div>
      <div className="bg-light d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
              <CCard className="mx-4">
                <CCardBody className="p-4">

                  <CForm onSubmit={handleSubmit} >
                    <h3 className='text-center'>Add Project</h3><br />
                    {/* <Datetime /> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <select className="form-select" aria-label="Default select example" value={user.user_id} onChange={handleChange} name="user_id">
                        <option selected>choose user name</option>
                        {user.map((user, index) => {
                          return (
                            <option key={index} value={user.user_id}>{user.username}</option>
                          )
                        })
                        }
                      </select>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="pro_name" autoComplete="pro_name" name="pro_name"
                        value={data.pro_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='date' placeholder="start_date" autoComplete="start_date" name="start_date"
                        value={data.start_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='date' placeholder="end_date" autoComplete="end_date" name="end_date"
                        value={data.end_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      {/* <CFormInput placeholder="status" autoComplete="status"  /> */}
                      <select className="form-select" aria-label="Default select example" name="status"
                        value={data.status}
                        onChange={handleChange}>
                        <option selected>Select Status</option>
                        <option>in_progress</option>
                        <option>on_hold</option>
                        <option>completed</option>
                      </select>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="description" autoComplete="description" name="description"
                        value={data.description}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <select className="form-select" aria-label="Default select example" value={tech.tec_id} onChange={handleChange} name="tec_id">
                        <option selected>Choose Technology Name</option>
                        {tech.map((tech, index) => {
                          return (
                            <option key={index} value={tech.tec_id}>{tech.tec_name}</option>
                          )
                        })
                        }
                      </select>
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton color="success" type='submit'>Add Project</CButton>
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

export default Addproject