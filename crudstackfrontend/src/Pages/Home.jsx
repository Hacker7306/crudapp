import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const InstagramIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.65 6.5 7a4.8 4.8 0 0 0-1 3.03V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

const LinkedinIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
// ------------------------------------------------

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-60 blur-lg animate-glow" />
        <img
          src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
          alt="avatar"
          className="relative size-32 rounded-full border-4 border-zinc-800 shadow-xl z-10"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight font-geist drop-shadow-lg">
        Hi, I'm Aswinkrishna G
      </h1>
      <p className="text-xl md:text-2xl text-zinc-300 max-w-lg mx-auto font-inter font-normal">
        I craft beautiful, performant web experiences with React and modern UI frameworks.
      </p>
    </section>
  );
};

const socialLinks = [
  {
    href: 'https://www.instagram.com/__a_swiin_?igsh=azY3dm41bmN0M3g2',
    label: 'Instagram',
    icon: <InstagramIcon size={28} />,
    bg: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 border-none', // Authentic Instagram gradient
    text: 'text-white',
  },
  {
    href: 'https://github.com/Hacker7306',
    label: 'GitHub',
    icon: <GithubIcon size={28} />,
    bg: 'bg-zinc-800',
    text: 'text-white',
  },
  {
    href: 'https://www.linkedin.com/in/aswinkrishna-codez/', // Update with your actual LinkedIn URL
    label: 'LinkedIn',
    icon: <LinkedinIcon size={28} />,
    bg: 'bg-blue-600', // Standard LinkedIn brand blue
    text: 'text-white',
  },
];

const SocialsBlock = () => (
  <div className="flex flex-wrap justify-center gap-4 w-full font-inter">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        aria-label={link.label}
        className={twMerge(
          'flex items-center gap-2 rounded-full border border-zinc-800 px-7 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-opacity-80',
          link.bg,
          link.text,
        )}
        style={{ minWidth: 140, minHeight: 56 }}
        tabIndex={0}
      >
        {link.icon}
        <span>{link.label}</span>
      </a>
    ))}
  </div>
);

const AboutBlock = () => (
  <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-lg text-center font-inter">
    <p className="text-lg md:text-xl text-zinc-200 font-normal">
      Passionate about building elegant, accessible, and high-performance web apps.<br />Always learning, always sharing.
    </p>
  </div>
);

const ConnectSection = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateMessage = (msg) => {
    if (!msg.trim()) return "Message cannot be empty.";
    if (msg.trim().length < 3) return "Message must be at least 3 characters.";
    if (msg.length > 200) return "Message cannot exceed 200 characters.";
    return "";
  };

  const handleSend = (e) => {
    e.preventDefault();
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowToast(true);
    setMessage("");
    setError("");
    if (inputRef.current) inputRef.current.blur();
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (error) setError("");
  };

  return (
    <section className="w-full flex flex-col items-center text-center gap-4 mt-8 font-inter relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          Message sent!
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm mt-1 font-medium">{error}</div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 px-4 py-16 text-zinc-50 font-inter relative overflow-hidden">
      {/* Animated background blob */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-20 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div className="w-full max-w-2xl flex flex-col items-center gap-12 z-10">
        <HeroSection />
        <AboutBlock />
        <SocialsBlock />
        <ConnectSection />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        .font-inter { font-family: 'Inter', 'Geist', system-ui, sans-serif; }
        .font-geist { font-family: 'Geist', 'Inter', system-ui, sans-serif; }
      `}</style>
    </div>
  );
};

export default Home;