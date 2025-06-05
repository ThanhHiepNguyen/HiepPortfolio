import { Link } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';

function Home() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
          {t.home.welcome}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          {t.home.description}
        </p>
        <Link
          to="/about"
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300"
        >
          {t.home.cta}
        </Link>
      </div>
    </section>
  );
}

export default Home;