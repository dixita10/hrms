import React, { useState, lazy, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
 
 
  const options = {
    chart: {
      height: 400,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      // categories: [...new Set(data.map((item) => moment(item.createdAt).format("YYYY-MM-DD")))]
      categories: "33"
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy '
      },
    },
  }

  return (
    <>
      < WidgetsDropdown />
      <ReactApexChart options={options} series="11" type="area" height={400} />
    </>
  )

}


export default Dashboard
