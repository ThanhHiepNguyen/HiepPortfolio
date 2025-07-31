import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import LoadingScreen from "./LoadingScreen";
import logo from "../assets/logo.png";
import viFlag from "../assets/vi.png";
import enFlag from "../assets/en.png";

function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("vi-VN", {
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const contactDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target)
      ) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  const handleNavigate = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1200);
  };

  const handleChangeLanguage = () => {
    toggleLanguage();
    if (location.pathname === "/") {
      handleNavigate("/");
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <nav className="bg-white text-gray-800px-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <img
            src={logo}
            alt="HiepPortfolio Logo"
            className="h-[120px] w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleNavigate("/")}
          />

          <ul className="hidden md:flex space-x-6">
            {t.header.menu.map((item) => (
              <li key={item.name} className="w-[110px] text-center">
                <button
                  onClick={() => handleNavigate(item.href)}
                  className="block hover:text-pink-500 transition duration-200 text-lg font-bold"
                >
                  <span
                    className="relative mx-2 font-bold text-black 
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-full after:h-[2px] after:bg-pink-500 
                    after:origin-left after:scale-x-0 hover:after:scale-x-100 
                    after:opacity-0 hover:after:opacity-100 
                    after:transition-all after:duration-300"
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-center justify-center w-[220px]">
              <span className="text-base font-medium text-gray-800">
                {t.header.location}
              </span>
              <span className="text-2xl font-bold text-black">
                {currentTime}
              </span>
            </div>

            <div className="relative" ref={contactDropdownRef}>
              <button
                onClick={toggleContact}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300 w-[100px] text-center"
              >
                {t.header.contact}
              </button>
              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-20">
                  {t.header.contactOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleChangeLanguage}
              className="focus:outline-none"
            >
              <img
                src={language === "vi" ? enFlag : viFlag}
                alt="Language Flag"
                className="h-8 w-8 rounded-full"
              />
            </button>

            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white p-4">
            <ul className="flex flex-col space-y-2">
              {t.header.menu.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.href)}
                    className="block font-bold hover:text-pink-500 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col space-y-2">
              <span className="text-sm text-gray-600">
                {t.header.location} | {currentTime}
              </span>
              <div className="relative" ref={contactDropdownRef}>
                <button
                  onClick={toggleContact}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300 w-[100px] text-center"
                >
                  {t.header.contact}
                </button>
                {isContactOpen && (
                  <div className="mt-2 w-32 bg-white shadow-lg rounded-md">
                    {t.header.contactOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        {option.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleChangeLanguage}
                className="focus:outline-none"
              >
                <img
                  src={language === "vi" ? viFlag : enFlag}
                  alt="Language Flag"
                  className="h-6 w-6 rounded-full"
                />
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
