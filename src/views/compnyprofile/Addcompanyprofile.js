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
import { BsBuildingCheck, BsCloudMoon } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaCity, FaRegAddressCard, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePolicy, MdShareLocation } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Addcompanyprofile = () => {



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

    useEffect(() => {
        City()
    }, [])

    var history = useHistory();

    const [data, setData] = useState({
        compnay_name: '',
        domain_name: '',
        website: '',
        city_id: '',
        address: '',
        company_policy: '',
        moonlight_policy: '',
        tour_policy: '',
        yearlyleave_policy: '',

    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            compnay_name: data.compnay_name,
            domain_name: data.domain_name,
            website: data.website,
            city_id: data.city_id,
            address: data.address,
            company_policy: data.company_policy,
            moonlight_policy: data.moonlight_policy,
            tour_policy: data.tour_policy,
            yearlyleave_policy: data.yearlyleave_policy,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/companyprofile/addcompanyprofile`,
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
                    history.push("/companyprofile")
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
                                        <h3 className='text-center'>Add Company Profile</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BsBuildingCheck />
                                            </CInputGroupText>
                                            <CFormInput placeholder="compnay_name" autoComplete="compnay_name" name="compnay_name"
                                                value={data.compnay_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <BiCommentCheck />
                                            </CInputGroupText>
                                            <CFormInput placeholder="domain_name" autoComplete="domain_name" name="domain_name"
                                                value={data.domain_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CgWebsite />
                                            </CInputGroupText>
                                            <CFormInput placeholder="website" autoComplete="website" name="website"
                                                value={data.website}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <HiOutlineBuildingOffice2 />
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
                                                <FaRegAddressCard />
                                            </CInputGroupText>
                                            <CFormInput placeholder="address" autoComplete="address" name="address"
                                                value={data.address}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <MdOutlinePolicy />
                                            </CInputGroupText>
                                            <CFormInput placeholder="company_policy" autoComplete="company_policy" name="company_policy"
                                                value={data.company_policy}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <BsCloudMoon />
                                            </CInputGroupText>
                                            <CFormInput placeholder="moonlight_policy" autoComplete="moonlight_policy" name="moonlight_policy"
                                                value={data.moonlight_policy}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <MdShareLocation />
                                            </CInputGroupText>
                                            <CFormInput placeholder="tour_policy" autoComplete="tour_policy" name="tour_policy"
                                                value={data.tour_policy}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <FaRegCalendarAlt />
                                            </CInputGroupText>
                                            <CFormInput placeholder="yearlyleave_policy" autoComplete="yearlyleave_policy" name="yearlyleave_policy"
                                                value={data.yearlyleave_policy}
                                                onChange={handleChange} />
                                        </CInputGroup>

                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Add Company Profile</CButton>
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

export default Addcompanyprofile