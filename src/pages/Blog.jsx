import useLanguage from "../hooks/useLanguage.jsx";

function Blog() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container max-w-7xl px-4 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 text-center mb-8">
          {t.blog.title}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          {t.blog.description}
        </p>
        <div className="space-y-6">
          {t.blog.posts.map((post, index) => (
            <div
              key={index}
              onClick={() => alert("🚧 Đang cập nhật!")}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-md md:ml-4 md:my-4"
                />
              )}

              <div className="p-6 flex flex-col justify-between w-full">
                <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide mb-1">
                  {post.category}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {post.summary}
                </p>
                <p className="text-sm text-gray-400">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
