import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import MyCV from "./pages/MyCV";
import useLanguage from "./hooks/useLanguage";
import Footer from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";


function App() {
  const { language } = useLanguage();

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full relative bg-white dark:bg-dark-900">
        {/* Cool Blue Glow Top - với margin âm để phủ cả header */}
        <div
          className="absolute inset-x-0 -top-[120px] bottom-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
              radial-gradient(
                circle at top center,
                rgba(70, 130, 180, 0.5),
                transparent 70%
              )
            `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<Home key={language} />} />
            <Route path="/about" element={<About key={language} />} />
            <Route path="/collection" element={<Collection key={language} />} />
            <Route path="/blog" element={<Blog key={language} />} />
            <Route path="/projects" element={<Projects key={language} />} />
            <Route path="/source-code" element={<Projects key={language} />} />
            <Route path="/mycv" element={<MyCV key={language} />} />
            <Route path="/contact" element={<Contact key={language} />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
