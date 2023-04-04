import { countBy } from 'lodash'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './views/pages/login/Login'
import Attandance from './views/userattendance/UserAttendance'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/home/Home'))


// const Profile = React.lazy(() => import('./views/sidebar/Admin'))
const attendance = React.lazy(() => import('./views/attendance/Attendance'))
const department = React.lazy(() => import('./views/department/Department'))
const state = React.lazy(() => import('./views/state/State'))
const city = React.lazy(() => import('./views/city/City'))
const country = React.lazy(() => import('./views/country/Country'))
const Project = React.lazy(() => import('./views/project/Project'))
const role = React.lazy(() => import('./views/role/Role'))
const salary = React.lazy(() => import('./views/salary/Salary'))
const technology = React.lazy(() => import('./views/technology/Technology'))
const user = React.lazy(() => import('./views/user/User'))
const UserAttendance = React.lazy(() => import('./views/userattendance/UserAttendance'))




const Singleadmin = React.lazy(() => import('./views/sidebar/singleadmin'))
const Singleattendance = React.lazy(() => import('./views/attendance/Singleattendance'))
const Singleuser = React.lazy(() => import('./views/user/Singleuser'))
const Singledepartment = React.lazy(() => import('./views/department/Singledepartment'))
const Singlecountry = React.lazy(() => import('./views/country/Singlecountry'))
const Singlestate = React.lazy(() => import('./views/state/Singlestate'))
const Singlecity = React.lazy(() => import('./views/city/Singlecity'))
const Singleproject = React.lazy(() => import('./views/project/Singleproject'))
const Singlerole = React.lazy(() => import('./views/role/Singlerole'))
const Singlesalary = React.lazy(() => import('./views/salary/Singlesalary'))
const Singletech = React.lazy(() => import('./views/technology/Singletech'))


const Addattandance = React.lazy(() => import('./views/attendance/Addattandance'))
const Adddepartment = React.lazy(() => import('./views/department/Adddepartment'))
const Addcountry = React.lazy(() => import('./views/country/Addcountry'))
const Addstate = React.lazy(() => import('./views/state/Addstate'))
const Addcity = React.lazy(() => import('./views/city/Addcity'))
const Addproject = React.lazy(() => import('./views/project/Addproject'))
const Addrole = React.lazy(() => import('./views/role/Addrole'))
const Addsalary = React.lazy(() => import('./views/salary/Addsalary'))
const Addtech = React.lazy(() => import('./views/technology/Addtech'))
const Adduser = React.lazy(() => import('./views/user/Adduser'))



const Editattandance = React.lazy(() => import('./views/attendance/Editattandance'))
const Editadmin = React.lazy(() => import('./views/sidebar/Editadmin'))
const Editdepartment = React.lazy(() => import('./views/department/Editdepartment'))
const Editcountry = React.lazy(() => import('./views/country/Editcountry'))
const Editstate = React.lazy(() => import('./views/state/Editstate'))
const Editcity = React.lazy(() => import('./views/city/Editcity'))
const Editproject = React.lazy(() => import('./views/project/Editproject'))
const Editrole = React.lazy(() => import('./views/role/Editrole'))
const Editsalary = React.lazy(() => import('./views/salary/Editsalary'))
const Edittech = React.lazy(() => import('./views/technology/Edittech'))
const Edituser = React.lazy(() => import('./views/user/Edituser'))


// userlogin side ...

const Loginuser = React.lazy(() => import('./views/pages/loginuser/Loginuser'))
const Profile = React.lazy(() => import('./userside/userlogin/Profile'))




// const AllEndUsers = React.lazy(() => import('./views/users/AllEndUser'))
// const AllSP = React.lazy(() => import('./views/users/AllServiceProviders'))

// const Booking = React.lazy(() => import('./views/booking/index'))

// const Cars = React.lazy(() => import('./views/cars/Index'))
const login = React.lazy(() => import('./views/pages/login/Login'))
// const SingleCar = React.lazy(() => import('./views/cars/SingleCar'))
// const Payment = React.lazy(() => import('./views/payment/index'))
// const complain = React.lazy(() => import('./views/complain/index'))

// const UserPayment = React.lazy(() => import('./views/payment/UserPayment/index'))
// const ServiceProviderPayment = React.lazy(() => import('./views/payment/ServiceProviderPayment/index'))
// const UserRefundPayment = React.lazy(() => import('./views/payment/UserPayment/userRefundPayment'))
// const Report = React.lazy(() => import("./views/report/report"));




// const PrivateRoute = (props) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     return (
//       <Route exact={true} path={props.path} component={props.component}></Route>
//     )
//   } else {
//     return <Login  {...props} />
//   }
// }

