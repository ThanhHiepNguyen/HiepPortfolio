import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import useLanguage from "../hooks/useLanguage.jsx";

function slugify(text) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function formatDate(dateString, language) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    } catch {
        return dateString;
    }
}

export default function BlogPost() {
    const { slug } = useParams();
    const { t, language } = useLanguage();

    // Structured curriculum/outlines keyed by slug
    const contentBySlug = useMemo(() => ({
        // React 30 days (VI/EN)
        "hoc-react-trong-30-ngay": {
            tocTitle: "Mục lục khóa học 30 ngày",
            sections: [
                { title: "Ngày 1: Cài đặt môi trường", points: ["Node.js, npm, Vite/CRA", "VSCode extensions", "Tạo dự án React đầu tiên"] },
                { title: "Ngày 2: JSX & Rendering", points: ["Cú pháp JSX", "Biểu thức trong JSX", "Fragment, key"] },
                { title: "Ngày 3: Component cơ bản", points: ["Function component", "Props & default props", "Chia nhỏ component"] },
                { title: "Ngày 4: useState", points: ["Quản lý state", "Bắt sự kiện", "Batching update"] },
                { title: "Ngày 5: useEffect", points: ["Effect theo dependency", "Cleanup", "Tránh lặp vô hạn"] },
                { title: "Ngày 6: Data fetching", points: ["fetch/axios", "Loading/Error UI", "AbortController"] },
                { title: "Ngày 7: Form cơ bản", points: ["Controlled vs uncontrolled", "Validation nhẹ", "Submit"] },
                { title: "Ngày 8: Lifting state up", points: ["Chia sẻ state giữa components", "Prop drilling"] },
                { title: "Ngày 9: Context", points: ["Tạo Context", "useContext", "Tránh lạm dụng"] },
                { title: "Ngày 10: useMemo & useCallback", points: ["Ghi nhớ giá trị/hàm", "Tối ưu re-render", "Pitfalls"] },
                { title: "Ngày 11: useRef", points: ["Ref DOM", "Biến không trigger render", "Focus, scroll"] },
                { title: "Ngày 12: Routing", points: ["React Router", "Route động, params", "Link, NavLink"] },
                { title: "Ngày 13: CSS & Tailwind", points: ["Utility-first", "Responsive", "Dark mode"] },
                { title: "Ngày 14: Component patterns", points: ["Compound components", "Controlled/Uncontrolled", "Render props"] },
                { title: "Ngày 15: State nâng cao", points: ["Reducer pattern", "Immer", "Xử lý bất đồng bộ"] },
                { title: "Ngày 16: Redux Toolkit", points: ["Slices", "Async thunks", "RTK Query tổng quan"] },
                { title: "Ngày 17: RTK Query", points: ["Query/Mutation", "Cache, revalidation", "Polling, pagination"] },
                { title: "Ngày 18: Form nâng cao", points: ["React Hook Form", "Zod/Yup", "Dynamic field arrays"] },
                { title: "Ngày 19: Tối ưu hiệu suất", points: ["Memoization", "Virtualization", "Code-splitting"] },
                { title: "Ngày 20: Error handling", points: ["Error boundaries", "Fallback UI", "Logging"] },
                { title: "Ngày 21: Testing", points: ["Jest", "React Testing Library", "Mock API"] },
                { title: "Ngày 22: Accessibility", points: ["ARIA", "Keyboard nav", "Color contrast"] },
                { title: "Ngày 23: i18n", points: ["Đa ngôn ngữ", "Tách file dịch", "Format ngày/tiền tệ"] },
                { title: "Ngày 24: SEO cơ bản", points: ["Meta tags", "Open Graph", "SSR/SSG với Next.js"] },
                { title: "Ngày 25: Animation", points: ["Framer Motion", "Transition nhóm", "Parallax nhẹ"] },
                { title: "Ngày 26: Realtime", points: ["WebSocket", "Firebase/Ably", "Sync UI"] },
                { title: "Ngày 27: Upload & Media", points: ["Upload file", "Preview", "Progress & retry"] },
                { title: "Ngày 28: Security cơ bản", points: ["XSS, CSRF", "Escape dữ liệu", "Auth token"] },
                { title: "Ngày 29: Deploy", points: ["Build tối ưu", "Vercel/Netlify", "Env & secret"] },
                { title: "Ngày 30: Tổng kết & Best Practices", points: ["Kiến trúc thư mục", "Naming & linting", "Review & roadmap"] }
            ]
        },
        "learn-react-in-30-days": {
            tocTitle: "30-Day Course Outline",
            sections: [
                { title: "Day 1: Environment Setup", points: ["Node.js, npm, Vite/CRA", "VSCode extensions", "Create first React app"] },
                { title: "Day 2: JSX & Rendering", points: ["JSX syntax", "Expressions", "Fragments, keys"] },
                { title: "Day 3: Basic Components", points: ["Function components", "Props & defaults", "Component composition"] },
                { title: "Day 4: useState", points: ["State updates", "Event handling", "Batching"] },
                { title: "Day 5: useEffect", points: ["Dependencies", "Cleanup", "Avoid loops"] },
                { title: "Day 6: Data fetching", points: ["fetch/axios", "Loading/Error UI", "AbortController"] },
                { title: "Day 7: Forms basics", points: ["Controlled vs uncontrolled", "Validation", "Submit"] },
                { title: "Day 8: Lifting state up", points: ["Share state", "Prop drilling"] },
                { title: "Day 9: Context", points: ["Create context", "useContext", "When to use"] },
                { title: "Day 10: useMemo/useCallback", points: ["Memo values/functions", "Optimize re-renders", "Pitfalls"] },
                { title: "Day 11: useRef", points: ["DOM refs", "Mutable values", "Focus/scroll"] },
                { title: "Day 12: Routing", points: ["React Router", "Dynamic routes", "Link/NavLink"] },
                { title: "Day 13: CSS & Tailwind", points: ["Utility-first", "Responsive", "Dark mode"] },
                { title: "Day 14: Component patterns", points: ["Compound", "Controlled/Uncontrolled", "Render props"] },
                { title: "Day 15: Advanced state", points: ["Reducer", "Immer", "Async flows"] },
                { title: "Day 16: Redux Toolkit", points: ["Slices", "Async thunks", "RTK Query intro"] },
                { title: "Day 17: RTK Query", points: ["Query/Mutation", "Cache", "Polling, pagination"] },
                { title: "Day 18: Advanced forms", points: ["React Hook Form", "Zod/Yup", "Dynamic fields"] },
                { title: "Day 19: Performance", points: ["Memoization", "Virtualization", "Code splitting"] },
                { title: "Day 20: Error handling", points: ["Error boundaries", "Fallback UI", "Logging"] },
                { title: "Day 21: Testing", points: ["Jest", "RTL", "Mock APIs"] },
                { title: "Day 22: Accessibility", points: ["ARIA", "Keyboard nav", "Contrast"] },
                { title: "Day 23: i18n", points: ["Multi-language", "Message files", "Date/currency formats"] },
                { title: "Day 24: SEO basics", points: ["Meta tags", "Open Graph", "SSR/SSG with Next"] },
                { title: "Day 25: Animations", points: ["Framer Motion", "Group transitions", "Parallax"] },
                { title: "Day 26: Realtime", points: ["WebSocket", "Firebase/Ably", "Sync UI"] },
                { title: "Day 27: Upload & Media", points: ["File uploads", "Preview", "Progress & retry"] },
                { title: "Day 28: Security basics", points: ["XSS, CSRF", "Escape data", "Auth tokens"] },
                { title: "Day 29: Deploy", points: ["Optimized build", "Vercel/Netlify", "Env & secrets"] },
                { title: "Day 30: Wrap-up & Best Practices", points: ["Folder structure", "Naming & linting", "Review & roadmap"] }
            ]
        },
        // Performance
        "toi-uu-hieu-suat-website": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Đo lường", points: ["Lighthouse", "Core Web Vitals", "RUM vs Lab"] },
                { title: "Tài nguyên", points: ["HTTP/2, nén", "Tối ưu ảnh", "Font loading"] },
                { title: "JS & React", points: ["Tách bundle", "Memo hóa", "Virtualize list"] },
                { title: "Mạng", points: ["Caching", "CDN", "Preload/Prefetch"] }
            ]
        },
        "website-performance-optimization": {
            tocTitle: "Outline",
            sections: [
                { title: "Measurement", points: ["Lighthouse", "CWV", "RUM vs Lab"] },
                { title: "Assets", points: ["HTTP/2, compression", "Images", "Fonts"] },
                { title: "JS & React", points: ["Code splitting", "Memo", "Virtualization"] },
                { title: "Network", points: ["Caching", "CDN", "Preload/Prefetch"] }
            ]
        },
        // Docker
        "huong-dan-su-dung-docker-cho-nguoi-moi-bat-dau": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Cơ bản", points: ["Image/Container", "Dockerfile", "Volumes"] },
                { title: "Thực hành", points: ["Dev env", "Compose", "Multi-stage build"] }
            ]
        },
        "beginners-guide-to-docker": {
            tocTitle: "Outline",
            sections: [
                { title: "Basics", points: ["Images/Containers", "Dockerfile", "Volumes"] },
                { title: "Hands-on", points: ["Dev env", "Compose", "Multi-stage build"] }
            ]
        },
        // REST
        "tim-hieu-ve-restful-api": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Khái niệm", points: ["Resource", "HTTP verbs", "Status codes"] },
                { title: "Thiết kế", points: ["Versioning", "Pagination", "Auth"] }
            ]
        },
        "understanding-restful-api": {
            tocTitle: "Outline",
            sections: [
                { title: "Concepts", points: ["Resources", "HTTP verbs", "Status codes"] },
                { title: "Design", points: ["Versioning", "Pagination", "Auth"] }
            ]
        },
        // Next.js
        "gioi-thieu-ve-next-js-cho-lap-trinh-vien-react": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Kiến trúc", points: ["File routing", "SSR/SSG/ISR", "Data fetching"] },
                { title: "SEO", points: ["Head metadata", "Image/Font", "Sitemap"] }
            ]
        },
        "introduction-to-next-js-for-react-developers": {
            tocTitle: "Outline",
            sections: [
                { title: "Architecture", points: ["File routing", "SSR/SSG/ISR", "Data fetching"] },
                { title: "SEO", points: ["Head metadata", "Image/Font", "Sitemap"] }
            ]
        },
        // SEO
        "toi-uu-seo-cho-website-react": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "On-page", points: ["Semantic HTML", "Meta", "Heading structure"] },
                { title: "Kỹ thuật", points: ["SSR/SSG", "Tối ưu ảnh", "Hiệu suất"] }
            ]
        },
        "seo-optimization-for-react-websites": {
            tocTitle: "Outline",
            sections: [
                { title: "On-page", points: ["Semantic HTML", "Meta", "Heading structure"] },
                { title: "Technical", points: ["SSR/SSG", "Images", "Performance"] }
            ]
        },
        // Redux Toolkit
        "quan-ly-trang-thai-voi-redux-toolkit": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Cốt lõi", points: ["Slice", "Store", "Middleware"] },
                { title: "Async", points: ["createAsyncThunk", "RTK Query", "Cache"] }
            ]
        },
        "state-management-with-redux-toolkit": {
            tocTitle: "Outline",
            sections: [
                { title: "Core", points: ["Slice", "Store", "Middleware"] },
                { title: "Async", points: ["createAsyncThunk", "RTK Query", "Cache"] }
            ]
        },
        // Firebase
        "trien-khai-ung-dung-fullstack-voi-firebase": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Dịch vụ", points: ["Auth", "Firestore", "Hosting"] },
                { title: "Thực hành", points: ["Triển khai", "Rules", "Security"] }
            ]
        },
        "deploying-fullstack-apps-with-firebase": {
            tocTitle: "Outline",
            sections: [
                { title: "Services", points: ["Auth", "Firestore", "Hosting"] },
                { title: "Hands-on", points: ["Deploy", "Rules", "Security"] }
            ]
        },
        // Security
        "cac-ky-thuat-bao-mat-co-ban-trong-lap-trinh-web": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Tổng quan", points: ["OWASP", "Threat model", "Defense-in-depth"] },
                { title: "Kỹ thuật", points: ["XSS, CSRF", "JWT", "CSP"] }
            ]
        },
        "basic-security-techniques-in-web-development": {
            tocTitle: "Outline",
            sections: [
                { title: "Overview", points: ["OWASP", "Threat model", "Defense-in-depth"] },
                { title: "Techniques", points: ["XSS, CSRF", "JWT", "CSP"] }
            ]
        },
        // Git
        "huong-dan-su-dung-git-co-ban": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Cơ bản", points: ["Init/Clone", "Commit/Branch", "Merge/Rebase"] },
                { title: "Quy trình", points: ["PRs", "Code review", "Tag/Release"] }
            ]
        },
        "basic-git-guide": {
            tocTitle: "Outline",
            sections: [
                { title: "Basics", points: ["Init/Clone", "Commit/Branch", "Merge/Rebase"] },
                { title: "Workflow", points: ["PRs", "Code review", "Tag/Release"] }
            ]
        },
        // VSCode React project
        "huong-dan-tao-du-an-react-tren-vscode": {
            tocTitle: "Đề cương nội dung",
            sections: [
                { title: "Khởi tạo", points: ["Vite/CRA", "Cấu trúc thư mục", "ESLint/Prettier"] },
                { title: "Năng suất", points: ["Extensions", "Snippets", "Debugging"] }
            ]
        },
        "creating-a-react-project-in-vscode": {
            tocTitle: "Outline",
            sections: [
                { title: "Initialize", points: ["Vite/CRA", "Folder structure", "ESLint/Prettier"] },
                { title: "Productivity", points: ["Extensions", "Snippets", "Debugging"] }
            ]
        }
    }), []);

    const post = useMemo(() => {
        if (!t?.blog?.posts) return null;
        return t.blog.posts
            .map((p) => ({ ...p, _slug: slugify(p.title) }))
            .find((p) => p._slug === slug);
    }, [t, slug]);

    if (!post) {
        return (
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 min-h-screen py-24">
                <div className="max-w-3xl mx-auto px-4">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-6">
                        <FaArrowLeft />
                        <span>{language === "vi" ? "Quay lại Blog" : "Back to Blog"}</span>
                    </Link>
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {language === "vi" ? "Không tìm thấy bài viết" : "Post not found"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {language === "vi" ? "Bài viết có thể đã bị di chuyển hoặc xóa." : "The post may have been moved or deleted."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 min-h-screen py-24">
            <div className="max-w-3xl mx-auto px-4">
                <Link to="/blog" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-6">
                    <FaArrowLeft />
                    <span>{language === "vi" ? "Quay lại Blog" : "Back to Blog"}</span>
                </Link>

                <article className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden">
                    {post.image && (
                        <div className="w-full bg-gray-100 dark:bg-dark-700">
                            <img src={post.image} alt={post.title} className="w-full h-72 object-contain" />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <FaCalendarAlt />
                            <span>{formatDate(post.date, language)}</span>
                            {post.category && (
                                <span className="ml-auto text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full">
                                    {post.category.split(" ").slice(0, 2).join(" ")}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
                        {post.summary && (
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{post.summary}</p>
                        )}

                        <div className="prose dark:prose-invert max-w-none">
                            {(() => {
                                const specific = contentBySlug[slug];
                                if (!specific) return null;
                                return (
                                    <>
                                        <h2>{specific.tocTitle}</h2>
                                        <ol>
                                            {specific.sections.map((section, idx) => (
                                                <li key={idx}>
                                                    <strong>{section.title}</strong>
                                                    {section.points && section.points.length > 0 && (
                                                        <ul>
                                                            {section.points.map((pt, i) => (
                                                                <li key={i}>{pt}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}


