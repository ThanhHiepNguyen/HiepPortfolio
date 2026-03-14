import { useEffect, useState } from "react";
import useLanguage from "../hooks/useLanguage.jsx";
import LoadingScreen from "../components/LoadingScreen";
import {
    FiDownload,
    FiEye,
    FiX,
    FiMail,
    FiPhone,
    FiMapPin,
    FiLink,
    FiGithub,
    FiBookOpen,
    FiBriefcase,
    FiAward,
    FiCheckCircle
} from "react-icons/fi";

const summaryText =
    "As a fresh graduate Node.js Backend Developer, I have built and maintained RESTful APIs, worked with relational and NoSQL databases, and solved complex coding challenges through academic projects. I am eager to learn new technologies and aspire to build scalable backend systems while contributing to real-world projects.";

const contactDetails = [
    {
        label: "Phone",
        value: "0393048626",
        href: "tel:0393048626",
        icon: FiPhone
    },
    {
        label: "Email",
        value: "nhiep3445@gmail.com",
        href: "mailto:nhiep3445@gmail.com",
        icon: FiMail
    },
    {
        label: "Location",
        value: "Ho Chi Minh City, Vietnam",
        href: "https://www.google.com/maps/place/Ho+Chi+Minh+City",
        icon: FiMapPin
    },
    {
        label: "GitHub",
        value: "ThanhHiepNguyen",
        href: "https://github.com/ThanhHiepNguyen/",
        icon: FiGithub
    }
];

const educationHistory = [
    {
        institution: "University of Transport Ho Chi Minh City",
        period: "09/2022 - Present",
        degree: "Bachelor - Information Technology",
        note: "Final-year student | GPA: 3.33/4.0"
    }
];

const skills = [
    {
        title: "Languages",
        items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"]
    },
    {
        title: "Runtime & Technologies",
        items: ["Node.js", "Redis", "Firebase"]
    },
    {
        title: "Frameworks & Libraries",
        items: ["Express.js", "NestJS", "React", "Tailwind CSS", "Bootstrap"]
    },
    {
        title: "Databases & ORM",
        items: ["PostgreSQL", "MongoDB", "Prisma"]
    },
    {
        title: "Backend & API Development",
        items: ["RESTful API", "CRUD", "JWT Authentication", "Role-Based Access Control (RBAC)", "MVC Architecture"]
    },
    {
        title: "Tools & Practices",
        items: [
            "Git",
            "GitHub",
            "Vercel",
            "Docker",
            "Docker Compose",
            "Postman",
            "Jira",
            "Confluence",
            "Cursor",
            "ChatGPT",
            "Basic System Design",
            "Database Design",
            "Problem Solving",
            "Teamwork",
            "Self-learning & Research"
        ]
    }
];

const experiences = [
    {
        company: "IriTech, Inc.",
        role: "Mobile Developer",
        period: "Apr 2025 - Jun 2025",
        summary: "Participated in biometric product development and polished user-facing workflows.",
        focus: ["Developed an Android iris recognition application using IriTech SDK.", "Implemented enrollment, identity verification, and data management with Room Database.", "Improved UI/UX with multi-language support (vi, en, zh, ko) and tested on real Android devices via Android Studio and ADB."]
    }
];

const projects = [
    {
        name: "FoodNow",
        role: "Full-stack Developer (Backend-focused)",
        period: "Nov 2025 - Dec 2025",
        description:
            "Built a multi-shop ordering platform with voucher handling, payment integrations, and RBAC-protected dashboards.",
        highlights: [
            "Built a multi-shop cart system that supports per-shop vouchers and automatic total calculation.",
            "Implemented end-to-end order workflows (pending → completed) with VNPay & COD payment integrations.",
            "Delivered RESTful APIs with validation, error handling, and RBAC authentication powered by JWT and Firebase Auth.",
            "Designed a PostgreSQL schema using Prisma ORM and created admin/shop dashboards for order & product management.",
            "Crafted the frontend experience using React, React Router, and Tailwind CSS."
        ],
        stack: [
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "Prisma ORM",
            "JWT",
            "React",
            "Vite",
            "React Router",
            "Tailwind CSS",
            "Docker",
            "Docker Compose"
        ],
        link: "https://github.com/ThanhHiepNguyen/FoodNow.git"
    },
    {
        name: "Vitify",
        role: "Backend Developer",
        period: "Jan 2026 - Mar 2026",
        description:
            "Delivered a modular NestJS backend for a mechanical fasteners e-commerce system with shopping cart, order, and review flows.",
        highlights: [
            "Designed modular NestJS services (Auth, User, Product, Category, Cart, Order, Payment, Review) with Prisma ORM.",
            "Implemented JWT authentication, RBAC, and DTO validation for secure endpoints.",
            "Built product & category APIs with filtering, pagination, and Redis-backed caching layers.",
            "Developed a Redis shopping cart plus COD order management with payment state tracking.",
            "Implemented product review and rating features backed by PostgreSQL."
        ],
        stack: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Redis", "JWT"],
        link: "https://github.com/ThanhHiepNguyen/Vitify.git"
    }
];

