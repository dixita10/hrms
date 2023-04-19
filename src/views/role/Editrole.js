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

const Editrole = () => {

    const getrole = () => {

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/role/findonerole/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response", response);
                    setdata(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getrole()
    }, [])



    var history = useHistory()

    const { id } = useParams()
    // console.log(id)

    const [data, setdata] = useState([])

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            role_name: data.role_name,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/role/updaterole/${id}`,
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
                    history.push("/role")
                    // console.log(response);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }


    return (
        <div>
            <div>
                <div className="bg-light d-flex flex-row align-items-center">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
                                <CCard className="mx-4">
                                    <CCardBody className="p-4">

                                        <CForm onSubmit={handleSubmit} >
                                            <h3 className='text-center'>Edit Role</h3><br />
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="role_name" autoComplete="role_name" name="role_name"
                                                    value={data?.role_name}
                                                    onChange={handleChange} />
                                            </CInputGroup>


                                            <div className="d-grid">
                                                <CButton color="success" type='submit'>Edit Role</CButton>
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
        </div>
    )
}

export default Editrole