import { useEffect } from "react";
import useLanguage from "../hooks/useLanguage.jsx";
import avatar from "../assets/Hiep.jpg";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { FaGithub, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function About() {
  const { t } = useLanguage();
  const about = t.about;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white min-h-screen pb-20">
      <div className="relative bg-gradient-to-r from-pink-500 to-yellow-400 pt-20 pb-40 rounded-2xl max-w-6xl mx-auto px-4 mt-2 ">
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
          />
        </div>
      </div>

      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold text-gray-800">{about.name}</h1>
        <p className="text-gray-500 italic text-sm">"{about.quote}"</p>
      </div>

      <div className="max-w-[76rem] mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-2 text-pink-600">About me</h2>
            <p className="text-sm text-gray-700">{about.summary}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-2 text-pink-600">Contact</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-gray-800" />
                <span>{about.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-gray-800" />
                <span>{about.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <FaGithub className="text-xl" />
                <a
                  href="https://github.com/ThanhHiepNguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {about.Github}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-2 text-pink-600">Education</h2>
            <p className="text-sm">{about.education}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-2 text-pink-600">Key Skills</h2>
            {Object.entries(about.skills).map(([cat, list]) => (
              <div key={cat} className="mb-2">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  {cat}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-2 text-pink-600">Summary</h2>
            <p className="text-sm text-gray-700">{about.summary}</p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold mb-6 text-pink-600 ">Timeline</h2>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

              <div className="space-y-14">
                {about.timeline.map((item, idx) => (
                  <div key={idx} className="relative flex items-center">
                    {idx % 2 === 0 ? (
                      <>
                        <div className="w-1/2 flex justify-end pr-8 text-right items-center">
                          <div>
                            <p className="text-sm text-gray-500">{item.year}</p>
                          </div>
                        </div>

                        <div className="relative z-10">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow">
                            <MdOutlineEmojiPeople />
                          </div>
                        </div>

                        <div className="w-1/2 flex justify-start pl-8 text-left items-center">
                          <div>
                            <p className="font-bold text-sm text-gray-800">
                              {item.role}
                            </p>
                            <p className="text-sm text-pink-600 whitespace-nowrap">
                              {item.school}
                            </p>
                            {item.major && (
                              <p className="italic text-xs text-pink-500">
                                Major: {item.major}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 flex justify-end pr-8 text-right items-center">
                          <div>
                            <p className="font-bold text-sm text-gray-800">
                              {item.role}
                            </p>
                            <p className="text-sm text-pink-600">
                              {item.school}
                            </p>
                            {item.major && (
                              <p className="italic text-xs text-pink-500">
                                Major: {item.major}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative z-10">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow">
                            <MdOutlineEmojiPeople />
                          </div>
                        </div>

                        <div className="w-1/2 flex justify-start pl-8 text-left items-center">
                          <div>
                            <p className="text-sm text-gray-500">{item.year}</p>
                          </div>
                        </div>
                      </>
                    )}
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

export default About;
