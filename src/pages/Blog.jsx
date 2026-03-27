import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import { FaCalendarAlt, FaClock, FaArrowRight, FaSearch, FaFilter, FaBookOpen } from "react-icons/fa";

function Blog() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!t) return null;

  const labels = {
    badge: language === "vi" ? "Bài viết mới nhất" : "Latest Articles",
    searchPlaceholder: language === "vi" ? "Tìm kiếm bài viết..." : "Search articles...",
    allCategories: language === "vi" ? "Tất cả chủ đề" : "All Categories",
    noResultsTitle: language === "vi" ? "Không tìm thấy bài viết" : "No articles found",
    noResultsDesc:
      language === "vi"
        ? "Thử đổi từ khóa hoặc chọn danh mục khác để tìm bài viết phù hợp."
        : "Try adjusting your search terms or category filter to find what you're looking for.",
    readMore: language === "vi" ? "Đọc thêm" : "Read more",
    filteredBy: language === "vi" ? "Đang lọc theo" : "Filtered by",
    results: language === "vi" ? "kết quả" : "results"
  };

  const rawPosts = t?.blog?.posts ?? [];
  const posts = useMemo(() => {
    const list = Array.isArray(rawPosts) ? rawPosts : Object.values(rawPosts);
    return list
      .filter(Boolean)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [rawPosts]);

  const getPrimaryCategory = (categoryText = "") =>
    categoryText.split(",")[0]?.trim() || "General";

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

  const categories = useMemo(() => {
    return ["all", ...new Set(posts.map((p) => getPrimaryCategory(p.category)))];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const title = post.title || "";
    const summary = post.summary || "";
    const category = post.category || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" ||
      category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const estimateReadingTime = (text = "") => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(3, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <section className="relative bg-gray-50 dark:bg-dark-900 min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full mb-6 border border-pink-200 dark:border-pink-800">
            <FaBookOpen className="text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">{labels.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t.blog.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.blog.description}
          </p>
        </div>

        <div className="mb-10">
          <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-lg p-5 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={labels.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2 min-w-[210px]">
                <FaFilter className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? labels.allCategories : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const active = selectedCategory === category;
                const label = category === "all" ? labels.allCategories : category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${active
                      ? "bg-pink-500 text-white shadow"
                      : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{filteredPosts.length}</span> {labels.results}
          {selectedCategory !== "all" && (
            <span> • {labels.filteredBy}: <span className="font-medium">{selectedCategory}</span></span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mb-12">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              onClick={() => navigate(`/blog/${slugify(post.title)}`)}
              className="group bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-dark-700">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 dark:bg-dark-800/95 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-full shadow">
                    {getPrimaryCategory(post.category)}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white dark:bg-dark-700 px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{labels.readMore}</span>
                    <FaArrowRight className="text-pink-500 text-sm" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{estimateReadingTime(post.content || post.summary || "")}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full line-clamp-1">
                    {post.category}
                  </span>
                  <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                    <FaArrowRight className="text-pink-500 group-hover:text-white text-xs transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              {labels.noResultsTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
              {labels.noResultsDesc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
