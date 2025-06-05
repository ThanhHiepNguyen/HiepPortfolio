import useLanguage from '../hooks/useLanguage';

function Blog() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;