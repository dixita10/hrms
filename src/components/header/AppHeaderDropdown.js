import React from 'react'
import { FiUserMinus, FiLock } from 'react-icons/fi'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import profile from './../../assets/images/avatars/profile.png'
import { AiOutlineFileAdd } from "react-icons/ai";


const AppHeaderDropdown = () => {

  const handleLogout = () => {
    localStorage.removeItem("token")
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={profile} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem> */}
        <CDropdownItem href="/filemanager ">
          <AiOutlineFileAdd className="me-2" />
          File Manager
        </CDropdownItem>
        <CDropdownItem href="/login " onClick={handleLogout}>
          <FiUserMinus className="me-2" />
          Logout
        </CDropdownItem>
        <CDropdownItem href="/resetpswd ">
          <FiLock className="me-2" />
          Reset Password
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
