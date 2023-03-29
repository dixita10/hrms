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
import { GiWorld } from "react-icons/gi";


const Addcity = () => {

    const [state, setState] = useState([])

    // const handlecountry = (e) => {
    //     setCountry({ ...state, [e.target.name]: e.target.value })
    // }

    const State = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/state/findallstate`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                setState(response.data.data)
            })

    }
    // console.log(state);

    useEffect(() => {
        State()
    }, [])

    var history = useHistory();

    const [data, setData] = useState([])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            city_name: data.city_name,
            state_id: data.state_id,
            // state_name: data.state_name,
        }
        console.log(passData);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/city/addcity`,
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
                    history.push("/city")
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
                                        <h3 className='text-center'>Add City</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <GiWorld />
                                            </CInputGroupText>
                                            <CFormInput placeholder="city_name" autoComplete="city_name" name="city_name"
                                                value={data.city_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <GiWorld />
                                            </CInputGroupText>
                                            <select className="form-select" aria-label="Default select example" value={state.state_id} onChange={handleChange} name="state_id">
                                                <option selected>choose State name</option>
                                                {state.map((state, index) => {
                                                    return (
                                                        <option key={index} value={state.state_id}>{state.state_name}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </CInputGroup>
                                        {/* <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <BiCommentCheck />
                                            </CInputGroupText>
                                            <CFormInput placeholder="state_id" autoComplete="state_id" name="state_id"
                                                value={data.state_id}
                                                onChange={handleChange} />
                                        </CInputGroup> */}

                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add City</CButton>
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

export default Addcity