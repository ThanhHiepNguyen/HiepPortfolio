import useLanguage from '../hooks/useLanguage';

function About() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 text-center mb-8">
          {t.about.title}
        </h1>
        <div className="md:flex items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Placeholder cho ảnh cá nhân / Placeholder for personal photo */}
          <div className="md:w-1/2">
            <div className="bg-gray-300 h-64 md:h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Ảnh cá nhân / Personal Photo</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-lg text-gray-600 mb-4">{t.about.description}</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Kỹ năng / Skills:</h2>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {t.about.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <p className="text-gray-600">{t.about.hobbies}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;