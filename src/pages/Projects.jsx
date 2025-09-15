import { useState } from "react";
import useLanguage from "../hooks/useLanguage.jsx";
import { FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiVite,
  SiGit,
} from "react-icons/si";


function Projects() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = t.projects.items;
  const categories = t.projects.categories;

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="bg-gray-50 dark:bg-dark-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.projects.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.projects.description}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white dark:bg-dark-800 rounded-lg p-1 shadow-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${selectedCategory === category.id
                  ? "bg-pink-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-dark-700"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-dark-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    >
                      <FaGithub className="text-gray-800 dark:text-gray-200 text-xl" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-dark-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-gray-800 dark:text-gray-200 text-xl" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    <FaGithub />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                  >
                    <FaEye />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try selecting a different category or check back later for new projects.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
