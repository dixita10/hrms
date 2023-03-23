import axios from 'axios'
import React from 'react'
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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Addstate = () => {
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  var history = useHistory();

  const [data, setData] = useState({
    state_name: '',
    country_name: '',
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = localStorage.getItem('token')

    var passData = {
      state_name: data.state_name,
      country_name: data.country_name,
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/state/addstate`,
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
          history.push("/state")
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
                    <h3 className='text-center'>Add State</h3><br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="state_name" autoComplete="state_name" name="state_name"
                        value={data.state_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <BiCommentCheck />
                      </CInputGroupText>
                      <CFormInput placeholder="country_name" autoComplete="country_name" name="country_name"
                        value={data.country_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
                    </CInputGroup>


                    <div className="d-grid">
                      <CButton color="success" type='submit'>Add State</CButton>
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

export default Addstate