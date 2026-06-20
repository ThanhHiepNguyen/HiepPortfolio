import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useAnimate, stagger, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import avatar from '../assets/Hiep.jpg';
import { ref, push, set } from 'firebase/database';
import { database } from '../config/firebase';
import './Graduation.css';

const TARGET_DATE = new Date('2026-06-27T16:30:00').getTime();

/* ─── Flip Number Component ─── */
const FlipNumber = ({ value, label }) => {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
        prev.current = value;
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value]);

  const str = display.toString().padStart(2, '0');

  return (
    <div className="grad-flip-unit">
      <div className={`grad-flip-card ${flipping ? 'flipping' : ''}`}>
        <span className="grad-flip-top">{str}</span>
        <span className="grad-flip-bottom">{str}</span>
      </div>
      <span className="grad-flip-label">{label}</span>
    </div>
  );
};

/* ─── Water Drop Intro ─── */
const WaterDropIntro = ({ onDone }) => {
  const [phase, setPhase] = useState('text'); // 'text' | 'out'
  const introWords = 'Sự hiện diện của bạn là niềm vinh hạnh của tôi.'.split(' ');
  const totalDrop = introWords.length * 120 + 800;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), totalDrop + 2500);
    const t2 = setTimeout(() => onDoneRef.current(), totalDrop + 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="grad-water-scene"
      animate={phase === 'out' ? { opacity: 0, filter: 'blur(12px)' } : { opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
    >
      <div className="grad-water-text">
        <h1 className="grad-intro-heading">
          {introWords.map((w, i) => (
            <motion.span
              key={i}
              className="grad-intro-word"
              initial={{ opacity: 0, y: -120, scaleY: 1.3 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.22, 1.8, 0.36, 1], // spring-like overshoot — giọt nảy
                opacity: { duration: 0.15, delay: i * 0.12 },
              }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Ripple line bên dưới chữ — xuất hiện sau khi chữ đã đổ xuống */}
        <motion.div
          className="grad-ripple-line-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: totalDrop / 1000 + 0.1, duration: 0.4 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="grad-ripple-ring"
              initial={{ scaleX: 0, opacity: 0.7 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ delay: totalDrop / 1000 + i * 0.25, duration: 1.2, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Particle Orbs ─── */
const ParticleOrbs = () => {
  const orbs = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 150,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.07 + 0.03,
    hue: [220, 45, 260, 30, 200, 50][i],
  })), []);

  return (
    <div className="grad-orbs-layer">
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className="grad-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, hsla(${orb.hue},80%,70%,${orb.opacity}) 0%, transparent 70%)`,
          }}
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ─── Stars Background ─── */
const StarsBackground = () => {
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 0.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 6,
  })), []);



  return (
    <div className="grad-stars-layer">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="grad-star"
          style={{ width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%` }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

    </div>
  );
};

/* ─── Confetti ─── */
const Confetti = () => {
  const pieces = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#f0d080', '#fbbf24', '#ffffff', '#a78bfa', '#60a5fa', '#f472b6'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    rotate: Math.random() * 720,
    drift: (Math.random() - 0.5) * 200,
  })), []);

  return (
    <div className="grad-confetti-layer">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="grad-confetti-piece"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.5, background: p.color, borderRadius: 2 }}
          initial={{ y: -20, opacity: 0, rotate: 0, x: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: p.rotate, x: p.drift }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn', repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
        />
      ))}
    </div>
  );
};

/* ─── Main Component ─── */
const Graduation = () => {
  const [scope, animate] = useAnimate();
  const [step, setStep] = useState('intro');
  const [guestName, setGuestName] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [cardHover, setCardHover] = useState({ rotateX: 0, rotateY: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardRef = useRef(null);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const guestsRef = ref(database, 'guests');
      const newGuestRef = push(guestsRef);
      await set(newGuestRef, {
        name: guestName.trim(),
        timestamp: Date.now()
      });
    } catch (err) {
      console.error("Lỗi khi lưu lên Firebase:", err);
    } finally {
      setIsSubmitting(false);
      setStep('card');
    }
  };

  /* countdown */
  useEffect(() => {
    const fn = () => {
      const diff = TARGET_DATE - Date.now();
      if (diff > 0) setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    fn();
    const t = setInterval(fn, 1000);
    return () => clearInterval(t);
  }, []);

  /* intro: handled inside WaterDropIntro component */
  const goToCountdown = useCallback(() => setStep('countdown'), []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6;
    setCardHover({ rotateX: rx, rotateY: ry });
  };

  return (
    <div ref={scope} className="grad-root">
      {/* Background layers */}
      <div className="grad-bg-gradient" />
      <StarsBackground />
      <ParticleOrbs />


      <AnimatePresence mode="wait">

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <WaterDropIntro key="intro" onDone={goToCountdown} />
        )}

        {/* ── COUNTDOWN ── */}
        {step === 'countdown' && (
          <motion.div key="countdown" className="grad-step-layer"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="grad-countdown-wrap">

              {/* Title */}
              <motion.div className="grad-countdown-title-wrap"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <span className="grad-countdown-ornament">✦</span>
                <h2 className="grad-countdown-title">Lễ Tốt Nghiệp</h2>
                <span className="grad-countdown-ornament">✦</span>
              </motion.div>

              <motion.p className="grad-countdown-name"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.7 }}
              >
                Nguyễn Thành Hiệp
              </motion.p>

              {/* Flip numbers */}
              <motion.div className="grad-flip-row"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <FlipNumber value={timeLeft.days} label="Ngày" />
                <div className="grad-flip-sep-wrap"><span className="grad-flip-sep">:</span></div>
                <FlipNumber value={timeLeft.hours} label="Giờ" />
                <div className="grad-flip-sep-wrap"><span className="grad-flip-sep">:</span></div>
                <FlipNumber value={timeLeft.minutes} label="Phút" />
                <div className="grad-flip-sep-wrap"><span className="grad-flip-sep">:</span></div>
                <FlipNumber value={timeLeft.seconds} label="Giây" />
              </motion.div>

              {/* Date */}
              <motion.div className="grad-countdown-date-row"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.7 }}
              >
                <span className="grad-countdown-date-bar" />
                <p className="grad-countdown-date">27 · 06 · 2026 &nbsp;|&nbsp; 15:30</p>
                <span className="grad-countdown-date-bar" />
              </motion.div>

              {/* CTA */}
              <motion.button onClick={() => setStep('input')} className="grad-cta-btn"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(251,191,36,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Xác nhận tham dự</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>

            </div>
          </motion.div>
        )}

        {/* ── INPUT ── */}
        {step === 'input' && (
          <motion.div key="input" className="grad-step-layer"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.7 }}
          >
            <div className="grad-input-wrap">
              <p className="grad-input-title">Cho mình xin tên của bạn nhé 🌸</p>
              <form onSubmit={handleNameSubmit} className="grad-input-form">
                <div className="grad-input-field-wrap">
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="Nhập tên của bạn..."
                    autoFocus
                    className="grad-input-field"
                  />
                  <span className="grad-input-underline" />
                </div>
                <motion.button type="submit" disabled={!guestName.trim() || isSubmitting} className="grad-cta-btn"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? 'Đang lưu...' : 'Tiếp tục'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── CARD ── */}
        {step === 'card' && (
          <motion.div key="card" className="grad-card-outer"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.28, duration: 1.1 }}
          >
            <motion.div
              ref={cardRef}
              className="grad-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setCardHover({ rotateX: 0, rotateY: 0 })}
              animate={{ rotateX: cardHover.rotateX, rotateY: cardHover.rotateY, y: [-4, 4, -4] }}
              transition={{
                rotateX: { type: 'spring', stiffness: 120, damping: 20 },
                rotateY: { type: 'spring', stiffness: 120, damping: 20 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Nền ảnh */}
              <div className="grad-card-bg" />
              {/* Overlay tối trái để chữ dễ đọc */}
              <div className="grad-card-overlay" />
              <div className="grad-card-shimmer" />

              <div className="grad-card-inner">

                {/* ── CỘT TRÁI: thông tin ── */}
                <div className="grad-card-left">

                  <motion.div className="grad-card-year"
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >

                  </motion.div>

                  <motion.p className="grad-eyebrow"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    ✦ &nbsp;Trân trọng kính mời&nbsp; ✦
                  </motion.p>

                  <motion.h3 className="grad-guest-headline"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {guestName}
                  </motion.h3>

                  <motion.div className="grad-divider"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  >
                    <span className="grad-divider-bar" />
                    <div className="grad-divider-diamond" />
                    <span className="grad-divider-bar" />
                  </motion.div>

                  <motion.p className="grad-card-sublabel"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    đến tham dự Lễ Tốt Nghiệp của
                  </motion.p>

                  <motion.h2 className="grad-main-title"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                  >
                    Nguyễn Thành Hiệp
                  </motion.h2>

                  <motion.div className="grad-info-list"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.68, duration: 0.6 }}
                  >
                    <div className="grad-info-item">
                      <span className="grad-info-label">Thời gian</span>
                      <span className="grad-info-text">15h30 - Thứ Bảy, ngày 27/06/2026</span>
                    </div>
                    <div className="grad-info-item">
                      <span className="grad-info-label">Địa điểm</span>
                      <span className="grad-info-text">Khu Giảng đường Võ Oanh, Trường Đại học Giao thông vận tải TP.HCM</span>
                    </div>
                  </motion.div>

                  <motion.a
                    href="https://maps.app.goo.gl/PzF9EGao5KFCHcGW8"
                    target="_blank" rel="noreferrer"
                    className="grad-map-btn"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.82, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  >
                    <MapPin className="w-[18px] h-[18px]" />
                    <span>Xem Bản Đồ</span>
                    <ChevronRight className="w-[18px] h-[18px] ml-auto" />
                  </motion.a>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Graduation;
