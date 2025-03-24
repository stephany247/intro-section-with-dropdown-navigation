import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import menuIcon from "../assets/images/icon-menu.svg";
import closeIcon from "../assets/images/icon-close-menu.svg";
import arrowDown from "../assets/images/icon-arrow-down.svg";
import arrowUp from "../assets/images/icon-arrow-up.svg";
import heroMobile from "../assets/images/image-hero-mobile.png";
import heroDesktop from "../assets/images/image-hero-desktop.png";

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
  { name: "Todo List", icon: todoIcon },
  { name: "Calendar", icon: calendarIcon },
  { name: "Reminders", icon: remindersIcon },
  { name: "Planning", icon: planningIcon },
];

const companies = [{ name: "History" }, { name: "Our Team" }, { name: "Blog" }];

const clients = [client1, client2, client3, client4];

interface DropdownProps {
  title: string;
  items: { name: string; icon?: string }[];
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
  <li className="relative hover:text-almost-black text-base">
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
            className="flex items-center gap-2 hover:text-almost-black cursor-pointer"
          >
            {item.icon && <img src={item.icon} alt={item.name} />}
            {item.name}
          </li>
        ))}
      </ul>
    )}
  </li>
);

const HomePage: React.FC = () => {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-epilogue relative">
      {/* Navbar */}
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
              customClasses="right-1 w-40 drop-shadow-3xl absolute p-5 bg-almost-white space-y-2"
            />
            <Dropdown
              title="Company"
              items={companies}
              isOpen={companyOpen}
              toggleOpen={() => setCompanyOpen(!companyOpen)}
              customClasses="w-32 drop-shadow-3xl absolute p-5 bg-almost-white space-y-2"
            />
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">About</li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6 text-medium-gray text-base">
          <a href="/login" className="hover:text-black">
            Login
          </a>
          <a
            href="/register"
            className="border-2 border-medium-gray rounded-xl px-5 py-2 hover:border-almost-black hover:text-almost-black"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <img
          src={mobileMenuOpen ? closeIcon : menuIcon}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer md:hidden"
          alt="Menu Toggle"
        />
      </nav>

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
            <ul className="flex flex-col gap-4 text-medium-gray text-sm">
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
            <div className="text-medium-gray text-sm flex flex-col gap-4 mt-6">
              <button type="button">Login</button>
              <a
                href="/register"
                className="border-2 border-medium-gray rounded-xl px-5 py-2"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between md:gap-20 md:mt-10 md:mb-20 max-w-6xl mx-auto md:px-6">
        {/* Text Content */}
        <div className="md:w-1/2 md:h-full text-center md:text-left flex flex-col md:justify-between items-center md:items-start gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-almost-black lg:text-balance">
            Make remote work
          </h1>
          <p className="text-medium-gray text-base md:text-lg px-4 md:px-0 lg:max-w-md">
            Get your team in sync, no matter your location. Streamline
            processes, create team rituals, and watch productivity soar.
          </p>
          <button
            type="button"
            className="bg-almost-black text-almost-white px-6 py-3 md:px-8 rounded-2xl hover:bg-white hover:text-almost-black border border-almost-black transition-colors duration-300 ease-in-out"
          >
            Learn more
          </button>

          {/* Client Logos Section for large screens */}
          <div className="hidden md:flex justify-center md:justify-between items-center  md:gap-2 lg:gap-8 mt-10 w-full">
            {clients.map((client, index) => (
              <img
                key={index}
                src={client}
                alt={`Client ${index + 1}`}
                className="h-full w-fit"
              />
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img src={heroMobile} alt="Hero" className="w-full md:hidden" />
          <img
            src={heroDesktop}
            alt="Hero"
            className="w-full hidden md:block"
          />
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="flex justify-center items-center gap-8 my-10 md:mt-20 overflow-auto md:hidden">
        {clients.map((client, index) => (
          <img
            key={index}
            src={client}
            alt={`Client ${index + 1}`}
            className="h-fit min-h-4 w-fit max-w-16 md:h-16"
          />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
