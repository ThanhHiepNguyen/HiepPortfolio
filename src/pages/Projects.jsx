import useLanguage from "../hooks/useLanguage.jsx";

function Projects() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen py-24 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-6">
          {t.projects.title || "Đang cập nhật..."}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {t.projects.description ||
            "Phần dự án đang được hoàn thiện. Vui lòng quay lại sau!"}
        </p>
        <div className="mt-12 text-gray-400 text-sm">
          &mdash; Updating Projects Section &mdash;
        </div>
      </div>
    </section>
  );
}

export default Projects;
