import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import avatar from "../assets/Hiep.jpg";
import LoadingScreen from "../components/LoadingScreen";
import { FaCalendarAlt, FaClock, FaArrowRight, FaBookOpen, FaGithub, FaExternalLinkAlt, FaEye, FaPhone, FaEnvelope, FaSkype, FaFacebookMessenger, FaChevronDown } from "react-icons/fa";
import "../assets/styles/Loader.css";

function Home() {
  const { t, language, loading } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [randomPosts, setRandomPosts] = useState([]);
  const [randomProjects, setRandomProjects] = useState([]);
  const navigate = useNavigate();

  // Scroll to top khi component mount (F5/refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!t) return;
    setTitleIndex(0); // Reset lại khi language đổi
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % t.home.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t?.home?.titles?.length, language]);

  // Random posts chỉ khi có data mới (F5/refresh)
  useEffect(() => {
    if (t?.blog?.posts && t.blog.posts.length > 0) {
      const shuffled = [...t.blog.posts].sort(() => Math.random() - 0.5).slice(0, 6);
      setRandomPosts(shuffled);
    }
  }, [t?.blog?.posts]);

  // Random projects chỉ khi có data mới (F5/refresh)
  useEffect(() => {
    if (t?.projects?.items && t.projects.items.length > 0) {
      const shuffled = [...t.projects.items].sort(() => Math.random() - 0.5).slice(0, 3);
      setRandomProjects(shuffled);
    }
  }, [t?.projects?.items]);

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

  // Show loading screen if Firebase data is still loading
  if (loading || !t) {
    return <LoadingScreen />;
  }

  // Chuyển trang có hiệu ứng loading
  const handleNavigate = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 1200); // delay 1.2s để hiển thị loading
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const scrollToNext = () => {
    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
      blogSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-700 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <LoadingScreen />
      </div>

      <section
        className={[
          "relative min-h-screen flex flex-col items-center justify-start pt-[120px] px-4 text-center",

          "bg-white",
          "bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.06)_1px,transparent_1px)]",
          "bg-[size:80px_80px]",
          "dark:bg-black",
          "dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)]",
          "dark:bg-[size:80px_80px]",
        ].join(" ")}
      >
        {/* Spotlight trung tâm */}
        <div
          className="
      absolute inset-0 z-0 pointer-events-none
      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]
      dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]
    "
        />
        <div
          className="
      absolute inset-0 z-0 pointer-events-none
      bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.04)_75%)]
      bg-[size:160px_160px]
      dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.05)_75%)]
      dark:bg-[size:160px_160px]
    "
        />

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
          <div className="absolute top-[-200px] left-[-200px] w-96 h-96 bg-gray-400 dark:bg-dark-600 blur-3xl opacity-13 rounded-full" />
          <div className="absolute top-[-200px] right-[-200px] w-96 h-96 bg-gray-400 dark:bg-dark-600 blur-3xl opacity-10 rounded-full" />
          <div className="absolute bottom-[-200px] left-[-200px] w-96 h-96 bg-gray-400 dark:bg-dark-600 blur-2xl opacity-10 rounded-full" />
          <div className="absolute bottom-[-200px] right-[-200px] w-96 h-96 bg-gray-300 dark:bg-dark-500 blur-2xl opacity-10 rounded-full" />
        </div>
        <div className="max-w-2xl w-full mt-4.75">
          {/* Tiêu đề chính */}
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-3 flex-wra whitespace-nowrap">
            <span>{t.home.welcome}</span>
            <img
              src={avatar}
              alt="Avatar"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-white dark:border-dark-700 shadow-md"
            />
            <span className="text-transparent h-18.5 text-[66px] bg-clip-text bg-gradient-to-r p from-pink-500 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
              {t.home.name}
            </span>
          </h1>
          <h2 className="text-6xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
            <span>{t.home.rolePrefix}</span>

            <span
              className="px-3 py-3 bg-gray-100 dark:bg-dark-700 rounded-xl shadow text-black dark:text-white transition-all duration-500 overflow-hidden inline-block max-w-full"
              style={{ textAlign: "center" }}
            >
              <span key={titleIndex} className="wipe-text inline-block">
                {t.home.titles[titleIndex]}
              </span>
            </span>
          </h2>

          <p className="text-lg text-gray-900 dark:text-gray-100 font-semibold mb-10 leading-relaxed mt-10.25">
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
              className="bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-dark-600 transition duration-300 shadow-sm"
            >
              {t.home.explore}
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="group bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-dark-600"
            aria-label={language === "vi" ? "Cuộn xuống" : "Scroll down"}
          >
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-300">
              <FaChevronDown className="w-5 h-5 animate-bounce" style={{ animationDelay: '0ms' }} />
              <FaChevronDown className="w-5 h-5 -mt-1 animate-bounce opacity-70" style={{ animationDelay: '150ms' }} />
              <FaChevronDown className="w-5 h-5 -mt-1 animate-bounce opacity-40" style={{ animationDelay: '300ms' }} />
            </div>
          </button>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="blog-section bg-gray-50 dark:bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-full mb-6">
              <FaBookOpen className="text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                {language === "vi" ? "Bài viết mới nhất" : "Latest Articles"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "vi" ? "Blog & Bài viết" : "Blog & Articles"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === "vi"
                ? "Khám phá những bài viết về lập trình, công nghệ và kinh nghiệm phát triển web"
                : "Discover articles about programming, technology and web development experience"
              }
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomPosts.map((post, index) => (
              <article
                key={index}
                onClick={() => alert('Tính năng đang chuẩn bị cập nhật!')}
                className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain bg-gray-100 dark:bg-dark-700 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      {post.category.split(" ")[0]}
                    </span>
                  </div>

                  {/* Read More Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-dark-700 px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {language === "vi" ? "Đọc thêm" : "Read More"}
                      </span>
                      <FaArrowRight className="text-pink-500 text-sm" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date and Reading Time */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>5 min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full">
                      {post.category.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                      <FaArrowRight className="text-pink-500 group-hover:text-white text-xs transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleNavigate("/blog")}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
            >
              {language === "vi" ? "Xem tất cả bài viết" : "View All Articles"}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-white dark:bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full mb-6">
              <FaGithub className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {language === "vi" ? "Dự án nổi bật" : "Featured Projects"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "vi" ? "Dự án của tôi" : "My Projects"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === "vi"
                ? "Khám phá các dự án web development và ứng dụng tôi đã thực hiện"
                : "Explore web development projects and applications I've built"
              }
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-dark-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <FaGithub className="text-gray-800 dark:text-gray-200 text-xl" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-dark-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <FaExternalLinkAlt className="text-gray-800 dark:text-gray-200 text-xl" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      <FaGithub />
                      {language === "vi" ? "Code" : "Code"}
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <FaEye />
                      {language === "vi" ? "Demo" : "Live Demo"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleNavigate("/projects")}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
            >
              {language === "vi" ? "Xem tất cả dự án" : "View All Projects"}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 dark:bg-dark-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t?.contact?.title || (language === "vi" ? "Liên hệ" : "Get In Touch")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t?.contact?.description || (language === "vi" ? "Hãy thoải mái liên hệ với tôi" : "Feel free to get in touch")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t?.contact?.availability?.label || (language === "vi" ? "Gọi cho tôi" : "Call me")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t?.contact?.availability?.time || (language === "vi" ? "Làm việc từ 8:00 sáng đến 5:00 chiều" : "Available from 8:00am to 5:00pm")}
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                    <FaPhone className="text-pink-600 dark:text-pink-400 text-xl" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t?.contact?.availability?.phone || "(+84) 393 048 626"}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t?.contact?.chat?.label || (language === "vi" ? "Trò chuyện với tôi" : "Chat with me")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t?.contact?.chat?.message || (language === "vi" ? "Gửi tin nhắn cho tôi qua mạng xã hội" : "Send me a message on social media")}
                </p>

                <div className="space-y-3">
                  {Object.values(t?.contact?.chat?.options || {}).map((opt, idx) => {
                    const Icon = opt.icon === "FaSkype" ? FaSkype :
                      opt.icon === "FaFacebookMessenger" ? FaFacebookMessenger : FaEnvelope;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                        <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg">
                          <Icon className="text-pink-600 dark:text-pink-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t?.contact?.form?.title || (language === "vi" ? "Biểu mẫu liên hệ" : "Contact Form")}
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {t?.contact?.form?.firstName || (language === "vi" ? "Họ" : "First name")}*
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors dark:bg-dark-700 dark:text-white"
                      placeholder={t?.contact?.form?.firstName || (language === "vi" ? "Họ" : "First name")}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {t?.contact?.form?.lastName || (language === "vi" ? "Tên" : "Last name")}*
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors dark:bg-dark-700 dark:text-white"
                      placeholder={t?.contact?.form?.lastName || (language === "vi" ? "Tên" : "Last name")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {t?.contact?.form?.email || (language === "vi" ? "Email" : "Email")}*
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors dark:bg-dark-700 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {t?.contact?.form?.message || (language === "vi" ? "Tin nhắn" : "Message")}*
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors resize-none dark:bg-dark-700 dark:text-white"
                    placeholder={language === "vi" ? "Để lại tin nhắn..." : "Leave me a message..."}
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("/contact");
                  }}
                  className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-300"
                >
                  {t?.contact?.form?.submit || (language === "vi" ? "Gửi" : "Send message")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
