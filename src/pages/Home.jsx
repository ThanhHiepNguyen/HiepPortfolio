import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import avatar from "../assets/Hiep.jpg";
import LoadingScreen from "../components/LoadingScreen";
import "../assets/styles/Loader.css";

function Home() {
  const { t, language } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTitleIndex(0); // Reset lại khi language đổi
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % t.home.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.home.titles.length, language]);

  // Ngăn cuộn khi loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  // Chuyển trang có hiệu ứng loading
  const handleNavigate = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 1200); // delay 1.2s để hiển thị loading
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <LoadingScreen />
      </div>

      <section
        className={`relative bg-white min-h-screen flex flex-col items-center justify-start pt-[80px] px-4 text-center transition-opacity duration-700 ${
          isLoading ? "opacity-20 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
    `,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, transparent 20%, black)",
            maskImage:
              "radial-gradient(ellipse at center, transparent 20%, black)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[-200px] left-[-200px] w-96 h-96 bg-gray-400 blur-3xl opacity-13 rounded-full" />
          <div className="absolute top-[-200px] right-[-200px] w-96 h-96 bg-gray-400 blur-3xl opacity-10 rounded-full" />
          <div className="absolute bottom-[-200px] left-[-200px] w-96 h-96 bg-gray-400 blur-2xl opacity-10 rounded-full" />
          <div className="absolute bottom-[-200px] right-[-200px] w-96 h-96 bg-gray-300 blur-2xl opacity-10 rounded-full" />
        </div>
        <div className="max-w-2xl w-full mt-6">
          {/* Tiêu đề chính */}
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-3 flex-wra whitespace-nowrap">
            <span>{t.home.welcome}</span>
            <img
              src={avatar}
              alt="Avatar"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              {t.home.name}
            </span>
          </h1>
          <h2 className="text-6xl md:text-5xl font-extrabold text-gray-900 mb-6 flex items-center justify-center gap-2 whitespace-nowrap">
            <span>{t.home.rolePrefix}</span>

            <span
              className="px-4 py-3 bg-gray-100 rounded-xl shadow text-black transition-all duration-500 overflow-hidden inline-block"
              style={{ minWidth: "550px", textAlign: "center" }} // điều chỉnh độ rộng tại đây
            >
              <span key={titleIndex} className="wipe-text inline-block">
                {t.home.titles[titleIndex]}
              </span>
            </span>
          </h2>

          <p className="text-lg text-gray-900 font-semibold mb-10 leading-relaxed mt-10">
            {t.home.description}
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-19">
            <button
              type="button"
              onClick={() => handleNavigate("/projects")}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
            >
              {t.home.build}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/about")}
              className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-sm"
            >
              {t.home.explore}
            </button>
          </div>
        </div>
      </section>
      <div className="container "></div>
    </>
  );
}

export default Home;
