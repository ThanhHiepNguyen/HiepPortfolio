import avatar from "../assets/Hiep.jpg";
import "../assets/styles/Loader.css";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="loader">
        <img
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full z-10"
        />
        <div className="ring"></div>
        <div className="ring yellow"></div>
        <div className="ring blue"></div>
      </div>
    </div>
  );
}
