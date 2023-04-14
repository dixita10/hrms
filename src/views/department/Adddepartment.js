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
import { toast, ToastContainer } from 'react-toastify';
import { TbFileDescription } from "react-icons/tb";
import { BsBuildingCheck } from "react-icons/bs";

const Adddepartment = () => {
    var history = useHistory();

    const [data, setData] = useState({
        dep_name: '',
        description: '',
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            dep_name: data.dep_name,
            description: data.description,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/department/adddepartment`,
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
                    history.push("/department")
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
                                        <h3 className='text-center'>Add Department</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BsBuildingCheck />
                                            </CInputGroupText>
                                            <CFormInput placeholder="dep_name" autoComplete="dep_name" name="dep_name"
                                                value={data.dep_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <TbFileDescription />
                                            </CInputGroupText>
                                            <CFormInput placeholder="description" autoComplete="description" name="description"
                                                value={data.description}
                                                onChange={handleChange} />
                                        </CInputGroup>

                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Department</CButton>
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

export default Adddepartment