const Routes = [
  // { path: '/login', name: 'login', component: login },
  // { path: '/http://localhost:3000/login', exact: true, name: 'login', component: login },
  // <PrivateRoute path='/dashboard' component={Dashboard} name='Dashboard' />,
  { path: '/home', name: 'Home', component: Home },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/profile', name: 'Profile', component: Profile },
  { path: '/attendance', name: 'Attendance', component: attendance },
  { path: '/department', name: 'Department', component: department },
  { path: '/state', name: "State", component: state },
  { path: '/city', name: 'City', component: city },
  { path: "/country", name: 'Country', component: country },
  { path: "/project", name: 'Project', component: Project },
  { path: "/role", name: 'Role', component: role },
  { path: "/salary", name: 'Salary', component: salary },
  { path: "/technology", name: 'Technology', component: technology },
  { path: "/user", name: 'User', component: user },
  { path: "/userattendance", name: 'UserAttendance', component: UserAttendance },

  { path: '/addattandance', name: 'Addattandance', component: Addattandance },
  { path: '/adddepartment', name: 'Adddepartment', component: Adddepartment },
  { path: '/addcountry', name: 'Addcountry', component: Addcountry },
  { path: '/addstate', name: 'Addstate', component: Addstate },
  { path: '/addcity', name: 'Addcity', component: Addcity },
  { path: '/addproject', name: 'Addproject', component: Addproject },
  { path: '/addrole', name: 'Addrole', component: Addrole },
  { path: '/addsalary', name: 'Addsalary', component: Addsalary },
  { path: '/addtech', name: 'Addtech', component: Addtech },
  { path: '/adduser', name: 'Adduser', component: Adduser },


  { path: '/editattandance/:id', name: 'Editattandance', component: Editattandance },
  { path: '/editadmin/:id', name: 'Editadmin', component: Editadmin },
  { path: '/editdepartment/:id', name: 'Editdepartment', component: Editdepartment },
  { path: '/editcountry/:id', name: 'Editcountry', component: Editcountry },
  { path: '/editstate/:id', name: 'Editstate', component: Editstate },
  { path: '/editcity/:id', name: 'Editcity', component: Editcity },
  { path: '/editproject/:id', name: 'Editproject', component: Editproject },
  { path: '/editrole/:id', name: 'Editrole', component: Editrole },
  { path: '/editsalary/:id', name: 'Editsalary', component: Editsalary },
  { path: '/edittech/:id', name: 'Edittech', component: Edittech },
  { path: '/edituser/:id', name: 'Edituser', component: Edituser },


  { path: '/singleattendance/:id', name: "Singleattendance", component: Singleattendance },
  { path: '/singleuser/:id', name: 'Singleuser', component: Singleuser },
  { path: '/singledepartment/:id', name: 'Singledepartment', component: Singledepartment },
  { path: '/singlecountry/:id', name: 'Singlecountry', component: Singlecountry },
  { path: '/singlestate/:id', name: 'Singlestate', component: Singlestate },
  { path: '/singlecity/:id', name: 'Singlecity', component: Singlecity },
  { path: '/singleproject/:id', name: 'Singleproject', component: Singleproject },
  { path: '/singleadmin/:id', name: 'Singleadmin', component: Singleadmin },
  { path: '/singlerole/:id', name: 'Singlerole', component: Singlerole },
  { path: '/singlesalary/:id', name: 'Singlesalary', component: Singlesalary },
  { path: '/singletech/:id', name: 'Singletech', component: Singletech },

  // user side ...


  { path: '/login', name: 'Loginuser', component: Loginuser },
  { path: '/loggeduser', name: 'Profile', component: Profile }



  // { path: '/users', name: 'users', component: AllEndUsers, exact: true },
  // { path: '/users/all-enduser', name: 'All EndUsers', component: AllEndUsers },
  // { path: '/users/all-serviceprovider', name: 'All service provider', component: AllSP },

  // { path: '/booking', name: 'booking', component: Booking, exact: true },

  // { path: '/cars', name: 'cars', component: Cars, exact: true },
  // { path: '/cars/:id', name: 'SingleCar', component: SingleCar, exact: true },

  // // { path: '/payment', name: 'Payment', component: Payment, exact: true },

  // { path: '/complain', name: 'complain', component: complain, exact: true },

  // { path: '/payment', name: 'payment', component: UserPayment, exact: true },

  // { path: '/payment/user-payment', name: 'User Payment', component: UserPayment, exact: true },
  // { path: '/payment/serviceprovider-payment', name: 'Service Provider Payment', component: ServiceProviderPayment, exact: true },

  // { path: '/payment/user-refund-payment', name: 'User Refund Payment', component: UserRefundPayment, exact: true },
  // { path: "/report", name: "Report", component: Report, exact: true },



]

export default Routes

