import { createContext, useContext, useEffect, useState } from "react";
import { getI18nOnce, subscribeI18n } from "../services/i18nService";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    let unsubscribe;
    let mounted = true;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getI18nOnce(language);
        if (mounted) setT(data);
      } catch {
        if (mounted) setError("Không tải được i18n từ Firebase.");
      } finally {
        if (mounted) setLoading(false);
      }
      unsubscribe = subscribeI18n(language, (data) => {
        if (!mounted) return;
        setT(data);
      });
    })();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "vi" ? "en" : "vi"));

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t, loading, error }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default function useLanguage() {
  return useContext(LanguageContext);
}
