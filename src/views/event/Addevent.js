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
import { MdOutlineCelebration } from "react-icons/md";
import { SlCalender, SlNote } from "react-icons/sl";
const Addevent = () => {


    var history = useHistory();

    const [data, setData] = useState({
        event_tittle: '',
        start_date: '',
        end_date: '',
        description: '',

    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            event_tittle: data.event_tittle,
            start_date: data.start_date,
            end_date: data.end_date,
            description: data.description,

        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/event/addevent`,
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
                    history.push("/event")
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
                                        <h3 className='text-center'>Add Event</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <MdOutlineCelebration />
                                            </CInputGroupText>
                                            <CFormInput placeholder="event_tittle" autoComplete="event_tittle" name="event_tittle"
                                                value={data.event_tittle}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <SlCalender />
                                            </CInputGroupText>
                                            <CFormInput type="date" placeholder="start_date" autoComplete="start_date" name="start_date"
                                                value={data.start_date}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <SlCalender />
                                            </CInputGroupText>
                                            <CFormInput type="date" placeholder="end_date" autoComplete="end_date" name="end_date"
                                                value={data.end_date}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <SlNote />
                                            </CInputGroupText>
                                            <CFormInput placeholder="description" autoComplete="description" name="description"
                                                value={data.description}
                                                onChange={handleChange} />
                                        </CInputGroup>

                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Event</CButton>
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

export default Addevent