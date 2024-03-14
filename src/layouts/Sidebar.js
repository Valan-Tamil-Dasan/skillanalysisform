import { Button, Nav, NavItem } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Add Books",
    href: "/addbooks",
    icon: "bi bi-database-fill-add",
  },
  {
    title: "Create Library Card",
    href: "/librarycard",
    icon: "bi bi-person-vcard-fill",
  },
  {
    title: "Card Members",
    href: "/cardmembers",
    icon: "bi bi-person-video2",
  },
  {
    title: "Give Rent",
    href: "/rentbook",
    icon: "bi bi-bag-fill",
  },
  {
    title: "Rent Database",
    href: "/rentdb",
    icon: "bi bi-clipboard2-data-fill",
  },
  {
    title: "Admin Profile",
    href: "/myprofile",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const navigate = useNavigate(); // Get the navigate function
  let location = useLocation();

  // Function to handle navigation
  const handleNavigation = (path) => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
    navigate(path);
  };

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {/* Call handleNavigation function on click */}
              <div
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
                onClick={() => handleNavigation(navi.href)}
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{navi.title}</span>
              </div>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
