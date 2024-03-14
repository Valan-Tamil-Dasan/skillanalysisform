import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Button } from "reactstrap";
import logo from '../assets/images/books.png'
import user1 from "../assets/images/user.png";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const myprofile = () => {
    navigate('/myprofile')
  }
  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-3">
            <div className="d-flex align-items-center justify-content-center ">
              <h3 style={{  fontFamily: 'Poppins', fontWeight: 500 }} className="m-3">Skill Analysis Data Form</h3>
              <img src={logo} className="img-fluid" style={{ width: '35px' }} alt="logo" />
            </div>
          </div>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
          <div className="d-lg-none d-flex align-items-center justify-content-center m-2">
            <h6 style={{ fontFamily: 'Poppins', fontWeight: 500 }} className="m-1">Skill Analysis Data Form</h6>
            <NavbarBrand>
              <img src={logo} className="img-fluid d-lg-none m-1" style={{ width: '35px' }} alt="logo" />
            </NavbarBrand>
          </div>
        </div>
       
      </div>
    </Navbar>
  );
};

export default Header;
