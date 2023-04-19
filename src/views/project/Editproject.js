import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
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
import { toast, ToastContainer } from 'react-toastify';
import { BiTimeFive, BiCommentCheck } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { GrStatusGood } from "react-icons/gr";
import { DiTechcrunch } from "react-icons/di";
import { TbFileDescription } from "react-icons/tb";

const Editproject = () => {


  const getproject = () => {

    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/project/findoneproject/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log("response", response);
          setData(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    getproject()
  }, [])


  const { id } = useParams()

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
      url: `${process.env.REACT_APP_URL}/project/updateproject/${id}`,
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



  return (
    <div>
      <div className="bg-light d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
              <CCard className="mx-4">
                <CCardBody className="p-4">

                  <CForm onSubmit={handleSubmit} >
                    <h3 className='text-center'>Edit Project</h3><br />
                    {/* <Datetime /> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="user_id" autoComplete="user_id" name="user_id"
                        value={data.user_id}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <AiOutlineProject />
                      </CInputGroupText>
                      <CFormInput placeholder="pro_name" autoComplete="pro_name" name="pro_name"
                        value={data.pro_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <SlCalender />
                      </CInputGroupText>
                      <CFormInput type='datetime-local' placeholder="start_date" autoComplete="start_date" name="start_date"
                        value={data.start_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <SlCalender />
                      </CInputGroupText>
                      <CFormInput type='datetime-local' placeholder="end_date" autoComplete="end_date" name="end_date"
                        value={data.end_date}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <GrStatusGood />
                      </CInputGroupText>
                      <CFormInput placeholder="status" autoComplete="status" name="status"
                        value={data.status}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <DiTechcrunch />
                      </CInputGroupText>
                      <CFormInput placeholder="description" autoComplete="description" name="description"
                        value={data.description}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="tec_id" autoComplete="tec_id" name="tec_id"
                        value={data.tec_id}
                        onChange={handleChange} />
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton color="success" type='submit'>Edit Project</CButton>
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

export default Editproject