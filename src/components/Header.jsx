import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import { useTheme } from "../hooks/useTheme.jsx";
import LoadingScreen from "./LoadingScreen";
import logo from "../assets/logo.png";
import viFlag from "../assets/vi.png";
import enFlag from "../assets/en.png";
import { FaSun, FaMoon } from "react-icons/fa";

function Header() {
  const { language, toggleLanguage, t, loading } = useLanguage();
  const menu = t?.header?.menu ?? [];
  const contactOptions = t?.header?.contactOptions ?? [];
  const locationText = t?.header?.location ?? "";
  const contactText = t?.header?.contact ?? "Contact";
  const { isDark, toggleTheme } = useTheme();
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

      <nav className="bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 px-4 sticky top-0 z-10 shadow-md dark:shadow-dark-700">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <img
            src={logo}
            alt="HiepPortfolio Logo"
            className="h-[120px] w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleNavigate("/")}
          />

          {!loading && (
            <ul className="hidden md:flex space-x-6">
              {menu.map((item) => (
                <li key={item.name} className="w-[110px] text-center">
                  <button
                    onClick={() => handleNavigate(item.href)}
                    className="block hover:text-pink-500 transition duration-200 text-lg font-bold"
                  >
                    <span
                      className="relative mx-2 font-bold text-black dark:text-white
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
          )}

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-center justify-center w-[220px]">
              <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                {locationText}
              </span>
              <span className="text-2xl font-bold text-black dark:text-white">
                {currentTime}
              </span>
            </div>

            <div className="relative" ref={contactDropdownRef}>
              <button
                onClick={toggleContact}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300 w-[100px] text-center"
              >
                {contactText}
              </button>
              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-700 shadow-lg rounded-md z-20">
                  {contactOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600"
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

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
                className="w-6 h-6 text-gray-800 dark:text-white"
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
          <div className="md:hidden bg-white dark:bg-dark-800 p-4">
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
              <span className="text-sm text-gray-600 dark:text-gray-400">
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
                  <div className="mt-2 w-32 bg-white dark:bg-dark-700 shadow-lg rounded-md">
                    {contactOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600"
                      >
                        {option.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
                >
                  {isDark ? (
                    <FaSun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <FaMoon className="w-4 h-4 text-gray-600" />
                  )}
                </button>
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
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
