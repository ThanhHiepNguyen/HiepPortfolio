import useLanguage from '../hooks/useLanguage';

function Projects() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 text-center mb-8">
          {t.projects.title}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          {t.projects.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.projects.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="bg-gray-300 h-40 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Ảnh / Image</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;