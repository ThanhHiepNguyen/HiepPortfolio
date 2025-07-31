import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import useLanguage from "./hooks/useLanguage";
import Footer from "./components/Footer";

function App() {
  const { language } = useLanguage();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home key={language} />} />
        <Route path="/about" element={<About key={language} />} />
        <Route path="/collection" element={<Collection key={language} />} />
        <Route path="/blog" element={<Blog key={language} />} />
        <Route path="/projects" element={<Projects key={language} />} />
        <Route path="/source-code" element={<Projects key={language} />} />
        <Route path="/contact" element={<Contact key={language} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
