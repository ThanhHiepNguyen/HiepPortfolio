import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import { FaCalendarAlt, FaClock, FaArrowRight, FaSearch, FaFilter, FaBookOpen } from "react-icons/fa";

function Blog() {
  const slugify = (text) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(t.blog.posts.map(post => post.category.split(" ")[0]))];

  // Filter posts based on search and category
  const filteredPosts = t.blog.posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-full mb-6">
            <FaBookOpen className="text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Blog & Articles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t.blog.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.blog.description}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              onClick={() => navigate(`/blog/${slugify(post.title)}`)}
              className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:scale-105"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
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
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Read More</span>
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

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
              Try adjusting your search terms or category filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">
                More amazing content coming soon! 🚀
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                I'm working on creating detailed blog posts about web development, React, and other cutting-edge technologies.
                Subscribe to stay updated with the latest insights and tutorials.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium">React</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium">JavaScript</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium">Web Dev</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium">UI/UX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