const certifications = [
    {
        title: "PTE Academic",
        detail: "Overall Score: 44"
    }
];

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

                    {/* Detailed Resume */}
                    <div className="max-w-5xl mx-auto mt-12 space-y-8">
                        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-10 bg-pink-500 rounded-full" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-pink-500">Profile</p>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Summary</h3>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">{summaryText}</p>
                        </section>

                        <section className="grid gap-6 md:grid-cols-2">
                            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700">
                                <div className="flex items-center gap-3">
                                    <FiLink className="w-6 h-6 text-pink-500" />
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-pink-500">Contact</p>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Reach out</h3>
                                    </div>
                                </div>
                                <ul className="mt-6 space-y-4">
                                    {contactDetails.map((detail) => {
                                        const Icon = detail.icon;
                                        return (
                                            <li key={detail.label} className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 shadow-inner">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {detail.label}
                                                    </p>
                                                    <a
                                                        href={detail.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm text-gray-600 dark:text-gray-300 break-all"
                                                    >
                                                        {detail.value}
                                                    </a>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700 flex flex-col">
                                <div className="flex items-center gap-3">
                                    <FiBookOpen className="w-6 h-6 text-pink-500" />
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-pink-500">Education</p>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Academic Background</h3>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4 flex-1">
                                    {educationHistory.map((edu) => (
                                        <article key={edu.institution} className="border-l-2 border-pink-500 pl-4 py-2">
                                            <div className="flex items-center justify-between gap-3">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {edu.institution}
                                                </h4>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{edu.degree}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{edu.note}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex items-center gap-3">
                                <FiBriefcase className="w-6 h-6 text-pink-500" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-pink-500">Strengths</p>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Technical Skills</h3>
                                </div>
                            </div>
                            <div className="grid gap-6 mt-6 md:grid-cols-2">
                                {skills.map((group) => (
                                    <div key={group.title}>
                                        <h4 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                            {group.title}
                                        </h4>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {group.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-200"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex items-center gap-3">
                                <FiBriefcase className="w-6 h-6 text-pink-500" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-pink-500">Experience</p>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Professional Journey</h3>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {experiences.map((experience) => (
                                    <article
                                        key={experience.company}
                                        className="border border-gray-200 dark:border-dark-700 rounded-2xl p-6 bg-gray-50 dark:bg-dark-900"
                                    >
                                        <div className="flex items-start justify-between gap-6">
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {experience.company}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{experience.role}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{experience.period}</span>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{experience.summary}</p>
                                        <ul className="mt-4 space-y-2">
                                            {experience.focus.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <FiCheckCircle className="mt-[3px] w-4 h-4 text-pink-500" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex items-center gap-3">
                                <FiAward className="w-6 h-6 text-pink-500" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-pink-500">Projects</p>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Selected Work</h3>
                                </div>
                            </div>
                            <div className="mt-6 space-y-6">
                                {projects.map((project) => (
                                    <article
                                        key={project.name}
                                        className="border border-gray-200 dark:border-dark-700 rounded-2xl p-6 bg-gray-50 dark:bg-dark-900"
                                    >
                                        <div className="flex items-start justify-between gap-6">
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {project.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{project.role}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{project.period}</span>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                                        <div className="mt-4">
                                            <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                                Highlights
                                            </h4>
                                            <ul className="mt-2 space-y-2">
                                                {project.highlights.map((line) => (
                                                    <li key={line} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <FiCheckCircle className="mt-[3px] w-4 h-4 text-pink-500" />
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={`${project.name}-${tech}`}
                                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 text-pink-600 dark:text-pink-300 font-semibold text-sm"
                                        >
                                            <FiGithub className="w-4 h-4" />
                                            View on GitHub
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div className="flex items-center gap-3">
                                <FiAward className="w-6 h-6 text-pink-500" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-pink-500">Certification</p>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Credentials</h3>
                                </div>
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {certifications.map((cert) => (
                                    <article
                                        key={cert.title}
                                        className="rounded-2xl border border-gray-200 dark:border-dark-700 p-5 bg-gray-50 dark:bg-dark-900"
                                    >
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{cert.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyCV;

