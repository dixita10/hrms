import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loading from './Loading'

const WidgetsDropdown = () => {


  return (
    <CRow>
      <CCol sm={6} lg={3} >
        <CWidgetStatsA
          className="mb-4"
          style={{ height: '6rem', backgroundColor: '#8eaeca' }}
          // color="primary"
          value={
            <>
              Users
            </>
          }
          title=
          "65"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu style={{ background: '#e4e6e8' }}>
                <CDropdownItem style={{ color: '#8eaeca' }}>
                  <Link to='/users/all-enduser' style={{
                    textDecoration: 'none', color: '#8eaeca'
                  }} >All Endusers 22</Link>
                </CDropdownItem>
                <CDropdownItem><Link to='/users/all-serviceprovider' style={{ textDecoration: 'none', color: '#8eaeca' }} >All ServiceProvider 11</Link>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          style={{ height: '6rem', backgroundColor: '#c08b94' }}
          // color="info"
          value={
            <>
              All Booking
            </>
          }
          title="66"
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          style={{ height: '6rem', backgroundColor: '#6f788c' }}
          // color="warning"
          value={
            <>
              All Cars
            </>
          }
          title="50"

        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          style={{ height: '6rem', backgroundColor: '#c5c3c3' }}
          // color="danger"
          value={
            <>
              Booking Today
            </>
          }

          title="20"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
