import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
import { RiBankFill } from "react-icons/ri";
import { TbNumbers, TbFileTypography } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiModernCity } from "react-icons/gi";
import { MdOutline123 } from "react-icons/md";

const Addbankdetail = () => {

    var history = useHistory();

    const [data, setData] = useState({
        user_id: '',
        bank_name: '',
        acc_no: '',
        branch_name: '',
        city_id: '',
        ifsc_code: '',
        acc_type: '',

    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            user_id: data.user_id,
            bank_name: data.bank_name,
            acc_no: data.acc_no,
            branch_name: data.branch_name,
            city_id: data.city_id,
            ifsc_code: data.ifsc_code,
            acc_type: data.acc_type,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/bankdetail/addbankdetail`,
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
                    history.push("/bankdetail")
                    // console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }


    const [user, setUser] = useState([])

    const userid = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user/findalluser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                setUser(response.data.data)
            })
    }

    useEffect(() => {
        userid();
        City()
    }, [])

    const [city, setCity] = useState([])

    const City = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/city/findallcity`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                setCity(response.data.data)
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
                                        <h3 className='text-center'>Add Bank Details</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            {/* <CFormInput placeholder="user_id" autoComplete="user_id" name="user_id"
                                                value={data.user_id}
                                                onChange={handleChange} /> */}
                                            <select className="form-select" aria-label="Default select example" value={user.user_id} onChange={handleChange} name="user_id">
                                                <option selected>choose user name</option>
                                                {user.map((user, index) => {
                                                    return (
                                                        <option key={index} value={user.user_id}>{user.username}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <RiBankFill />
                                            </CInputGroupText>
                                            <CFormInput placeholder="bank_name" autoComplete="bank_name" name="bank_name"
                                                value={data.bank_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <TbNumbers />
                                            </CInputGroupText>
                                            <CFormInput placeholder="acc_no" autoComplete="acc_no" name="acc_no"
                                                value={data.acc_no}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <HiOutlineBuildingOffice2 />
                                            </CInputGroupText>
                                            <CFormInput placeholder="branch_name" autoComplete="branch_name" name="branch_name"
                                                value={data.branch_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <GiModernCity />
                                            </CInputGroupText>
                                            {/* <CFormInput placeholder="city_id" autoComplete="city_id" name="city_id"
                                                value={data.city_id}
                                                onChange={handleChange} /> */}
                                            <select className="form-select" aria-label="Default select example" value={city.city_id} onChange={handleChange} name="city_id">
                                                <option selected>choose City name</option>
                                                {city.map((city, index) => {
                                                    return (
                                                        <option key={index} value={city.city_id}>{city.city_name}</option>
                                                    )
                                                })
                                                }
                                            </select>

                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <MdOutline123 />
                                            </CInputGroupText>
                                            <CFormInput placeholder="ifsc_code" autoComplete="ifsc_code" name="ifsc_code"
                                                value={data.ifsc_code}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <TbFileTypography />
                                            </CInputGroupText>
                                            <CFormInput placeholder="acc_type" autoComplete="acc_type" name="acc_type"
                                                value={data.acc_type}
                                                onChange={handleChange} />
                                        </CInputGroup>

                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Bank Details</CButton>
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

export default Addbankdetail