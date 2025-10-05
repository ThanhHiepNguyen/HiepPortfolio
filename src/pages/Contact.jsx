import { useState } from "react";
import useLanguage from "../hooks/useLanguage.jsx";
import {
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaExclamationCircle,
  FaSkype,
  FaFacebookMessenger,
} from "react-icons/fa";

function Contact() {
  const { t } = useLanguage();
  if (!t) return null;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-dark-900 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg order-2 lg:order-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t?.contact?.form?.title || "Contact form"}
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2">
                <FaCheckCircle />
                <span>Message sent successfully!</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
                <FaExclamationCircle />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {t?.contact?.form?.firstName || "First name"}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${errors.firstName
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                      }`}
                    placeholder={t?.contact?.form?.firstName || "First name"}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {t?.contact?.form?.lastName || "Last name"}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${errors.lastName
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                      }`}
                    placeholder={t?.contact?.form?.lastName || "Last name"}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                    }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t.contact.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors resize-none ${errors.message
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                    }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 disabled:bg-pink-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isSubmitting ? "Sending..." : t.contact.form.submit}
              </button>
            </form>
          </div>

          <div className="space-y-8 order-1 lg:order-1">
            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t?.contact?.availability?.label || "Call me"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t?.contact?.availability?.time}
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                  <FaPhone className="text-pink-600 dark:text-pink-400 text-xl" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {t?.contact?.availability?.phone}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t?.contact?.chat?.label || "Chat with me"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t?.contact?.chat?.message}
              </p>

              <div className="space-y-3">
                {Object.values(t?.contact?.chat?.options || {}).map((opt, idx) => {
                  const Icon = opt.icon === "FaSkype" ? FaSkype : opt.icon === "FaFacebookMessenger" ? FaFacebookMessenger : FaEnvelope;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                      <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg">
                        <Icon className="text-pink-600 dark:text-pink-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {opt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;