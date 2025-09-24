import { ref, get, onValue, off } from "firebase/database";
import { database } from "../config/firebase";

// Chuẩn hoá dữ liệu để khớp UI (object -> array, sửa key, v.v.)
function normalizeTranslation(raw = {}) {
    const clone = structuredClone(raw);

    // about
    clone.about = clone.about || {};
    const about = clone.about;

    // Avatar/Github -> avatar/github
    if (about.Avatar && !about.avatar) about.avatar = about.Avatar;
    if (about.Github && !about.github) about.github = about.Github;
    delete about.Avatar;
    delete about.Github;

    // skills -> arrays
    about.skills = about.skills || {};
    const sk = about.skills;
    sk.languages = Array.isArray(sk.languages) ? sk.languages : Object.values(sk.languages || {});
    sk.frameworks = Array.isArray(sk.frameworks) ? sk.frameworks : Object.values(sk.frameworks || {});
    sk.databases = Array.isArray(sk.databases) ? sk.databases : Object.values(sk.databases || {});
    sk.others = Array.isArray(sk.others) ? sk.others : Object.values(sk.others || {});
    about.skills = sk;

    // timeline -> array
    about.timeline = Array.isArray(about.timeline) ? about.timeline : Object.values(about.timeline || {});
    clone.about = about;

    // header
    clone.header = clone.header || {};
    const header = clone.header;
    header.menu = Array.isArray(header.menu) ? header.menu : Object.values(header.menu || {});
    header.contactOptions = Array.isArray(header.contactOptions)
        ? header.contactOptions
        : Object.values(header.contactOptions || {});
    clone.header = header;

    // home
    clone.home = clone.home || {};
    const home = clone.home;
    home.titles = Array.isArray(home.titles) ? home.titles : Object.values(home.titles || {});
    clone.home = home;

    // portfolio
    clone.portfolio = clone.portfolio || {};
    const pf = clone.portfolio;
    pf.collections = Array.isArray(pf.collections) ? pf.collections : Object.values(pf.collections || {});

    // Normalize collection items
    if (pf.collections) {
        pf.collections = pf.collections.map(collection => ({
            ...collection,
            items: Array.isArray(collection.items) ? collection.items : Object.values(collection.items || {})
        }));
    }

    if (pf.comingSoon) {
        const cs = pf.comingSoon;
        cs.tags = Array.isArray(cs.tags) ? cs.tags : Object.values(cs.tags || {});
        pf.comingSoon = cs;
    }
    clone.portfolio = pf;

    // blog
    clone.blog = clone.blog || {};
    const blog = clone.blog;
    blog.posts = Array.isArray(blog.posts) ? blog.posts : Object.values(blog.posts || {});
    clone.blog = blog;

    // projects
    clone.projects = clone.projects || {};
    const prj = clone.projects;
    prj.categories = Array.isArray(prj.categories) ? prj.categories : Object.values(prj.categories || {});
    prj.items = Array.isArray(prj.items) ? prj.items : Object.values(prj.items || {});

    // Normalize project items
    if (prj.items) {
        prj.items = prj.items.map(item => ({
            ...item,
            tech: Array.isArray(item.tech) ? item.tech : Object.values(item.tech || {}),
            features: Array.isArray(item.features) ? item.features : Object.values(item.features || {})
        }));
    }
    clone.projects = prj;

    // contact/footer: đảm bảo tồn tại object
    clone.contact = clone.contact || {};
    clone.footer = clone.footer || {};

    return clone;
}

export async function getI18nOnce(lang = "en") {
    const dbRef = ref(database, `HiepProfile/i18n/${lang}`);
    const snap = await get(dbRef);
    if (!snap.exists()) return null;
    return normalizeTranslation(snap.val());
}

export function subscribeI18n(lang = "en", cb) {
    const dbRef = ref(database, `HiepProfile/i18n/${lang}`);
    const handler = (snap) => {
        cb(snap.exists() ? normalizeTranslation(snap.val()) : null);
    };
    onValue(dbRef, handler);
    return () => off(dbRef, "value", handler);
}
