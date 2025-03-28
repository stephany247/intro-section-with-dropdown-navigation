import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import menuIcon from "../assets/images/icon-menu.svg";
import closeIcon from "../assets/images/icon-close-menu.svg";
import arrowDown from "../assets/images/icon-arrow-down.svg";
import arrowUp from "../assets/images/icon-arrow-up.svg";

// Import feature icons
import todoIcon from "../assets/images/icon-todo.svg";
import calendarIcon from "../assets/images/icon-calendar.svg";
import remindersIcon from "../assets/images/icon-reminders.svg";
import planningIcon from "../assets/images/icon-planning.svg";

// Import client logos
import client1 from "../assets/images/client-databiz.svg";
import client2 from "../assets/images/client-audiophile.svg";
import client3 from "../assets/images/client-meet.svg";
import client4 from "../assets/images/client-maker.svg";

const features = [
    { name: "Todo List", icon: todoIcon, href: "#" },
    { name: "Calendar", icon: calendarIcon, href: "#" },
    { name: "Reminders", icon: remindersIcon, href: "#" },
    { name: "Planning", icon: planningIcon, href: "#" },
];

const companies = [{ name: "History" }, { name: "Our Team" }, { name: "Blog" }];

const clients = [client1, client2, client3, client4];

interface DropdownProps {
  title: React.ReactNode;
  items: { name: string; href?: string; onClick?: () => void; icon?: string }[];
  isOpen: boolean;
  toggleOpen: () => void;
  customClasses?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  isOpen,
  toggleOpen,
  customClasses = "",
}) => (
  <div className="relative text-base">
    <button
      type="button"
      onClick={toggleOpen}
      className="flex items-center gap-2"
    >
      {title}
      <img src={isOpen ? arrowUp : arrowDown} alt="Toggle" />
    </button>
    {isOpen && (
      <ul className={`rounded-lg mt-4 ${customClasses}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className=" cursor-pointer hover:text-almost-black"
          >
            <a className="flex items-center gap-2" href={item.href} onClick={item.onClick}>
            {item.icon && <img src={item.icon} alt={item.name} />}
            {item.name}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="flex justify-between items-center p-6 md:px-8">
      <div className="flex items-center gap-16">
        {/* Logo */}
        <img src={logo} alt="Snap Logo" />

        {/* Desktop Links */}
        <ul className="hidden md:flex md:gap-6 lg:gap-10 text-medium-gray text-base">
          <Dropdown
            title="Features"
            items={features}
            isOpen={featuresOpen}
            toggleOpen={() => setFeaturesOpen(!featuresOpen)}
            customClasses="right-1 w-40 shadow-2xl absolute p-5 bg-almost-white space-y-2"
          />
          <Dropdown
            title="Company"
            items={companies}
            isOpen={companyOpen}
            toggleOpen={() => setCompanyOpen(!companyOpen)}
            customClasses="w-32 shadow-2xl absolute p-5 bg-almost-white space-y-2"
          />
          <li className="hover:text-black cursor-pointer">Careers</li>
          <li className="hover:text-black cursor-pointer">About</li>
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-6 text-medium-gray text-base">
        {userId ? (
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              {/* <span className="font-medium">Profile</span> */}
              <img src={profileOpen ? arrowUp : arrowDown} alt="Toggle" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-8 text-medium-gray hover:text-almost-black">
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/register" className="border-2 border-medium-gray rounded-xl px-5 py-3">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <img
        src={mobileMenuOpen ? closeIcon : menuIcon}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="cursor-pointer md:hidden"
        alt="Menu Toggle"
      />

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-almost-black/50 bg-opacity-95 z-40 flex justify-end transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`w-2/3 h-full bg-white p-6 flex flex-col transition-transform duration-300 ease-in-out transform ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div></div> {/* Empty div to push the close icon to the right */}
              <img
                src={closeIcon}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
                alt="Close Menu"
              />
            </div>

            <ul className="flex flex-col gap-4 text-medium-gray text-base">
              {userId && (
                <Dropdown
                  title={
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  }
                  items={[
                    { name: "Edit Profile", icon: "", onClick: () => navigate("/profile") },
                    { name: "Logout", icon: "", onClick: handleLogout },
                  ]}
                  isOpen={profileOpen}
                  toggleOpen={() => setProfileOpen(!profileOpen)}
                  customClasses="ml-4 space-y-2 text-medium-gray"
                />
              )}

              <Dropdown
                title="Features"
                items={features}
                isOpen={featuresOpen}
                toggleOpen={() => setFeaturesOpen(!featuresOpen)}
                customClasses="ml-4 space-y-3"
              />
              <Dropdown
                title="Company"
                items={companies}
                isOpen={companyOpen}
                toggleOpen={() => setCompanyOpen(!companyOpen)}
                customClasses="ml-4 space-y-3"
              />
              <li className="hover:text-black cursor-pointer">Careers</li>
              <li className="hover:text-black cursor-pointer">About</li>
            </ul>
            <div className="text-medium-gray text-sm text-center flex flex-col gap-4 mt-6">
              <>
                <a href="/login" type="button" className="block">
                  Login
                </a>
                <a
                  href="/register"
                  className="border-2 border-medium-gray rounded-xl px-5 py-2"
                >
                  Register
                </a>
              </>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
