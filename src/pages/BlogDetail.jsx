import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage.jsx";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";

function BlogDetail() {
  const { t, language } = useLanguage();
  const { slug } = useParams();
  const [activeHeading, setActiveHeading] = useState("");

  const slugify = (text = "") =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const posts = useMemo(() => {
    const raw = t?.blog?.posts ?? [];
    const list = Array.isArray(raw) ? raw : Object.values(raw);
    return list.filter(Boolean);
  }, [t?.blog?.posts]);

  const post = useMemo(() => posts.find((item) => slugify(item.title) === slug), [posts, slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const readingTime = (text = "") => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(3, Math.ceil(words / 200))} min read`;
  };

  const markdownText = post?.content || post?.summary || "";
  const categoryList = (post?.category || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const parsedMarkdown = useMemo(() => {
    const lines = markdownText.split("\n");
    const blocks = [];
    const toc = [];
    const usedIds = {};

    const createHeadingId = (text) => {
      const base = slugify(text || "section");
      const count = (usedIds[base] || 0) + 1;
      usedIds[base] = count;
      return count === 1 ? base : `${base}-${count}`;
    };

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        i += 1;
        continue;
      }

      if (trimmed.startsWith("```")) {
        const lang = trimmed.replace("```", "").trim();
        const codeLines = [];
        i += 1;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i += 1;
        }
        i += 1;
        blocks.push({ type: "code", lang, content: codeLines.join("\n") });
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = createHeadingId(text);
        blocks.push({ type: "heading", level, text, id });
        if (level >= 2 && level <= 3) toc.push({ level, text, id });
        i += 1;
        continue;
      }

      if (/^---+$/.test(trimmed)) {
        blocks.push({ type: "hr" });
        i += 1;
        continue;
      }

      if (/^[-*]\s+/.test(trimmed)) {
        const items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i += 1;
        }
        blocks.push({ type: "ul", items });
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i += 1;
        }
        blocks.push({ type: "ol", items });
        continue;
      }

      if (/^>\s+/.test(trimmed)) {
        blocks.push({ type: "quote", content: trimmed.replace(/^>\s+/, "") });
        i += 1;
        continue;
      }

      const paragraph = [];
      while (i < lines.length) {
        const p = lines[i].trim();
        if (
          !p ||
          p.startsWith("```") ||
          /^(#{1,6})\s+/.test(p) ||
          /^[-*]\s+/.test(p) ||
          /^\d+\.\s+/.test(p) ||
          /^>\s+/.test(p) ||
          /^---+$/.test(p)
        ) {
          break;
        }
        paragraph.push(lines[i]);
        i += 1;
      }
      if (paragraph.length) blocks.push({ type: "p", content: paragraph.join(" ") });
    }

    return { blocks, toc };
  }, [markdownText]);

  useEffect(() => {
    if (parsedMarkdown.toc.length === 0) return;

    const onScroll = () => {
      let current = parsedMarkdown.toc[0]?.id || "";
      for (const item of parsedMarkdown.toc) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActiveHeading(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [parsedMarkdown.toc]);

  if (!t) return null;

  if (!post) {
    return (
      <section className="bg-gray-50 dark:bg-dark-900 min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "vi" ? "Không tìm thấy bài viết" : "Post not found"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {language === "vi"
              ? "Bài viết có thể đã bị đổi tiêu đề hoặc chưa tồn tại."
              : "The article may have been renamed or does not exist."}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-pink-600 transition"
          >
            <FaArrowLeft />
            {language === "vi" ? "Quay lại Blog" : "Back to Blog"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gray-50 dark:bg-dark-900 min-h-screen py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_38%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[760px] rounded-full bg-pink-200/30 dark:bg-pink-900/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 font-medium mb-8 hover:underline bg-white/85 dark:bg-dark-800/80 px-4 py-2 rounded-full border border-pink-100/80 dark:border-pink-900/70 backdrop-blur"
        >
          <FaArrowLeft />
          {language === "vi" ? "Quay lại Blog" : "Back to Blog"}
        </Link>

        {parsedMarkdown.toc.length > 0 && (
          <div className="lg:hidden mb-6 bg-white/85 dark:bg-dark-800/85 border border-gray-100 dark:border-dark-700 rounded-2xl shadow p-5 backdrop-blur">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mb-4">
              {language === "vi" ? "Mục lục" : "Table of contents"}
            </h3>
            <nav className="space-y-2">
              {parsedMarkdown.toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-sm hover:text-pink-600 dark:hover:text-pink-400 transition ${item.level === 3 ? "pl-4 text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-200 font-medium"
                    }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-8 items-start">
          <aside className="hidden lg:block lg:order-1">
            <div className="sticky top-24 bg-white/85 dark:bg-dark-800/85 border border-gray-100 dark:border-dark-700 rounded-2xl shadow-lg p-5 backdrop-blur">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mb-4">
                {language === "vi" ? "Mục lục" : "Table of contents"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {language === "vi" ? "Chạm để nhảy nhanh tới từng phần." : "Tap to quickly jump between sections."}
              </p>
              {parsedMarkdown.toc.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "vi" ? "Bài viết không có đề mục." : "No headings available."}
                </p>
              ) : (
                <nav className="space-y-2">
                  {parsedMarkdown.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm rounded-lg px-2 py-1.5 transition ${activeHeading === item.id
                        ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300"
                        : item.level === 3
                          ? "pl-6 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
                          : "text-gray-700 dark:text-gray-200 font-medium hover:text-pink-600 dark:hover:text-pink-400"
                        }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          <article className="lg:order-2 bg-white/90 dark:bg-dark-800/90 border border-gray-100 dark:border-dark-700 rounded-3xl shadow-xl overflow-hidden backdrop-blur">
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-100 via-pink-50 to-blue-50 dark:from-dark-700 dark:via-dark-800 dark:to-dark-700">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]" />
              <img src={post.image} alt={post.title} className="w-full h-full object-contain" />
            </div>

            <div className="p-6 md:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2 mb-5">
                {categoryList.map((category) => (
                  <span
                    key={category}
                    className="inline-flex px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <span className="inline-flex items-center gap-2">
                  <FaCalendarAlt />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaClock />
                  {readingTime(markdownText)}
                </span>
              </div>

              <p className="text-base md:text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8 bg-gradient-to-r from-gray-50 via-pink-50/40 to-blue-50/50 dark:from-dark-700/60 dark:via-dark-700/50 dark:to-dark-700/60 border border-gray-100 dark:border-dark-600 rounded-2xl px-5 py-4">
                {post.summary}
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-dark-600 to-transparent mb-8" />

              <div className="space-y-5 text-gray-700 dark:text-gray-200 max-w-3xl">
                {parsedMarkdown.blocks.map((block, idx) => {
                  if (block.type === "heading") {
                    if (block.level === 1) {
                      return (
                        <h1 key={idx} id={block.id} className="scroll-mt-28 text-3xl font-extrabold text-gray-900 dark:text-white">
                          {block.text}
                        </h1>
                      );
                    }
                    if (block.level === 2) {
                      return (
                        <h2 key={idx} id={block.id} className="scroll-mt-28 text-2xl font-bold mt-8 text-gray-900 dark:text-white">
                          {block.text}
                        </h2>
                      );
                    }
                    return (
                      <h3 key={idx} id={block.id} className="scroll-mt-28 text-xl font-semibold mt-6 text-gray-900 dark:text-white">
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.type === "p") {
                    return (
                      <p key={idx} className="leading-8 text-[16px] md:text-[17px]">
                        {block.content}
                      </p>
                    );
                  }

                  if (block.type === "ul") {
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-2 leading-8">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "ol") {
                    return (
                      <ol key={idx} className="list-decimal pl-6 space-y-2 leading-8">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ol>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote key={idx} className="border-l-4 border-pink-400 pl-4 italic text-gray-600 dark:text-gray-300 bg-pink-50/40 dark:bg-pink-900/10 py-3 rounded-r-lg">
                        {block.content}
                      </blockquote>
                    );
                  }

                  if (block.type === "code") {
                    return (
                      <div key={idx} className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600">
                        {block.lang && (
                          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-300">
                            {block.lang}
                          </div>
                        )}
                        <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto leading-6">
                          <code>{block.content}</code>
                        </pre>
                      </div>
                    );
                  }

                  if (block.type === "hr") {
                    return <hr key={idx} className="border-gray-200 dark:border-dark-600 my-8" />;
                  }

                  return null;
                })}
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
