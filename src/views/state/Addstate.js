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


const Addstate = () => {

  const [country, setCountry] = useState([])

  const Countrie = () => {

    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/country/findallcountry`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        setCountry(response.data.data)
      })

  }
  // console.log(country);

  useEffect(() => {
    Countrie()
  }, [])


  var history = useHistory();

  const [data, setData] = useState([])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = localStorage.getItem('token')

    var passData = {
      state_name: data.state_name,
      country_id: data.country_id,
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
          console.log(response);
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
                        <GiWorld />
                      </CInputGroupText>
                      <CFormInput placeholder="state_name" autoComplete="state_name" name="state_name"
                        value={data.state_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <BiCommentCheck />
                      </CInputGroupText>
                      <CFormInput placeholder="country_name" autoComplete="country_name" name="country_name"
                        value={data.country_name}
                        onChange={handleChange} />
                    </CInputGroup> */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <GiWorld />
                      </CInputGroupText>
                      <select className="form-select" aria-label="Default select example" value={country.country_id} onChange={handleChange} name="country_id">
                        <option selected>choose country name</option>
                        {country.map((country, index) => {
                          return (
                            <option key={index} value={country.country_id}>{country.country_name}</option>
                          )
                        })
                        }
                      </select>

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
    </div >
  )
}

export default Addstate