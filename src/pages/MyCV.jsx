import { useEffect, useState } from "react";
import useLanguage from "../hooks/useLanguage.jsx";
import LoadingScreen from "../components/LoadingScreen";
import { FiDownload, FiEye, FiX } from "react-icons/fi";

function MyCV() {
    const { t, language, loading } = useLanguage();
    const [showPDF, setShowPDF] = useState(false);

    // Show loading screen if Firebase data is still loading
    if (loading || !t) {
        return <LoadingScreen />;
    }

    const handleDownloadPDF = () => {
        // Tạo link download cho file PDF
        const link = document.createElement('a');
        link.href = '/cv.pdf'; // File CV sẽ được đặt trong thư mục public
        link.download = 'CV_Hiep.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewPDF = () => {
        setShowPDF(true);
    };

    const closePDFViewer = () => {
        setShowPDF(false);
    };

    return (
        <>
            {/* PDF Viewer Modal */}
            {showPDF && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-dark-800 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {t?.mycv?.previewTitle || "CV Preview"}
                            </h3>
                            <button
                                onClick={closePDFViewer}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
                            >
                                <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                        <div className="flex-1 p-4">
                            <iframe
                                src="/cv.pdf"
                                className="w-full h-full border-0 rounded"
                                title="CV Preview"
                            />
                        </div>
                    </div>
                </div>
            )}

            <section className="relative min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
                <div className="container mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {t?.mycv?.title || "My CV"}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t?.mycv?.description || "Download my latest resume in PDF format"}
                        </p>
                    </div>

                    {/* CV Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* CV Preview */}
                                <div className="flex-shrink-0">
                                    <div className="w-64 h-80 bg-gray-100 dark:bg-dark-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-600 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                <FiEye className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {t?.mycv?.previewText || "CV Preview"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CV Info */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {t?.mycv?.name || "Nguyen Thanh Hiep"}
                                    </h2>


                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {t?.mycv?.feature1 || "Professional Experience"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {t?.mycv?.feature2 || "Technical Skills"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {t?.mycv?.feature3 || "Education & Certifications"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {t?.mycv?.feature4 || "Projects & Achievements"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={handleViewPDF}
                                            className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
                                        >
                                            <FiEye className="w-5 h-5" />
                                            {t?.mycv?.previewButton || "Preview CV"}
                                        </button>
                                        <button
                                            onClick={handleDownloadPDF}
                                            className="flex items-center justify-center gap-2 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-dark-600 transition duration-300 shadow-sm"
                                        >
                                            <FiDownload className="w-5 h-5" />
                                            {t?.mycv?.downloadButton || "Download PDF"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t?.mycv?.noteTitle || "Note"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t?.mycv?.noteText || "This CV is updated regularly to reflect my latest skills and experiences. Feel free to contact me if you have any questions."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyCV;

