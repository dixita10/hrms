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
const Edittech = () => {

  const [data, setData] = useState([])


  // console.log(data1[0].admin_name);

  const Gettechnology = () => {

    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findonetechnology/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response.data[0]);
        if (response.status === 200) {
          setData(response.data[0])
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    Gettechnology()
  }, [])



  const { id } = useParams();
  // console.log(id);

  var history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    var token = localStorage.getItem('token')

    var passData = {
      tec_name: data.tec_name,
      dep_id: data.dep_id,
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/technology/updatetechnology/${id}`,
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
          history.push("/technology")
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
                    <h3 className='text-center'>Edit Technology</h3><br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="tec_name" autoComplete="tec_name" name="tec_name"
                        value={data.tec_name}
                        onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <BiCommentCheck />
                      </CInputGroupText>
                      <CFormInput placeholder="dep_id" autoComplete="dep_id" name="dep_id"
                        value={data.dep_id}
                        onChange={handleChange} />
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton color="success" type='submit'>Edit Technology</CButton>
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

export default Edittech