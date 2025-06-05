import useLanguage from '../hooks/useLanguage';

function Contact() {
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi biểu mẫu (placeholder) / Handle form submission (placeholder)
    alert('Form submitted! / Biểu mẫu đã gửi!');
  };

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 text-center mb-8">
          {t.contact.title}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          {t.contact.description}
        </p>
        <div className="md:flex justify-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Biểu mẫu / Form */}
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{t.contact.form.name}</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{t.contact.form.email}</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{t.contact.form.message}</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition duration-300"
              >
                {t.contact.form.submit}
              </button>
            </form>
          </div>
          {/* Thông tin liên hệ / Contact info */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Kết nối với tôi / Connect with me</h3>
            <ul className="space-y-2">
              {t.header.contactOptions.map((option, index) => (
                <li key={index}>
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                  >
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;