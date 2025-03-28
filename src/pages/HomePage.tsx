import React from "react";
import heroMobile from "../assets/images/image-hero-mobile.png";
import heroDesktop from "../assets/images/image-hero-desktop.png";

// Import client logos
import client1 from "../assets/images/client-databiz.svg";
import client2 from "../assets/images/client-audiophile.svg";
import client3 from "../assets/images/client-meet.svg";
import client4 from "../assets/images/client-maker.svg";

const clients = [client1, client2, client3, client4];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen font-epilogue relative">
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
            className="bg-almost-black text-almost-white px-6 py-3 md:px-8 rounded-2xl hover:bg-white hover:text-almost-black border border-almost-black cursor-pointer transition-colors duration-300 ease-in-out"
          >
            Learn more
          </button>

          {/* Client Logos Section for large screens */}
          <div className="hidden md:flex justify-center md:justify-between items-center md:gap-2 lg:gap-8 mt-10 w-full">
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