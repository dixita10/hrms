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
import { BiTimeFive, BiCommentCheck, BiRupee } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";

const Editsalary = () => {

    const getsalary = () => {

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/salary/findonesalary/${id}`,
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
        getsalary()
    }, [])


    var history = useHistory()

    const { id } = useParams()
    console.log(id)

    const [data, setdata] = useState([])

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var token = `Bearer ${localStorage.getItem('token')}`
        var passData = {
            salary_id: id,
            user_id: data.user_id,
            salary: data.salary,
            bank_detail: data.bank_detail,
            // username: data.username,
        }
        console.log(passData);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/salary/updatesalary/${id}`,
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
                    history.push("/salary")
                    console.log(response);
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
                                        <h3 className='text-center'>Edit Salary</h3><br />
                                        {/* <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="user_id" autoComplete="user_id" name="user_id"
                                                value={data?.user_id}
                                                onChange={handleChange} />
                                        </CInputGroup> */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BiRupee />
                                            </CInputGroupText>
                                            <CFormInput placeholder="salary" autoComplete="salary" name="salary"
                                                value={data?.salary}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BsBank2 />
                                            </CInputGroupText>
                                            <CFormInput placeholder="bank_detail" autoComplete="bank_detail" name="bank_detail"
                                                value={data?.bank_detail}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        {/* <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="username" autoComplete="username" name="username"
                                                value={data?.username}
                                                onChange={handleChange} />
                                        </CInputGroup> */}


                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Edit Salary</CButton>
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

export default Editsalary