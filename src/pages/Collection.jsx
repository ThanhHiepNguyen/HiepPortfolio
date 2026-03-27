import useLanguage from "../hooks/useLanguage.jsx";
import { FaPalette, FaCode, FaMobile, FaDesktop } from "react-icons/fa";

function Collection() {
  const { t } = useLanguage();
  if (!t) return null;

  const iconMap = { FaPalette, FaCode, FaMobile, FaDesktop };

  const collections = (t?.portfolio?.collections ?? []).map((c) => ({
    ...c,
    icon: iconMap[c.icon],
  }));

  return (
    <section className="relative bg-gray-50 dark:bg-dark-900 min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            {t.portfolio.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {collections.map((collection, collectionIndex) => {
            const Icon = collection.icon;
            return (
              <div
                key={collection.id ?? `collection-${collectionIndex}`}
                className={`group bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${collectionIndex % 2 === 1 ? "md:translate-y-8" : ""
                  }`}
              >
                <div className={`bg-gradient-to-r ${collection.color} p-6 relative`}>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/25 backdrop-blur-sm text-white border border-white/40 shadow-sm">
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {collection.title}
                        </h3>
                        <p className="text-white/90 text-sm mt-1 leading-relaxed">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/25 backdrop-blur-sm text-white border border-white/40 shadow-sm">
                      <span className="text-xs font-semibold tracking-widest uppercase">
                        {String(collection.items?.length ?? 0).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-[0.2em]">
                      Featured Works
                    </h4>
                    <div className="h-px flex-1 ml-4 bg-gradient-to-r from-gray-200 to-transparent dark:from-dark-600" />
                  </div>
                  <div className="space-y-3">
                    {collection.items.map((item, index) => (
                      <div
                        key={`${collection.id ?? `collection-${collectionIndex}`}-${item}-${index}`}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 bg-gradient-to-r ${collection.color} rounded-full`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {`${(index + 1).toString().padStart(2, "0")}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <div className="relative bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-lg max-w-3xl mx-auto overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-pink-200/40 dark:bg-pink-900/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-blue-200/40 dark:bg-blue-900/30 blur-2xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.portfolio.comingSoon.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto">
                {t.portfolio.comingSoon.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {t.portfolio.comingSoon.tags.map((tag, index) => (
                  <div
                    key={`${tag}-${index}`}
                    className="bg-pink-100/80 dark:bg-pink-900/50 px-4 py-2 rounded-full border border-pink-200 dark:border-pink-800 backdrop-blur-sm"
                  >
                    <span className="text-pink-600 dark:text-pink-400 text-sm font-medium">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
