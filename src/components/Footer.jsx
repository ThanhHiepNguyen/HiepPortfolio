import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import useLanguage from "../hooks/useLanguage.jsx";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto">
        <hr className="border-gray-300 dark:border-dark-600 mb-6" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.footer.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t.footer.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.footer.navigation}</h2>
          <ul className="space-y-2 text-sm">
            {t.header.menu.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-400 dark:hover:text-pink-400 transition duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.footer.connect}</h2>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">{t.footer.email}: nhiep3445@gmail.com</p>
          <div className="flex space-x-4 mt-3">
            <a
              href="https://github.com/ThanhHiepNguyen"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.instagram.com/thanhh.codes"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://web.facebook.com/thanhno.nguyen.946?locale=vi_VN"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10">
        © {new Date().getFullYear()}
        {t.footer.name} {t.footer.rights}
      </div>
    </footer>
  );
}

export default Footer;
