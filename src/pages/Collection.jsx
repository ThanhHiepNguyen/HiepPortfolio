import useLanguage from "../hooks/useLanguage.jsx";
import { FaPalette, FaCode, FaMobile, FaDesktop } from "react-icons/fa";

function Collection() {
  const { t } = useLanguage();
  if (!t) return null;

  // Map icon names to actual components
  const iconMap = {
    FaPalette: FaPalette,
    FaCode: FaCode,
    FaMobile: FaMobile,
    FaDesktop: FaDesktop
  };

  const collections = (t?.portfolio?.collections ?? []).map(collection => ({
    ...collection,
    icon: iconMap[collection.icon]
  }));

  return (
    <section className="bg-gray-50 dark:bg-dark-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.portfolio.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-r ${collection.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <collection.icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{collection.title}</h3>
                    <p className="text-white text-opacity-90 text-sm mt-1">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Featured Works:
                </h4>
                <div className="space-y-2">
                  {collection.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${collection.color} rounded-full`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t.portfolio.comingSoon.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t.portfolio.comingSoon.description}
            </p>
            <div className="flex justify-center space-x-4">
              {t.portfolio.comingSoon.tags.map((tag, index) => (
                <div key={index} className="bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-lg">
                  <span className="text-pink-600 dark:text-pink-400 text-sm font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
