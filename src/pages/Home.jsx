import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import avatar from "../assets/Hiep.jpg";
import LoadingScreen from "../components/LoadingScreen";
import { FaCalendarAlt, FaClock, FaArrowRight, FaBookOpen, FaPhone, FaEnvelope, FaSkype, FaFacebookMessenger, FaChevronDown } from "react-icons/fa";
import "../assets/styles/Loader.css";

function Home() {
  const { t, language, loading } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [randomPosts, setRandomPosts] = useState([]);
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

  const estimateReadingTime = (text = "") => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(3, Math.ceil(words / 200))} min read`;
  };

  const slugify = (text = "") =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const featuredBlogPost = randomPosts[0];
  const sideBlogPosts = randomPosts.slice(1, 3);
  const gridBlogPosts = randomPosts.slice(3, 6);

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

      {/* Hero Section */}
      <section className="relative min-h-screen pt-[120px] px-4 bg-white dark:bg-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.09),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.09),transparent_38%)]" />

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500 font-semibold mb-4">
              {language === "vi" ? "Portfolio Cá Nhân" : "Personal Portfolio"}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              <span>{t.home.welcome} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                {t.home.name}
              </span>
            </h1>

            <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
              <span>{t.home.rolePrefix}</span>
              <span className="px-6 py-1.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl shadow-sm">
                <span key={titleIndex} className="wipe-text inline-block">
                  {t.home.titles[titleIndex]}
                </span>
              </span>
            </h2>

            <p className="mt-7 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed bg-white/70 dark:bg-dark-800/60 border border-gray-200 dark:border-dark-700 rounded-2xl p-5 backdrop-blur-sm">
              {t.home.description}
            </p>

            <div className="mt-10 flex gap-3 sm:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => handleNavigate("/projects")}
                className="bg-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
              >
                {t.home.build}
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/about")}
                className="bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-dark-600 transition duration-300 shadow-sm"
              >
                {t.home.explore}
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-cyan-500/15 blur-2xl" />
              <div className="relative w-[360px] md:w-[460px] bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-[2rem] p-5 md:p-6 shadow-xl">
                <div className="w-full h-[320px] md:h-[360px] rounded-2xl bg-gray-50 dark:bg-dark-700 flex items-center justify-center overflow-hidden">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="max-w-full max-h-full rounded-2xl object-contain"
                  />
                </div>
                <div className="mt-4 pt-4 px-2 border-t border-gray-200 dark:border-dark-700 text-center">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">
                    {language === "vi" ? "Vai trò chính" : "Primary Focus"}
                  </p>
                  <p className="mt-2 text-[22px] leading-tight font-semibold text-gray-900 dark:text-white whitespace-normal">
                    {language === "vi"
                      ? "Full-Stack Developer (Node.js, NestJS, ReactJS)"
                      : "Full-Stack Developer (Node.js, NestJS, ReactJS)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={scrollToNext}
            className="group bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-dark-600"
            aria-label={language === "vi" ? "Cuộn xuống" : "Scroll down"}
          >
            <div className="flex flex-col items-center text-gray-700 dark:text-gray-300">
              <FaChevronDown className="w-5 h-5 animate-bounce" style={{ animationDelay: "0ms" }} />
              <FaChevronDown className="w-5 h-5 -mt-1 animate-bounce opacity-70" style={{ animationDelay: "150ms" }} />
              <FaChevronDown className="w-5 h-5 -mt-1 animate-bounce opacity-40" style={{ animationDelay: "300ms" }} />
            </div>
          </button>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="blog-section py-20 bg-white dark:bg-dark-900">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {featuredBlogPost && (
              <article
                onClick={() => handleNavigate(`/blog/${slugify(featuredBlogPost.title)}`)}
                className="group lg:col-span-7 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <div className="relative h-72 md:h-96 bg-gray-100 dark:bg-dark-700 overflow-hidden">
                  <img
                    src={featuredBlogPost.image}
                    alt={featuredBlogPost.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full shadow">
                      {featuredBlogPost.category.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1"><FaCalendarAlt />{formatDate(featuredBlogPost.date)}</span>
                    <span className="inline-flex items-center gap-1"><FaClock />{estimateReadingTime(featuredBlogPost.content || featuredBlogPost.summary || "")}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {featuredBlogPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {featuredBlogPost.summary}
                  </p>
                </div>
              </article>
            )}

            <div className="lg:col-span-5 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-lg p-3 md:p-4">
              <div className="space-y-3">
                {randomPosts.slice(1, 6).map((post, index) => (
                  <article
                    key={`${post.title}-${index}`}
                    onClick={() => handleNavigate(`/blog/${slugify(post.title)}`)}
                    className="group grid grid-cols-[110px_1fr_auto] items-center gap-3 rounded-2xl p-2 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer"
                  >
                    <div className="h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 inline-flex items-center gap-1">
                        <FaCalendarAlt />
                        {formatDate(post.date)}
                      </p>
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                      <FaArrowRight className="text-pink-500 group-hover:text-white text-xs transition-colors" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
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

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t?.contact?.title || (language === "vi" ? "Liên hệ" : "Get In Touch")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t?.contact?.description || (language === "vi" ? "Hãy thoải mái liên hệ với tôi" : "Feel free to get in touch")}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl border border-gray-200 dark:border-dark-700 bg-white/90 dark:bg-dark-900/70 p-6 shadow-xl backdrop-blur">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t?.contact?.availability?.label || (language === "vi" ? "Gọi cho tôi" : "Call me")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t?.contact?.availability?.time || (language === "vi" ? "Làm việc từ 8:00 sáng đến 5:00 chiều" : "Available from 8:00am to 5:00pm")}
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-2xl">
                    <FaPhone className="text-pink-600 dark:text-pink-400 text-xl" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t?.contact?.availability?.phone || "(+84) 393 048 626"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-dark-700 bg-white/90 dark:bg-dark-900/70 p-6 shadow-xl backdrop-blur">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t?.contact?.chat?.label || (language === "vi" ? "Trò chuyện với tôi" : "Chat with me")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t?.contact?.chat?.message || (language === "vi" ? "Gửi tin nhắn cho tôi qua mạng xã hội" : "Send me a message on social media")}
                </p>
                <div className="space-y-3">
                  {Object.values(t?.contact?.chat?.options || {}).map((opt, idx) => {
                    const Icon =
                      opt.icon === "FaSkype" ? FaSkype :
                        opt.icon === "FaFacebookMessenger" ? FaFacebookMessenger :
                          FaEnvelope;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg">
                          <Icon className="text-pink-600 dark:text-pink-300" />
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

            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/60 bg-white/90 dark:bg-dark-900/70 p-8 shadow-2xl backdrop-blur">
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
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-colors duration-300"
                  >
                    {t?.contact?.form?.submit || (language === "vi" ? "Gửi" : "Send message")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
