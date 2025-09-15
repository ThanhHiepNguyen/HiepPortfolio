import avatar from "../assets/Hiep.jpg";
import "../assets/styles/Loader.css";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black dark:bg-dark-900 bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50">
      <div className="loader">
        <img
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full z-10 border-4 border-white dark:border-dark-700"
        />
        <div className="ring"></div>
        <div className="ring yellow"></div>
        <div className="ring blue"></div>
      </div>
    </div>
  );
}
