import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
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


const Addtech = () => {

    const [department, setDepartment] = useState([])

    const Department = () => {

        var token = localStorage.getItem('token')

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
                // console.log(response.data.data);
                setDepartment(response.data.data)
            })

    }

    useEffect(() => {
        Department()
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
            tec_name: data.tec_name,
            dep_id: data.dep_id,
            // dep_name: data.dep_name,
        }

        console.log(passData);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/technology/addtechnology`,
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
                                        <h3 className='text-center'>Add Technology</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="tec_name" autoComplete="tec_name" name="tec_name"
                                                value={data.tec_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        {/* <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="dep_id" autoComplete="dep_id" name="dep_id"
                                                value={data.dep_id}
                                                onChange={handleChange} />
                                        </CInputGroup> */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <select className="form-select" aria-label="Default select example" value={department.dep_id} name="dep_id" onChange={handleChange} >
                                                <option selected>choose department name</option>
                                                {department.map((department, index) => {
                                                    return (
                                                        <option key={index} value={department.dep_id}>{department.dep_name}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                            {/* <CFormInput placeholder="dep_name" autoComplete="dep_name" name="dep_name"
                                                value={data.dep_name}
                                                onChange={handleChange} /> */}
                                        </CInputGroup>



                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Technology</CButton>
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

export default Addtech