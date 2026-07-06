import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, X, MapPin, Download, ArrowUpRight, ArrowDown, Award, BookOpen, User, Shield, Menu, Globe, Sparkles, Plane, TrainFront, Bus } from 'lucide-react';
import {
  ScrambleText, Reveal, TiltCard, SpotlightCard,
  Magnetic, CountUp, FlipUnit, Marquee, SectionHeading, SuccessCheck,
} from './conference/fx';

export default function AIConference({ playSound }) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', phone: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Form states
  const [abstractSubmitted, setAbstractSubmitted] = useState(false);
  const [abstractForm, setAbstractForm] = useState({
    name: '',
    email: '',
    title: '',
    session: 'deep-learning',
    abstract: ''
  });

  const [visaSubmitted, setVisaSubmitted] = useState(false);
  const [visaForm, setVisaForm] = useState({
    fullName: '',
    passportNumber: '',
    email: '',
    affiliation: '',
    visaOffice: ''
  });

  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    tier: 'Gold Sponsor',
    message: ''
  });

  useEffect(() => {
    const targetDate = new Date("September 14, 2026 09:00:00").getTime();
    const update = () => {
      const diff = targetDate - Date.now();
      if (diff < 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on tab change for clean transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleHover = () => { if (playSound) playSound('hover'); };
  const handleClick = () => { if (playSound) playSound('click'); };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setTicketSubmitted(true);

    fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ticketForm.name,
        phone: ticketForm.phone,
        email: ticketForm.email,
        service: `GCAI 2026 Ticket - ${selectedTicketType}`,
        message: `Registered for GCAI 2026 conference ticket pass. Type: ${selectedTicketType}`,
      }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => console.log("Ticket registration sent:", data))
      .catch((err) => console.error("Error sending ticket email:", err));

    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketModalOpen(false);
      setTicketForm({ name: '', email: '', phone: '' });
    }, 3000);
  };

  const openTicketModal = (type) => {
    handleClick();
    setSelectedTicketType(type);
    setTicketModalOpen(true);
  };

  const handleAbstractSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setAbstractSubmitted(true);

    fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: abstractForm.name,
        email: abstractForm.email,
        service: "GCAI 2026 Abstract Submission",
        message: `Abstract Title: ${abstractForm.title}\nSession Track: ${abstractForm.session}\nAbstract summary: ${abstractForm.abstract}`
      }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => console.log("Abstract registration sent:", data))
      .catch((err) => console.error("Error sending abstract email:", err));

    setTimeout(() => {
      setAbstractSubmitted(false);
      setAbstractForm({ name: '', email: '', title: '', session: 'deep-learning', abstract: '' });
    }, 4000);
  };

  const handleVisaSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setVisaSubmitted(true);

    fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: visaForm.fullName,
        email: visaForm.email,
        service: "GCAI 2026 Visa Assistance Request",
        message: `Passport Number: ${visaForm.passportNumber}\nAffiliation: ${visaForm.affiliation}\nVisa Office: ${visaForm.visaOffice}`
      }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => console.log("Visa request logged:", data))
      .catch((err) => console.error("Error sending visa request:", err));

    setTimeout(() => {
      setVisaSubmitted(false);
      setVisaForm({ fullName: '', passportNumber: '', email: '', affiliation: '', visaOffice: '' });
    }, 3000);
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setSponsorSubmitted(true);

    fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sponsorForm.contactName,
        phone: sponsorForm.phone,
        email: sponsorForm.email,
        service: `GCAI 2026 Sponsorship Inquiry - ${sponsorForm.tier}`,
        message: `Company: ${sponsorForm.company}\nMessage: ${sponsorForm.message}`
      }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => console.log("Sponsorship request logged:", data))
      .catch((err) => console.error("Error sending sponsorship request:", err));

    setTimeout(() => {
      setSponsorSubmitted(false);
      setSponsorForm({ company: '', contactName: '', email: '', phone: '', tier: 'Gold Sponsor', message: '' });
    }, 3000);
  };

  const talks = [
    {
      title: "Neural Network Modeling in Plant Pathology & Crop Adaptability",
      duration: "Extended 60 min session",
      speakers: "Dr. Rajnish Khanna",
      affiliation: "i-Cultiver, Inc. & Stanford University",
      initials: "RK",
      color: "#E11D48",
      time: "10:00 CEST",
      room: "Hall Alpha"
    },
    {
      title: "Algorithmic Genomic Mapping & Crop Biotech Forecasting",
      duration: "45 min panel discussion",
      speakers: "Dr. Jeremy Sweet",
      affiliation: "Sweet Environmental Consultants, UK",
      initials: "JS",
      color: "#0284C7",
      time: "11:30 CEST",
      room: "Hall Beta"
    },
    {
      title: "Predictive Bio-modeling & Photosynthesis Diagnostics via Deep Nets",
      duration: "40 min scientific session",
      speakers: "Prof. Costantino Paciolla",
      affiliation: "University of Bari Aldo Moro, Italy",
      initials: "CP",
      color: "#D97706",
      time: "14:00 CEST",
      room: "Hall Alpha"
    },
    {
      title: "Insect-Plant Evolutionary Defense Predictions using Generative AI",
      duration: "50 min panel session",
      speakers: "Dr. Jorge A. Zavala",
      affiliation: "University of Buenos Aires, Argentina",
      initials: "JZ",
      color: "#059669",
      time: "15:15 CEST",
      room: "Hall Gamma"
    }
  ];

  const sessions = [
    { id: 'deep-learning', title: "Deep Learning & Neural Architectures", desc: "Convolutional, recurrent, and transformer neural networks applied to genomic sequencing, protein folding, and complex biological state predictions." },
    { id: 'gen-ai', title: "Generative AI & LLMs in Sciences", desc: "Leveraging large language models and generative algorithms to parse massive volumes of scientific publications and synthesize metabolic hypotheses." },
    { id: 'computer-vision', title: "Computer Vision & Autonomous Systems", desc: "Real-time crop disease detection, phenotyping, and robotic automation using high-resolution spectral image classification and edge AI devices." },
    { id: 'bioinformatics', title: "Computational Bioinformatics & Systems Biology", desc: "Mapping cellular networks, modeling plant physiology, and predicting multi-omic system interactions through machine learning pipelines." },
    { id: 'climate', title: "AI-Driven Climate & Adaptation Models", desc: "Using historical weather data, satellite imagery, and crop yields to predict climate change impact and model evolutionary plant adaptation." },
    { id: 'precision-agri', title: "Precision Agronomy & Smart Agriculture", desc: "Sensor-fused soil diagnostics, predictive watering algorithms, and automated chemical sprays optimized via AI to increase yields." },
    { id: 'quantum', title: "Quantum Machine Learning", desc: "Exploring the horizon of quantum computing architectures for complex chemical molecular simulations and molecular breeding algorithms." },
    { id: 'ethics', title: "AI Governance, Safety & Open Science", desc: "Addressing data biases, ethical frameworks for synthetic biology, security protocols for custom bio-architectures, and open-source models." }
  ];

  const speakers = [
    { initials: 'RK', name: 'Dr. Rajnish Khanna', org: 'Stanford / i-Cultiver', color: '#E11D48', gradient: 'linear-gradient(135deg, #E11D48 0%, #8B5CF6 100%)', photo: 'https://randomuser.me/api/portraits/men/32.jpg', bio: 'Leading pioneer in applying neural modeling to analyze photosynthesis pathways and plant development networks under extreme biological stress.' },
    { initials: 'JS', name: 'Dr. Jeremy Sweet', org: 'Environmental Advisor, UK', color: '#0284C7', gradient: 'linear-gradient(135deg, #0284C7 0%, #059669 100%)', photo: 'https://randomuser.me/api/portraits/men/52.jpg', bio: 'Specialist in algorithmic biosafety and crop forecasting, advising international boards on ecological impact models.' },
    { initials: 'CP', name: 'Prof. Costantino Paciolla', org: 'University of Bari, Italy', color: '#D97706', gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)', photo: 'https://randomuser.me/api/portraits/men/75.jpg', bio: 'Expert biochemist utilizing deep neural networks to diagnostic cellular defense mechanisms in Mediterranean crops.' },
    { initials: 'JZ', name: 'Dr. Jorge A. Zavala', org: 'University of Buenos Aires', color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #3B82F6 100%)', photo: 'https://randomuser.me/api/portraits/men/41.jpg', bio: 'Pioneering study in insect-plant defense predictions and environmental adaptations driven by generative machine learning algorithms.' },
  ];

  const speakerPhotos = {
    RK: 'https://randomuser.me/api/portraits/men/32.jpg',
    JS: 'https://randomuser.me/api/portraits/men/52.jpg',
    CP: 'https://randomuser.me/api/portraits/men/75.jpg',
    JZ: 'https://randomuser.me/api/portraits/men/41.jpg',
  };

  const committee = [
    { initials: 'MB', name: 'Dr. M. Ben Massoud', org: 'Dublin University, Ireland', color: '#0284C7' },
    { initials: 'SL', name: 'Dr. Sarah L.', org: 'Cambridge Biotech Institute', color: '#E11D48' },
    { initials: 'HG', name: 'Prof. Hans G.', org: 'Technical University Munich', color: '#D97706' },
    { initials: 'AM', name: 'Dr. Akira M.', org: 'Kyoto Agri-Systems Lab', color: '#059669' },
  ];

  const testimonials = [
    { initials: 'VJ', name: 'Victor Janin', handle: '@victor_janin', color: '#E11D48', quote: 'If you are into deep learning, GCAI is the site you need to follow. Their panels, models, and conferences have been invaluable. Accompanying tools and speakers are 10/10.' },
    { initials: 'DP', name: 'Dimitra P.', handle: '@dimitrap_ai', color: '#0284C7', quote: 'It is a real science showcase. It’s incredible to see how many researchers and engineers are joining in. Highly recommended! #GCAI2026' },
    { initials: 'DM', name: 'Darwin Mador', handle: '@darwin_m', color: '#D97706', quote: 'Attending GCAI was the best decision! It’s practically ACCREDITED and keeps the research community focused on future-proofed solutions.' },
  ];

  const faqs = [
    { q: "How do I attend the conference virtually?", a: "Once registered, you will receive a secure portal link and log-in credentials to access the high-definition GCAI 2026 live streaming channels and virtual networking rooms on September 14." },
    { q: "Will I receive a professional certificate of attendance?", a: "Yes. All registered presenter and delegate attendees will receive an official CPD-accredited Attendance Certificate and detailed credit hours log sheet post-event." },
    { q: "What is the policy for abstract submissions?", a: "All abstract summaries are reviewed by 3 program committee reviewers. Authors of approved abstracts will be invited to submit camera-ready papers or prepare poster showcases." },
    { q: "Can I transfer my pass to a colleague?", a: "Yes. Ticket registrations can be fully transferred to any colleague or university affiliate up to 5 days before the event (September 9, 2026) by contacting support." }
  ];

  const passes = [
    { type: 'Oral Presenter Pass', price: 499, desc: 'For researchers submitting abstracts and delivering oral presentations during scientific sessions.', tag: 'Presenter' },
    { type: 'Poster Presenter Pass', price: 399, desc: 'For presenters displaying poster sessions during the research showcase slots.', tag: 'Presenter' },
    { type: 'Delegate Entry Pass', price: 279, desc: 'For corporate, academic, or industry representatives attending sessions and networking events.', tag: 'Most Popular', highlight: true },
    { type: 'Virtual Attendee Pass', price: 149, desc: 'For remote delegates watching live broadcasts and obtaining e-certification CPD records.', tag: 'Remote' },
    { type: 'Team Pass (5x)', price: 1199, desc: 'Full credentials access for 5 team colleagues, including group breakout workspace lounges.', tag: 'Teams' },
    { type: 'Recordings Only Pass', price: 199, desc: 'Full download recordings library links and complete slide deck pdf catalogs sent post-event.', tag: 'On-Demand' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'abstract', label: 'Abstracts' },
    { id: 'venue', label: 'Venue' },
    { id: 'sponsors', label: 'Sponsors' },
  ];

  const inputBase = { padding: '0.95rem 1.15rem', fontSize: '0.9rem', outline: 'none' };
  const labelBase = { fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', color: 'rgba(20, 22, 46,0.45)', letterSpacing: '1.2px' };
  const fieldCol = { display: 'flex', flexDirection: 'column', gap: '0.55rem' };

  return (
    <div style={{ background: '#F6F7FB', color: '#14162E', minHeight: '100vh', fontFamily: 'var(--font-body)', position: 'relative', overflowX: 'clip' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .gcai-root {
          --gc-display: 'Poppins', var(--font-display), sans-serif;
          --gc-body: 'Poppins', var(--font-body), sans-serif;
          --accent: #B45309;
          --gc-ink: #14162E;
          font-family: var(--gc-body);
          font-weight: 400;
          color: var(--gc-ink);
        }
        .gcai-root h1, .gcai-root h2, .gcai-root h3, .gcai-root h4 { color: #14162E; }

        .gcai-display { font-family: var(--gc-display); }
        .serif-font {
          font-family: var(--gc-display) !important;
          font-style: normal !important;
          font-weight: 300 !important;
          letter-spacing: 0.01em;
        }

        .gcai-grid-bg {
          background-image:
            linear-gradient(rgba(20, 22, 46, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 22, 46, 0.045) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 75%);
        }

        /* ------------------------------------------------ HEADER */
        .conf-banner-bar {
          background: linear-gradient(90deg, #FBF3E7, #EEF5FA 50%, #FAEEF0);
          border-bottom: 1px solid rgba(20, 22, 46, 0.08);
          padding: 0.5rem 1.5rem;
          text-align: center;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.6px;
          color: rgba(20, 22, 46, 0.85);
          position: fixed;
          top: 0; left: 0; width: 100%;
          z-index: 1001;
        }

        .conf-header {
          position: fixed;
          top: 30px; left: 0; width: 100%;
          z-index: 1000;
          transition: background 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        .conf-header.is-scrolled {
          background: rgb(255 255 255 / 0.96);
          border-bottom-color: rgba(20, 22, 46, 0.08);
        }

        .conf-logo {
          font-family: var(--gc-display);
          font-weight: 500;
          letter-spacing: -0.5px;
          font-size: 1.2rem;
          color: #14162E;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: none;
        }
        .conf-logo-orb {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffe97a, #ffde42 55%, #B8960A);
          box-shadow: 0 0 10px rgba(216, 160, 12, 0.7), 0 0 26px rgba(216, 160, 12, 0.3);
        }

        .conf-nav-link {
          position: relative;
          font-size: 0.82rem;
          font-weight: 500;
          font-family: var(--gc-display);
          color: rgba(20, 22, 46, 0.55);
          background: none;
          border: none;
          padding: 0.4rem 0.2rem;
          letter-spacing: 0.3px;
          cursor: none;
          transition: color 0.25s;
        }
        .conf-nav-link:hover, .conf-nav-link.active { color: #14162E; }

        /* ------------------------------------------------ BUTTONS */
        .conf-btn-gold {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(180deg, #ffe97a, #ffde42 55%, #E8C520);
          color: #0A0800;
          font-weight: 600;
          font-family: var(--gc-display);
          font-size: 0.8rem;
          padding: 0.7rem 1.5rem;
          border-radius: 100px;
          border: none;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 22px rgba(216, 160, 12, 0.30), inset 0 1px 0 rgb(255 255 255 / 0.6);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
          cursor: none;
          overflow: hidden;
        }
        .conf-btn-gold::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.75), transparent);
          transform: skewX(-25deg);
          transition: left 0.6s ease;
        }
        .conf-btn-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 12px 34px rgba(216, 160, 12, 0.45), inset 0 1px 0 rgb(255 255 255 / 0.6); }
        .conf-btn-gold:hover::after { left: 130%; }

        .conf-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: rgb(255 255 255 / 0.5);
          border: 1px solid rgba(2, 132, 199, 0.35);
          color: #0284C7;
          font-weight: 500;
          font-family: var(--gc-display);
          font-size: 0.8rem;
          padding: 0.7rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none;
        }
        .conf-btn-ghost:hover {
          background: rgba(2, 132, 199, 0.1);
          border-color: #0284C7;
          color: #075985;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.18);
          transform: translateY(-2px);
        }

        /* ------------------------------------------------ SECTIONS */
        .section { padding: 7rem 0; position: relative; }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.72rem;
          font-weight: 500;
          font-family: var(--gc-display);
          text-transform: uppercase;
          color: #A16207;
          letter-spacing: 3.5px;
          padding: 0.45rem 1rem;
          border: 1px solid rgba(180, 83, 9, 0.25);
          border-radius: 100px;
          background: rgba(217, 119, 6, 0.06);
          margin-bottom: 1.4rem;
        }
        .section-kicker-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D97706;
          box-shadow: 0 0 8px rgba(217, 119, 6, 0.7);
        }

        .section-title {
          font-family: var(--gc-display);
          font-size: clamp(2rem, 5vw, 3.3rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0;
        }

        .section-ghost {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -58%);
          font-family: var(--gc-display);
          font-size: clamp(4.5rem, 15vw, 12rem);
          font-weight: 500;
          letter-spacing: -0.05em;
          white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1px rgba(20, 22, 46, 0.07);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* ------------------------------------------------ HERO */
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          border: 1px solid rgba(20, 22, 46, 0.12);
          background: rgb(255 255 255 / 0.65);
          font-family: var(--gc-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(20, 22, 46, 0.75);
        }

        .hero-title {
          font-family: var(--gc-display);
          font-size: clamp(3.2rem, 11.5vw, 8.5rem);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.025em;
          margin: 0;
          background: linear-gradient(115deg, #14162E 30%, #D97706 50%, #0284C7 65%, #14162E 85%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--gc-display);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(20, 22, 46, 0.78);
          padding: 0.55rem 1.1rem;
          border-radius: 100px;
          border: 1px solid rgba(20, 22, 46, 0.1);
          background: rgb(255 255 255 / 0.7);
        }

        /* ------------------------------------------------ FLIP COUNTDOWN */
        .flip-unit { display: flex; flex-direction: column; align-items: center; gap: 0.7rem; }
        .flip-unit-digits { display: flex; gap: 5px; }
        .flip-digit-window {
          width: 46px; height: 64px;
          border-radius: 12px;
          background: linear-gradient(180deg, #FFFFFF, #F4F6FB);
          border: 1px solid rgba(20, 22, 46, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9), 0 12px 26px rgba(20, 22, 46, 0.08);
        }
        .flip-digit-window::after {
          content: '';
          position: absolute;
          left: 8%; right: 8%; top: 50%;
          height: 1px;
          background: rgba(20, 22, 46, 0.07);
        }
        .flip-digit {
          font-family: var(--gc-display);
          font-variant-numeric: tabular-nums;
          font-size: 2rem;
          font-weight: 500;
          color: #B45309;
        }
        .flip-unit-label {
          font-family: var(--gc-display);
          font-size: 0.62rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(20, 22, 46, 0.45);
        }

        /* ------------------------------------------------ MARQUEE */
        .fx-marquee {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .fx-marquee-track {
          display: flex;
          width: max-content;
          animation-name: fx-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .fx-marquee:hover .fx-marquee-track { animation-play-state: paused; }
        .fx-marquee-group { display: flex; align-items: center; gap: 4.5rem; padding-right: 4.5rem; }
        @keyframes fx-marquee-scroll { to { transform: translateX(-50%); } }
        .marquee-logo {
          font-family: var(--gc-display);
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: -0.5px;
          color: rgba(20, 22, 46, 0.38);
          white-space: nowrap;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .marquee-logo:hover { color: #14162E; }

        /* ------------------------------------------------ CARDS */
        .bento-card {
          background: #FFFFFF;
          border: 1px solid rgba(20, 22, 46, 0.09);
          border-radius: 22px;
          box-shadow: 0 2px 10px rgba(20, 22, 46, 0.04);
          transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bento-card:hover {
          border-color: rgba(217, 119, 6, 0.45);
          box-shadow: 0 24px 50px rgba(20, 22, 46, 0.12);
          transform: translateY(-4px);
        }

        .conic-frame { position: relative; border-radius: 22px; }
        .conic-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(from var(--angle, 0deg),
            transparent 0deg, rgba(217, 119, 6, 0.9) 40deg, transparent 90deg,
            transparent 180deg, rgba(2, 132, 199, 0.9) 220deg, transparent 270deg);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 2;
        }

        .avatar-ring {
          position: relative;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, var(--ring-a, #D97706), transparent 30%, var(--ring-a, #D97706) 55%, transparent 80%, var(--ring-a, #D97706));
        }

        /* ------------------------------------------------ TALK TIMELINE */
        .talk-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 1.6rem;
          border-radius: 18px;
          border: 1px solid transparent;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .talk-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--talk-c, var(--accent));
          transform: scaleY(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 3px;
        }
        .talk-row:hover {
          background: #FFFFFF;
          border-color: rgba(20, 22, 46, 0.09);
          box-shadow: 0 14px 34px rgba(20, 22, 46, 0.08);
          transform: translateX(8px);
        }
        .talk-row:hover::before { transform: scaleY(1); }
        .talk-index {
          font-family: var(--gc-display);
          font-size: 2.6rem;
          font-weight: 500;
          color: transparent;
          -webkit-text-stroke: 1px rgba(20, 22, 46, 0.25);
          line-height: 1;
          transition: all 0.4s;
          flex-shrink: 0;
          width: 70px;
        }
        .talk-row:hover .talk-index { -webkit-text-stroke: 1px var(--talk-c, var(--accent)); }

        /* ------------------------------------------------ TICKETS */
        .ticket-pass {
          position: relative;
          background: #FFFFFF;
          border: 1px solid rgba(20, 22, 46, 0.09);
          border-radius: 22px;
          padding: 2.4rem 2.2rem 2.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(20, 22, 46, 0.04);
          transition: border-color 0.4s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s;
        }
        .ticket-pass:hover {
          transform: translateY(-8px);
          border-color: rgba(217, 119, 6, 0.5);
          box-shadow: 0 28px 55px rgba(20, 22, 46, 0.13);
        }
        .ticket-divider {
          position: relative;
          border-top: 2px dashed rgba(20, 22, 46, 0.14);
          margin: 1.6rem -2.2rem 1.4rem;
        }
        .ticket-divider::before, .ticket-divider::after {
          content: '';
          position: absolute;
          top: -11px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #F6F7FB;
          border: 1px solid rgba(20, 22, 46, 0.1);
        }
        .ticket-divider::before { left: -11px; }
        .ticket-divider::after { right: -11px; }
        .ticket-tag {
          display: inline-flex;
          font-family: var(--gc-display);
          font-size: 0.62rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 0.35rem 0.8rem;
          border-radius: 100px;
          border: 1px solid rgba(20, 22, 46, 0.16);
          color: rgba(20, 22, 46, 0.6);
          margin-bottom: 1.2rem;
        }
        .ticket-tag.hot {
          border-color: rgba(217, 119, 6, 0.55);
          color: #A16207;
          background: rgba(217, 119, 6, 0.07);
          box-shadow: 0 0 18px rgba(217, 119, 6, 0.14);
        }
        .ticket-price {
          font-family: var(--gc-display);
          font-size: 2.6rem;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ------------------------------------------------ INPUTS */
        .glass-input {
          background: #FAFBFE !important;
          border: 1px solid rgba(20, 22, 46, 0.14) !important;
          border-radius: 14px !important;
          color: #14162E !important;
          font-family: var(--gc-body) !important;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s !important;
          cursor: text !important;
        }
        .glass-input:focus {
          border-color: #D97706 !important;
          background: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.14) !important;
        }
        .glass-input::placeholder { color: rgba(20, 22, 46, 0.32); }

        /* ------------------------------------------------ SPONSOR TABLE */
        .sponsor-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 1.6rem; font-size: 0.88rem; }
        .sponsor-table th, .sponsor-table td {
          border-bottom: 1px solid rgba(20, 22, 46, 0.09);
          padding: 1.05rem 1.2rem;
          text-align: left;
        }
        .sponsor-table th {
          font-family: var(--gc-display);
          background: rgba(20, 22, 46, 0.03);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.75rem;
        }
        .sponsor-table th:first-child { border-radius: 12px 0 0 0; }
        .sponsor-table th:last-child { border-radius: 0 12px 0 0; }
        .sponsor-table tbody tr { transition: background 0.25s; }
        .sponsor-table tbody tr:hover { background: rgba(217, 119, 6, 0.04); }

        /* ------------------------------------------------ FAQ */
        .faq-item {
          border: 1px solid rgba(20, 22, 46, 0.1);
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(20, 22, 46, 0.03);
          transition: border-color 0.35s, background 0.35s;
          overflow: hidden;
        }
        .faq-item.open { border-color: rgba(217, 119, 6, 0.45); background: rgba(217, 119, 6, 0.025); }
        .faq-item:hover { border-color: rgba(20, 22, 46, 0.22); }

        /* ------------------------------------------------ SCROLL HINT */
        .scroll-hint {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(20, 22, 46, 0.4);
          font-family: var(--gc-display);
          font-size: 0.62rem;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* ------------------------------------------------ RESPONSIVE */
        @media (max-width: 768px) {
          .section { padding: 4rem 0 !important; }
          .conf-banner-bar { font-size: 0.6rem; padding: 0.45rem 0.8rem; }
          .conf-nav-container { display: none !important; }
          .conf-menu-btn { display: inline-flex !important; }
          .conf-desktop-btn { display: none !important; }
          .flip-digit-window { width: 34px; height: 50px; }
          .flip-digit { font-size: 1.45rem; }
          .responsive-grid-2 { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .responsive-grid-3 { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .talk-row { flex-direction: column; align-items: flex-start !important; gap: 1rem !important; padding: 1.5rem 1rem !important; }
          .talk-index { width: auto; font-size: 1.8rem; }
          .hero-cta-row { flex-direction: column; width: 100%; }
          .section-ghost { display: none; }
          .stats-band { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fx-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* FILM GRAIN */}

      <div className="gcai-root">

        {/* DEADLINES ANNOUNCEMENT BAR */}
        <div className="conf-banner-bar">
          <span>Important Deadlines — Abstract Submission: <strong style={{ color: 'var(--accent)' }}>August 10, 2026</strong> &nbsp;•&nbsp; Early Bird Registration: <strong style={{ color: 'var(--accent)' }}>August 15, 2026</strong></span>
        </div>

        {/* NAV HEADER */}
        <header className={`conf-header ${scrolled ? 'is-scrolled' : ''}`}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="#ai-conference" className="conf-logo" onMouseEnter={handleHover} onClick={(e) => { e.preventDefault(); handleClick(); setActiveTab('home'); }}>
              <div className="conf-logo-orb" />
              GCAI<span style={{ color: 'var(--accent)' }}>&nbsp;CON</span>&nbsp;2026
            </a>

            <nav className="conf-nav-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`conf-nav-link ${activeTab === item.id ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => { handleClick(); setActiveTab(item.id); }}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', left: 0, right: 0, bottom: '-4px', height: '2px',
                        background: 'linear-gradient(90deg, var(--accent), #0284C7)',
                        borderRadius: '2px', boxShadow: '0 0 10px rgba(180, 83, 9,0.6)',
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Magnetic strength={0.25}>
                <button onClick={() => { handleClick(); setActiveTab('registration'); }} className="conf-btn-gold conf-desktop-btn" onMouseEnter={handleHover}>
                  Register Seat
                </button>
              </Magnetic>

              <button
                className="conf-menu-btn"
                onClick={() => { handleClick(); setMobileMenuOpen(!mobileMenuOpen); }}
                onMouseEnter={handleHover}
                style={{
                  background: 'rgba(20, 22, 46,0.06)', border: '1px solid rgba(20, 22, 46,0.1)',
                  borderRadius: '12px', padding: '0.65rem', color: '#14162E',
                  display: 'none', alignItems: 'center', justifyContent: 'center', cursor: 'none'
                }}
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(20, 22, 46, 0.35)', zIndex: 9998 }}
              />
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                style={{
                  position: 'fixed', top: 0, right: 0, bottom: 0, width: '300px',
                  background: '#FFFFFF',
                  borderLeft: '1px solid rgba(20, 22, 46, 0.08)', zIndex: 9999,
                  padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '3px', fontFamily: "var(--gc-display)" }}>Menu</span>
                  <button onClick={() => { handleClick(); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#14162E', cursor: 'none' }}>
                    <X size={20} />
                  </button>
                </div>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    onClick={() => { handleClick(); setActiveTab(item.id); setMobileMenuOpen(false); }}
                    style={{
                      background: 'none', border: 'none', textAlign: 'left', cursor: 'none',
                      color: activeTab === item.id ? 'var(--accent)' : 'rgba(20, 22, 46,0.75)',
                      fontSize: '1.4rem', fontWeight: 500, fontFamily: "var(--gc-display)",
                      textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(20, 22, 46,0.06)'
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <button
                  onClick={() => { handleClick(); setActiveTab('registration'); setMobileMenuOpen(false); }}
                  className="conf-btn-gold"
                  style={{ marginTop: '1.5rem', width: '100%', padding: '0.95rem' }}
                >
                  Register Seat
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ACTIVE TAB VIEW */}
        <div style={{ paddingTop: '108px' }}>
          <AnimatePresence mode="wait">

            {/* ============================== TAB 1: HOME ============================== */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* HERO */}
                <section className="gcai-grid-bg" style={{ position: 'relative', minHeight: 'calc(100vh - 108px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
                  <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 5 }}>

                    <div style={{ marginBottom: '2.2rem' }}>
                      <span className="hero-eyebrow">
                        <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                        Global Conference on Artificial Intelligence
                      </span>
                    </div>

                    <h2 className="serif-font" style={{ fontSize: 'clamp(1.6rem, 3.6vw, 2.8rem)', fontWeight: 400, color: 'rgba(20, 22, 46, 0.9)', margin: '0 0 0.8rem 0', letterSpacing: '0.5px' }}>
                      <ScrambleText text="The Future of" delay={300} />
                    </h2>

                    <h1 className="hero-title">
                      AI Systems
                    </h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem', margin: '2.4rem 0 0' }}>
                      <span className="hero-meta-chip"><MapPin size={13} style={{ color: 'var(--accent)' }} /> Budapest, Hungary</span>
                      <span className="hero-meta-chip"><Calendar size={13} style={{ color: '#0284C7' }} /> September 14 – 16, 2026</span>
                      <span className="hero-meta-chip"><Globe size={13} style={{ color: '#E11D48' }} /> Hybrid • Live + Virtual</span>
                    </div>

                    {/* COUNTDOWN */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.8rem, 3vw, 2rem)', margin: '3.2rem 0 3rem' }}>
                      <FlipUnit value={timeLeft.days} label="Days" />
                      <FlipUnit value={timeLeft.hours} label="Hours" />
                      <FlipUnit value={timeLeft.minutes} label="Minutes" />
                      <FlipUnit value={timeLeft.seconds} label="Seconds" />
                    </div>

                    {/* CTA ROW */}
                    <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                      <Magnetic>
                        <button onClick={() => { handleClick(); setActiveTab('registration'); }} onMouseEnter={handleHover} className="conf-btn-gold" style={{ padding: '1rem 2.8rem', fontSize: '0.88rem' }}>
                          Register Pass Now <ArrowUpRight size={16} />
                        </button>
                      </Magnetic>
                      <Magnetic>
                        <button onClick={() => { handleClick(); setActiveTab('sessions'); }} onMouseEnter={handleHover} className="conf-btn-ghost" style={{ padding: '1rem 2.4rem', fontSize: '0.88rem' }}>
                          Explore Tracks
                        </button>
                      </Magnetic>
                    </div>

                    <div style={{ marginTop: '4.5rem' }}>
                      <div className="scroll-hint">
                        <span>Scroll</span>
                        <ArrowDown size={15} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* TRUSTED BY MARQUEE */}
                <section style={{ borderTop: '1px solid rgba(20, 22, 46,0.06)', borderBottom: '1px solid rgba(20, 22, 46,0.06)', padding: '2.6rem 0', background: 'rgba(20, 22, 46,0.008)' }}>
                  <div style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(20, 22, 46,0.35)', marginBottom: '1.8rem', fontFamily: "var(--gc-display)" }}>
                    Trusted by teams from
                  </div>
                  <Marquee speed={30}>
                    {['zoom', 'IBM', 'Atlassian', 'yahoo!', 'Deloitte', 'SAP', 'intel', 'adidas', 'Tesla', 'ORACLE'].map((l) => (
                      <span key={l} className="marquee-logo">{l}</span>
                    ))}
                  </Marquee>
                </section>

                {/* STATS BAND */}
                <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div className="stats-band" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    {[
                      { end: 1200, suffix: '+', label: 'Global Delegates', color: 'var(--accent)' },
                      { end: 40, suffix: '+', label: 'Countries Represented', color: '#0284C7' },
                      { end: 60, suffix: '+', label: 'Live Talks & Panels', color: '#E11D48' },
                      { end: 8, suffix: '', label: 'Scientific Tracks', color: '#059669' },
                    ].map((s, i) => (
                      <Reveal key={s.label} delay={i * 0.1}>
                        <div className="gcai-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 500, color: s.color, textShadow: `0 0 32px ${s.color}44`, lineHeight: 1 }}>
                          <CountUp end={s.end} suffix={s.suffix} />
                        </div>
                        <div style={{ marginTop: '0.7rem', fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(20, 22, 46,0.45)', fontFamily: "var(--gc-display)" }}>
                          {s.label}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </section>

                {/* OFFICIAL THEME */}
                <section style={{ padding: '5.5rem 1.5rem', borderBottom: '1px solid rgba(20, 22, 46,0.06)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 90% at 50% 50%, rgba(112,32,192,0.09), transparent 70%)' }} />
                  <Reveal style={{ maxWidth: '980px', margin: '0 auto', position: 'relative' }}>
                    <span className="section-kicker"><span className="section-kicker-dot" />Official Theme</span>
                    <h3 className="serif-font" style={{ fontSize: 'clamp(1.35rem, 3.6vw, 2.2rem)', color: '#14162E', margin: '0.5rem 0 0', lineHeight: 1.5, fontWeight: 400 }}>
                      “Advancing Deep Learning Architectures: Shaping the Future of{' '}
                      <span style={{ color: 'var(--accent)', textShadow: '0 0 26px rgba(180, 83, 9,0.35)' }}>Global Biotech</span> &{' '}
                      <span style={{ color: '#0284C7', textShadow: '0 0 26px rgba(2, 132, 199,0.35)' }}>Precision Agriculture</span>”
                    </h3>
                  </Reveal>
                </section>

                {/* KEYNOTE SPEAKERS */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Pioneers & Scholars" title="Keynote Speakers" ghost="Speakers" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.2rem', perspective: '1400px' }}>
                      {speakers.map((sp, i) => (
                        <Reveal key={sp.initials} delay={i * 0.1}>
                          <TiltCard className="bento-card" style={{ padding: '2.4rem 2rem', textAlign: 'center', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}>
                              <div className="avatar-ring" style={{ '--ring-a': sp.color }}>
                                <div style={{
                                  width: '86px', height: '86px', borderRadius: '50%', background: sp.gradient,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '1.7rem', fontWeight: 500, fontFamily: "var(--gc-display)",
                                  color: sp.initials === 'CP' ? '#000' : '#FFF',
                                  boxShadow: `0 0 34px ${sp.color}44`, border: '3px solid #FFFFFF',
                                  position: 'relative', overflow: 'hidden'
                                }}>
                                  {sp.initials}
                                  <img
                                    src={sp.photo}
                                    alt={sp.name}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                  />
                                </div>
                              </div>
                            </div>
                            <h3 className="gcai-display" style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.35rem' }}>{sp.name}</h3>
                            <span style={{ fontSize: '0.72rem', color: sp.color, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', display: 'block', fontFamily: "var(--gc-display)" }}>{sp.org}</span>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.55)', lineHeight: 1.6, margin: 0 }}>{sp.bio}</p>
                          </TiltCard>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* CONFERENCE BENEFITS — SPOTLIGHT BENTO */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)', background: 'rgba(20, 22, 46,0.008)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Why Register?" title="Conference Benefits" ghost="Benefits" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                      {[
                        { Icon: Award, color: '217, 119, 6', accent: 'var(--accent)', title: 'Official CPD Accreditation', desc: 'Obtain official Continuing Professional Development certification hours. A structured transcript is sent to all registered academic delegates.' },
                        { Icon: BookOpen, color: '2, 132, 199', accent: '#0284C7', title: 'Indexed Abstract Booklet', desc: 'All accepted peer-reviewed abstract entries are fully published and cataloged in the GCAI 2026 Proceedings Handbook.' },
                        { Icon: User, color: '225, 29, 72', accent: '#E11D48', title: 'Virtual Networking Lounges', desc: 'Connect with global peers inside custom Zoom breakout channels and digital roundtable sessions. Engage directly with presenters.' },
                        { Icon: Shield, color: '5, 150, 105', accent: '#059669', title: 'Permanent Recordings Access', desc: 'Never miss a parallel session. Obtain lifetime access to high-definition video recordings of all keynote lectures and panel studies.' },
                      ].map((b, i) => (
                        <Reveal key={b.title} delay={i * 0.08}>
                          <SpotlightCard className="bento-card" color={b.color} style={{ padding: '2.5rem', height: '100%', borderRadius: '22px' }}>
                            <div style={{
                              width: '54px', height: '54px', borderRadius: '16px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: `rgba(${b.color}, 0.09)`, border: `1px solid rgba(${b.color}, 0.25)`,
                              color: b.accent, marginBottom: '1.5rem', boxShadow: `0 0 26px rgba(${b.color}, 0.12)`
                            }}>
                              <b.Icon size={24} />
                            </div>
                            <h3 className="gcai-display" style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.8rem' }}>{b.title}</h3>
                            <p style={{ fontSize: '0.87rem', color: 'rgba(20, 22, 46,0.55)', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                          </SpotlightCard>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* PASS CALLOUT */}
                <section id="tickets-section" className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <Reveal>
                      <div className="conic-frame">
                        <div className="bento-card" style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(180, 83, 9,0.06), transparent 60%)' }} />
                          <span className="section-kicker" style={{ position: 'relative' }}><span className="section-kicker-dot" />Secure Your Attendance</span>
                          <h3 className="gcai-display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 500, margin: '0.4rem 0 1.2rem', position: 'relative', letterSpacing: '-0.02em' }}>Choose Your Conference Pass</h3>
                          <p style={{ fontSize: '1rem', color: 'rgba(20, 22, 46,0.6)', lineHeight: 1.65, maxWidth: '720px', margin: '0 auto 2.5rem', position: 'relative' }}>
                            Register as an oral presenter, poster presenter, standard delegate, or virtual attendee. Secure early bird discount pricing before deadlines expire on August 15, 2026.
                          </p>
                          <Magnetic>
                            <button onClick={() => { handleClick(); setActiveTab('registration'); }} onMouseEnter={handleHover} className="conf-btn-gold" style={{ padding: '1rem 3rem', fontSize: '0.9rem' }}>
                              View Registration Passes <ArrowUpRight size={16} />
                            </button>
                          </Magnetic>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </section>

                {/* CONFIRMED LIVE TALKS */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)', background: 'rgba(20, 22, 46,0.008)' }}>
                  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Program Agenda" title="Confirmed Live Talks" ghost="Agenda" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {talks.map((talk, idx) => (
                        <Reveal key={idx} delay={idx * 0.07}>
                          <div className="talk-row" style={{ '--talk-c': talk.color }}>
                            <div className="talk-index gcai-display">0{idx + 1}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                                <span style={{ fontSize: '0.68rem', color: talk.color, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(20, 22, 46,0.03)', padding: '0.25rem 0.6rem', borderRadius: '100px', border: '1px solid rgba(20, 22, 46,0.07)', fontFamily: "var(--gc-display)" }}>{talk.duration}</span>
                                <span style={{ fontSize: '0.72rem', color: 'rgba(20, 22, 46,0.4)', fontWeight: 600, fontFamily: "var(--gc-display)" }}>{talk.time} • {talk.room}</span>
                              </div>
                              <h4 className="gcai-display" style={{ fontSize: '1.2rem', fontWeight: 500, margin: '0 0 0.45rem', lineHeight: 1.35 }}>{talk.title}</h4>
                              <span style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46, 0.45)' }}>By <strong style={{ color: '#14162E' }}>{talk.speakers}</strong> — {talk.affiliation}</span>
                            </div>
                            <div className="avatar-ring" style={{ '--ring-a': talk.color, flexShrink: 0 }}>
                              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#F1F3F8', border: '3px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: talk.color, fontWeight: 500, fontSize: '1rem', fontFamily: "var(--gc-display)", position: 'relative', overflow: 'hidden' }}>
                                {talk.initials}
                                {speakerPhotos[talk.initials] && (
                                  <img
                                    src={speakerPhotos[talk.initials]}
                                    alt={talk.speakers}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* CALL FOR ABSTRACTS */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <Reveal>
                      <div className="bento-card" style={{ padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(2, 132, 199,0.07), transparent 60%)' }} />
                        <span className="section-kicker" style={{ position: 'relative', borderColor: 'rgba(2, 132, 199,0.3)', color: '#0284C7', background: 'rgba(2, 132, 199,0.05)' }}>
                          <span className="section-kicker-dot" style={{ background: '#0284C7', boxShadow: '0 0 8px #0284C7' }} />
                          Deadline: August 10, 2026
                        </span>
                        <h3 className="gcai-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 500, margin: '0.4rem 0 1.2rem', position: 'relative', letterSpacing: '-0.02em' }}>Call For Papers & Abstracts</h3>
                        <p style={{ fontSize: '1rem', color: 'rgba(20, 22, 46,0.65)', lineHeight: 1.65, maxWidth: '760px', margin: '0 auto 2.5rem', position: 'relative' }}>
                          Share your research with the world. Submit your abstract to the GCAI 2026 scientific committee to present your project live in Budapest or stream to thousands of virtual delegates.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem', position: 'relative' }}>
                          <Magnetic>
                            <button onClick={() => { handleClick(); setActiveTab('abstract'); }} onMouseEnter={handleHover} className="conf-btn-gold" style={{ padding: '0.95rem 2.5rem' }}>Submit Abstract</button>
                          </Magnetic>
                          <Magnetic>
                            <a href="/AvenirMark_Portfolio_Updated.pdf" download onMouseEnter={handleHover} className="conf-btn-ghost" style={{ padding: '0.9rem 2.2rem' }}>
                              <Download size={14} /> Abstract Template
                            </a>
                          </Magnetic>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </section>

                {/* ABOUT */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)', background: 'rgba(20, 22, 46,0.008)' }}>
                  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
                    <SectionHeading kicker="The Congress" title="About Us" ghost="About" />
                    <Reveal>
                      <p className="serif-font" style={{ fontSize: 'clamp(1.15rem, 2.6vw, 1.5rem)', color: 'rgba(20, 22, 46, 0.88)', lineHeight: 1.7, maxWidth: '840px', margin: '0 auto 1.5rem' }}>
                        The Global Conference on Artificial Intelligence (GCAI 2026) is the leading virtual and interactive AI systems congress, bringing together global deep learning researchers and biochemists to share future-proofed studies.
                      </p>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(20, 22, 46, 0.4)', margin: 0 }}>This event is organized by the research community, for the community.</p>
                    </Reveal>

                  </div>
                </section>

                {/* PROGRAM COMMITTEE */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Review Panel" title="Program Committee" ghost="Committee" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.6rem' }}>
                      {committee.map((m, i) => (
                        <Reveal key={m.initials} delay={i * 0.08}>
                          <SpotlightCard className="bento-card" style={{ padding: '1.6rem', borderRadius: '22px' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: m.color, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: '0.9rem', flexShrink: 0, fontFamily: "var(--gc-display)", boxShadow: `0 0 22px ${m.color}44` }}>{m.initials}</div>
                              <div>
                                <h4 className="gcai-display" style={{ fontSize: '0.98rem', fontWeight: 500, margin: 0 }}>{m.name}</h4>
                                <span style={{ fontSize: '0.76rem', color: 'rgba(20, 22, 46,0.45)' }}>{m.org}</span>
                              </div>
                            </div>
                          </SpotlightCard>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* MAIN SPONSORS */}
                <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(20, 22, 46,0.06)', background: 'rgba(20, 22, 46,0.008)', textAlign: 'center' }}>
                  <Reveal>
                    <h2 style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '5px', color: 'var(--accent)', marginBottom: '3rem', fontFamily: "var(--gc-display)" }}>Main Sponsors</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(2.5rem, 8vw, 6rem)' }}>
                      {[
                        { name: 'Tokens Studio', color: '#14162E' },
                        { name: 'Specify', color: '#0284C7' },
                        { name: 'i-Cultiver', color: '#E11D48' },
                      ].map((s) => (
                        <Magnetic key={s.name} strength={0.2}>
                          <span className="gcai-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', fontWeight: 500, letterSpacing: '-0.5px', color: s.color, opacity: 0.85, textShadow: `0 0 30px ${s.color}33`, cursor: 'none' }}>{s.name}</span>
                        </Magnetic>
                      ))}
                    </div>
                  </Reveal>
                </section>

                {/* TESTIMONIALS */}
                <section className="section" style={{ borderBottom: '1px solid rgba(20, 22, 46,0.06)' }}>
                  <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Community Voices" title="What People Say" ghost="Voices" />
                    <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', perspective: '1200px' }}>
                      {testimonials.map((t, i) => (
                        <Reveal key={t.initials} delay={i * 0.1}>
                          <TiltCard max={6} className="bento-card" style={{ padding: '2rem', height: '100%' }}>
                            <div className="serif-font" aria-hidden="true" style={{ fontSize: '3.4rem', lineHeight: 0.6, color: t.color, opacity: 0.5, marginBottom: '1.2rem' }}>“</div>
                            <p style={{ margin: '0 0 1.6rem', fontSize: '0.9rem', lineHeight: 1.65, color: 'rgba(20, 22, 46,0.72)' }}>{t.quote}</p>
                            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: '0.9rem', color: '#FFF', fontFamily: "var(--gc-display)", boxShadow: `0 0 20px ${t.color}44` }}>{t.initials}</div>
                              <div>
                                <h4 className="gcai-display" style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>{t.name}</h4>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(20, 22, 46,0.4)' }}>{t.handle}</span>
                              </div>
                            </div>
                          </TiltCard>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="section">
                  <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <SectionHeading kicker="Help & Support" title="Frequently Asked Questions" ghost="FAQ" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {faqs.map((item, idx) => (
                        <Reveal key={idx} delay={idx * 0.06}>
                          <div className={`faq-item ${faqOpenIndex === idx ? 'open' : ''}`}>
                            <button
                              onClick={() => { handleClick(); setFaqOpenIndex(faqOpenIndex === idx ? null : idx); }}
                              onMouseEnter={handleHover}
                              style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.5rem 1.8rem', cursor: 'none', textAlign: 'left' }}
                            >
                              <span className="gcai-display" style={{ fontSize: '1.02rem', fontWeight: 500, color: '#14162E' }}>{item.q}</span>
                              <motion.span
                                animate={{ rotate: faqOpenIndex === idx ? 45 : 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{ fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 400, lineHeight: 1, flexShrink: 0 }}
                              >
                                +
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {faqOpenIndex === idx && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                  style={{ overflow: 'hidden' }}
                                >
                                  <p style={{ fontSize: '0.9rem', color: 'rgba(20, 22, 46,0.62)', lineHeight: 1.65, margin: 0, padding: '0 1.8rem 1.6rem' }}>
                                    {item.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* ============================== TAB 2: SESSIONS ============================== */}
            {activeTab === 'sessions' && (
              <motion.div
                key="sessions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: '1240px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
              >
                <SectionHeading kicker="GCAI 2026 Tracks" title="Scientific Tracks" ghost="Tracks" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                  {sessions.map((sess, idx) => (
                    <Reveal key={sess.id} delay={(idx % 3) * 0.08}>
                      <SpotlightCard className="bento-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px', borderRadius: '22px', height: '100%' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
                            <span className="gcai-display" style={{ fontSize: '2.2rem', fontWeight: 500, color: 'transparent', WebkitTextStroke: '1px rgba(180, 83, 9,0.4)', lineHeight: 1 }}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span style={{ display: 'inline-flex', background: 'rgba(180, 83, 9,0.06)', border: '1px solid rgba(180, 83, 9,0.3)', color: 'var(--accent)', padding: '0.3rem 0.75rem', borderRadius: '100px', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '1.5px', fontFamily: "var(--gc-display)" }}>
                              TRACK
                            </span>
                          </div>
                          <h3 className="gcai-display" style={{ fontSize: '1.22rem', fontWeight: 500, marginBottom: '0.8rem', lineHeight: 1.3 }}>{sess.title}</h3>
                          <p style={{ fontSize: '0.87rem', color: 'rgba(20, 22, 46,0.55)', lineHeight: 1.6 }}>{sess.desc}</p>
                        </div>
                        <div style={{ marginTop: '1.6rem', borderTop: '1px solid rgba(20, 22, 46,0.06)', paddingTop: '1.2rem' }}>
                          <button
                            onClick={() => {
                              handleClick();
                              setAbstractForm({ ...abstractForm, session: sess.id });
                              setActiveTab('abstract');
                            }}
                            onMouseEnter={handleHover}
                            style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.8rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', cursor: 'none', fontFamily: "var(--gc-display)", letterSpacing: '0.5px' }}
                          >
                            Submit Abstract to this Track <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </SpotlightCard>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================== TAB 3: ABSTRACT ============================== */}
            {activeTab === 'abstract' && (
              <motion.div
                key="abstract"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
              >
                <SectionHeading kicker="Call For Papers" title="Abstract Submission" ghost="Submit" />

                <Reveal>
                  <div className="bento-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
                    <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1.4rem' }}>Submission Instructions</h3>
                    <ul style={{ paddingLeft: 0, listStyle: 'none', fontSize: '0.9rem', color: 'rgba(20, 22, 46,0.72)', display: 'flex', flexDirection: 'column', gap: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {[
                        'All abstracts must be submitted in English only.',
                        'Abstract word limit: Minimum 100 words – Maximum 350 words.',
                        'The abstract title must accurately describe the scientific research.',
                        'Please select the target Scientific Session track carefully to ensure correct routing.',
                        'All abstract submittals are double-blind peer reviewed by 3 committee members.',
                      ].map((rule, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                          <Check size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="conic-frame">
                    <div className="bento-card" style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)' }}>
                      <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1.8rem' }}>Submit Your Abstract Summary</h3>

                      {abstractSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                          <SuccessCheck />
                          <h4 className="gcai-display" style={{ fontSize: '1.25rem', fontWeight: 500, margin: '1.4rem 0 0' }}>Abstract Filed Successfully</h4>
                          <p style={{ fontSize: '0.88rem', color: 'rgba(20, 22, 46,0.5)', marginTop: '0.6rem' }}>
                            Thank you! Your abstract has been successfully queued for the Scientific Review Committee. A confirmation email has been logged.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleAbstractSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-2">
                            <div style={fieldCol}>
                              <label style={labelBase}>Presenter Full Name *</label>
                              <input required type="text" placeholder="e.g. Dr. Jane Doe" value={abstractForm.name}
                                onChange={(e) => setAbstractForm({ ...abstractForm, name: e.target.value })}
                                onMouseEnter={handleHover} className="glass-input" style={inputBase} />
                            </div>
                            <div style={fieldCol}>
                              <label style={labelBase}>Contact Email *</label>
                              <input required type="email" placeholder="e.g. jane.doe@university.edu" value={abstractForm.email}
                                onChange={(e) => setAbstractForm({ ...abstractForm, email: e.target.value })}
                                onMouseEnter={handleHover} className="glass-input" style={inputBase} />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem' }} className="responsive-grid-2">
                            <div style={fieldCol}>
                              <label style={labelBase}>Presentation / Paper Title *</label>
                              <input required type="text" placeholder="e.g. Predictive biological stress classifiers" value={abstractForm.title}
                                onChange={(e) => setAbstractForm({ ...abstractForm, title: e.target.value })}
                                onMouseEnter={handleHover} className="glass-input" style={inputBase} />
                            </div>
                            <div style={fieldCol}>
                              <label style={labelBase}>Target Session Track *</label>
                              <select value={abstractForm.session}
                                onChange={(e) => setAbstractForm({ ...abstractForm, session: e.target.value })}
                                onMouseEnter={handleHover} className="glass-input" style={{ ...inputBase, height: '50px' }}>
                                {sessions.map((sess) => (
                                  <option key={sess.id} value={sess.id} style={{ background: '#FFFFFF', color: '#14162E' }}>
                                    {sess.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div style={fieldCol}>
                            <label style={labelBase}>Abstract Summary (Min 100 - Max 350 words) *</label>
                            <textarea required rows={6} placeholder="Write or paste your abstract summary details here..." value={abstractForm.abstract}
                              onChange={(e) => setAbstractForm({ ...abstractForm, abstract: e.target.value })}
                              onMouseEnter={handleHover} className="glass-input" style={{ ...inputBase, lineHeight: 1.55, resize: 'vertical' }} />
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <Magnetic>
                              <button type="submit" onMouseEnter={handleHover} className="conf-btn-gold" style={{ padding: '0.95rem 2.8rem' }}>
                                Submit Abstract <ArrowUpRight size={15} />
                              </button>
                            </Magnetic>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            )}

            {/* ============================== TAB 4: VENUE ============================== */}
            {activeTab === 'venue' && (
              <motion.div
                key="venue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
              >
                <SectionHeading kicker="Rome, Italy" title="Venue & Travel Guide" ghost="Venue" />

                <Reveal>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '3.5rem', alignItems: 'center' }} className="responsive-grid-2">
                    <div>
                      <h3 className="gcai-display" style={{ fontSize: '1.6rem', fontWeight: 500, marginBottom: '1rem' }}>NH Roma Villa Carpegna</h3>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(20, 22, 46,0.68)', lineHeight: 1.7, marginBottom: '1.6rem' }}>
                        NH Roma Villa Carpegna is set just outside the bustling center of Rome, in a quiet, green area close to the Villa Pamphili park.
                        The hotel offers standard conference rooms equipped with state-of-the-art audiovisual setups, fast Wi-Fi networks, and professional delegate lounge facilities.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                          <MapPin size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span>Via de&apos; Pio V, 86, 00165 Roma RM, Italy</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                          <Calendar size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span>Direct Airport Shuttle & Metro access nearby</span>
                        </div>
                      </div>
                    </div>
                    <TiltCard max={7} style={{ borderRadius: '22px' }}>
                      <div style={{ aspectRatio: '16/11', borderRadius: '22px', background: 'linear-gradient(150deg, #0a1128 0%, #131c3d 100%)', border: '1px solid rgba(20, 22, 46,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 50px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                          <MapPin size={30} style={{ color: '#ffde42', filter: 'drop-shadow(0 0 12px rgba(255, 210, 60, 0.6))' }} />
                          <div className="gcai-display" style={{ marginTop: '0.6rem', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgb(255 255 255 / 0.75)' }}>Conference Venue</div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>

                <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem', marginBottom: '3.5rem' }}>
                  {[
                    { Icon: Plane, title: 'By Air', color: '217, 119, 6', text: 'Participants can fly into Leonardo da Vinci–Fiumicino Airport (FCO) (30km from hotel) or Ciampino Airport (CIA). Taxi, train, and shuttle systems link the terminals directly to the hotel district.' },
                    { Icon: TrainFront, title: 'By Train', color: '2, 132, 199', text: 'Arrive at Roma Termini central station. From there, take the Metro Line A to Cornelia station, which is a short taxi ride or walk from the NH Roma Villa Carpegna.' },
                    { Icon: Bus, title: 'Local Transit', color: '225, 29, 72', text: "Rome has a comprehensive subway (Metro), streetcar, and bus system. Bus lines connect the hotel area directly to St. Peter's Square and the Vatican City center." },
                  ].map((t, i) => (
                    <Reveal key={t.title} delay={i * 0.08}>
                      <SpotlightCard className="bento-card" color={t.color} style={{ padding: '2rem', borderRadius: '22px', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                          <div style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${t.color}, 0.09)`, border: `1px solid rgba(${t.color}, 0.25)`, color: `rgb(${t.color})` }}>
                            <t.Icon size={20} />
                          </div>
                          <h4 className="gcai-display" style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>{t.title}</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.6)', lineHeight: 1.6, margin: 0 }}>{t.text}</p>
                      </SpotlightCard>
                    </Reveal>
                  ))}
                </div>

                {/* Visa Letter Request Form */}
                <Reveal>
                  <div className="bento-card" style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)' }}>
                    <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.5rem' }}>Visa Support Invitation Letter</h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.45)', marginBottom: '2rem' }}>
                      If you require an official visa invitation letter to attend GCAI 2026, please complete the request form below.
                    </p>

                    {visaSubmitted ? (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <SuccessCheck size={60} />
                        <h4 className="gcai-display" style={{ fontSize: '1.15rem', fontWeight: 500, margin: '1.2rem 0 0' }}>Request Filed!</h4>
                        <p style={{ fontSize: '0.82rem', color: 'rgba(20, 22, 46,0.5)', marginTop: '0.5rem' }}>
                          Thank you! Your visa support inquiry has been logged. Our coordinator will email your visa letter within 3 business days.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleVisaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-2">
                          <div style={fieldCol}>
                            <label style={labelBase}>Full Name (as in Passport) *</label>
                            <input required type="text" placeholder="e.g. Dr. John Smith" value={visaForm.fullName}
                              onChange={(e) => setVisaForm({ ...visaForm, fullName: e.target.value })}
                              className="glass-input" style={inputBase} />
                          </div>
                          <div style={fieldCol}>
                            <label style={labelBase}>Passport Number *</label>
                            <input required type="text" placeholder="e.g. A12345678" value={visaForm.passportNumber}
                              onChange={(e) => setVisaForm({ ...visaForm, passportNumber: e.target.value })}
                              className="glass-input" style={inputBase} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-2">
                          <div style={fieldCol}>
                            <label style={labelBase}>Email Address *</label>
                            <input required type="email" placeholder="e.g. john.smith@university.edu" value={visaForm.email}
                              onChange={(e) => setVisaForm({ ...visaForm, email: e.target.value })}
                              className="glass-input" style={inputBase} />
                          </div>
                          <div style={fieldCol}>
                            <label style={labelBase}>Institution / Company *</label>
                            <input required type="text" placeholder="e.g. Stanford University" value={visaForm.affiliation}
                              onChange={(e) => setVisaForm({ ...visaForm, affiliation: e.target.value })}
                              className="glass-input" style={inputBase} />
                          </div>
                        </div>

                        <div style={fieldCol}>
                          <label style={labelBase}>Nearest Visa Consulate Office location *</label>
                          <input required type="text" placeholder="e.g. Italian Embassy, Washington DC, USA" value={visaForm.visaOffice}
                            onChange={(e) => setVisaForm({ ...visaForm, visaOffice: e.target.value })}
                            className="glass-input" style={inputBase} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                          <Magnetic>
                            <button type="submit" className="conf-btn-gold" style={{ padding: '0.95rem 2.8rem' }}>
                              Submit Visa Request
                            </button>
                          </Magnetic>
                        </div>
                      </form>
                    )}
                  </div>
                </Reveal>
              </motion.div>
            )}

            {/* ============================== TAB 5: SPONSORS ============================== */}
            {activeTab === 'sponsors' && (
              <motion.div
                key="sponsors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
              >
                <SectionHeading kicker="Industry Partners" title="Sponsors & Exhibitors" ghost="Partners" />

                <Reveal>
                  <div className="bento-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
                    <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1.2rem' }}>Why Sponsor GCAI 2026?</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(20, 22, 46,0.68)', lineHeight: 1.7, margin: 0 }}>
                      GCAI 2026 brings together the world&apos;s leading minds in artificial intelligence, bio-computing, and neural modeling.
                      Sponsoring the summit places your brand at the forefront of scientific innovation, offering direct visibility to researchers, delegates, and decision-makers.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                      <Magnetic>
                        <a href="/AvenirMark_Portfolio_Updated.pdf" download onMouseEnter={handleHover} className="conf-btn-gold">
                          <Download size={15} /> Download Sponsorship Brochure
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="bento-card" style={{ padding: '2.5rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
                    <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.4rem' }}>Sponsorship Tier Comparison</h3>
                    <table className="sponsor-table">
                      <thead>
                        <tr>
                          <th>Benefits / Features</th>
                          <th style={{ color: 'var(--accent)' }}>Gold ($5,000)</th>
                          <th style={{ color: '#0284C7' }}>Silver ($3,000)</th>
                          <th style={{ color: '#E11D48' }}>Exhibitor ($1,500)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Speaking / Presentation Slot', '20 min Keynote', '15 min Talk', 'None'],
                          ['Booth space in Exhibition hall', 'Double Booth (6x3m)', 'Standard Booth (3x3m)', 'Table Desk (2x2m)'],
                          ['Complimentary registrations', '5 Passes', '3 Passes', '2 Passes'],
                          ['Logo positioning in banner', 'Primary/Header Position', 'Secondary Position', 'Footer Grid'],
                          ['Full-page Handbook Ad', 'Color Ad (Back cover)', 'Color Ad (Inside page)', 'B&W Ad (Inside page)'],
                        ].map((row, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 500 }}>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="conic-frame">
                    <div className="bento-card" style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)' }}>
                      <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.5rem' }}>Apply to Sponsor / Exhibit</h3>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.45)', marginBottom: '2rem' }}>
                        Select your package option and tell us about your brand. Our industry relations coordinator will contact you shortly.
                      </p>

                      {sponsorSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                          <SuccessCheck size={60} />
                          <h4 className="gcai-display" style={{ fontSize: '1.15rem', fontWeight: 500, margin: '1.2rem 0 0' }}>Application Filed!</h4>
                          <p style={{ fontSize: '0.82rem', color: 'rgba(20, 22, 46,0.5)', marginTop: '0.5rem' }}>
                            Thank you! We have received your sponsorship inquiry. Our representative will contact you via email within 2 business days.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSponsorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-2">
                            <div style={fieldCol}>
                              <label style={labelBase}>Company / Organization *</label>
                              <input required type="text" placeholder="e.g. Tokens Studio Inc." value={sponsorForm.company}
                                onChange={(e) => setSponsorForm({ ...sponsorForm, company: e.target.value })}
                                className="glass-input" style={inputBase} />
                            </div>
                            <div style={fieldCol}>
                              <label style={labelBase}>Contact Name *</label>
                              <input required type="text" placeholder="e.g. Alice Johnson" value={sponsorForm.contactName}
                                onChange={(e) => setSponsorForm({ ...sponsorForm, contactName: e.target.value })}
                                className="glass-input" style={inputBase} />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '1.5rem' }} className="responsive-grid-2">
                            <div style={fieldCol}>
                              <label style={labelBase}>Email Address *</label>
                              <input required type="email" placeholder="e.g. sponsorship@company.com" value={sponsorForm.email}
                                onChange={(e) => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                                className="glass-input" style={inputBase} />
                            </div>
                            <div style={fieldCol}>
                              <label style={labelBase}>Phone Number *</label>
                              <input required type="tel" placeholder="e.g. +1 555-0199" value={sponsorForm.phone}
                                onChange={(e) => setSponsorForm({ ...sponsorForm, phone: e.target.value })}
                                className="glass-input" style={inputBase} />
                            </div>
                            <div style={fieldCol}>
                              <label style={labelBase}>Target Sponsor Tier *</label>
                              <select value={sponsorForm.tier}
                                onChange={(e) => setSponsorForm({ ...sponsorForm, tier: e.target.value })}
                                className="glass-input" style={{ ...inputBase, height: '50px' }}>
                                <option value="Gold Sponsor" style={{ background: '#FFFFFF', color: '#14162E' }}>Gold Sponsor ($5,000)</option>
                                <option value="Silver Sponsor" style={{ background: '#FFFFFF', color: '#14162E' }}>Silver Sponsor ($3,000)</option>
                                <option value="Bronze Sponsor" style={{ background: '#FFFFFF', color: '#14162E' }}>Bronze Sponsor ($1,500)</option>
                                <option value="Exhibitor Booth" style={{ background: '#FFFFFF', color: '#14162E' }}>Exhibitor Booth ($1,000)</option>
                              </select>
                            </div>
                          </div>

                          <div style={fieldCol}>
                            <label style={labelBase}>Special Request / Description *</label>
                            <textarea required rows={4} placeholder="Detail any booth requirements, speaking topic proposals, or catalog advert requests..." value={sponsorForm.message}
                              onChange={(e) => setSponsorForm({ ...sponsorForm, message: e.target.value })}
                              className="glass-input" style={{ ...inputBase, lineHeight: 1.55, resize: 'vertical' }} />
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <Magnetic>
                              <button type="submit" className="conf-btn-gold" style={{ padding: '0.95rem 2.8rem' }}>
                                Submit Inquiry
                              </button>
                            </Magnetic>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            )}

            {/* ============================== TAB 6: REGISTRATION ============================== */}
            {activeTab === 'registration' && (
              <motion.div
                key="registration"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}
              >
                <SectionHeading kicker="Checkout" title="Registration Passes" ghost="Tickets" />

                <Reveal>
                  <div className="bento-card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
                    <h3 className="gcai-display" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1.2rem' }}>Registration Packages</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(20, 22, 46,0.68)', lineHeight: 1.7, marginBottom: '1.6rem' }}>
                      Register to attend the GCAI 2026 conference in Budapest, Hungary. We offer registration tiers for Oral Presenters, Poster Presenters, Delegates, and Virtual Attendees.
                      Early bird discount options expire August 15, 2026.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', fontSize: '0.88rem' }}>
                      {['Presenter Entry certification', 'CPD Credit Record Hours', 'Group Booking Discount (5+)'].map((perk) => (
                        <div key={perk} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                          <Check size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
                  {passes.map((p, i) => (
                    <Reveal key={p.type} delay={(i % 3) * 0.08}>
                      <div className={p.highlight ? 'conic-frame' : ''} style={{ height: '100%' }}>
                        <div className="ticket-pass" style={{ height: '100%' }}>
                          <div>
                            <span className={`ticket-tag ${p.highlight ? 'hot' : ''}`}>{p.tag}</span>
                            <h3 className="gcai-display" style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.6rem' }}>{p.type}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.55)', lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                          </div>
                          <div>
                            <div className="ticket-divider" />
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1.2rem' }}>
                              <span className="ticket-price" style={{ color: p.highlight ? '#B45309' : '#14162E' }}>
                                ${p.price.toLocaleString()}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'rgba(20, 22, 46,0.35)', fontFamily: "var(--gc-display)", textTransform: 'uppercase', letterSpacing: '1px' }}>/ pass</span>
                            </div>
                            <button onClick={() => openTicketModal(p.type)} onMouseEnter={handleHover} className="conf-btn-gold" style={{ width: '100%', padding: '0.9rem' }}>
                              Register Pass
                            </button>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* TICKET REGISTRATION MODAL */}
        <AnimatePresence>
          {ticketModalOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(20, 22, 46, 0.35)',
                zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.92, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                className="conic-frame"
                style={{ width: '100%', maxWidth: '480px' }}
              >
                <div style={{
                  padding: 'clamp(2rem, 5vw, 3rem) clamp(1.6rem, 4vw, 2.8rem)',
                  borderRadius: '22px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(20, 22, 46, 0.1)',
                  boxShadow: '0 40px 90px rgba(20, 22, 46, 0.25)',
                  position: 'relative',
                }}>
                  <button
                    onClick={() => setTicketModalOpen(false)}
                    style={{
                      position: 'absolute', top: '1.4rem', right: '1.4rem',
                      background: 'rgba(20, 22, 46,0.05)', border: '1px solid rgba(20, 22, 46,0.1)',
                      borderRadius: '10px', padding: '0.5rem',
                      color: 'rgba(20, 22, 46,0.5)', cursor: 'none',
                      display: 'flex', transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#14162E'; handleHover(); }}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(20, 22, 46,0.5)'}
                  >
                    <X size={18} />
                  </button>

                  <h3 className="gcai-display" style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                    Register Delegate Pass
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.45)', marginBottom: '2.2rem' }}>
                    Registering pass type: <strong style={{ color: 'var(--accent)' }}>{selectedTicketType}</strong>. All lead alerts are dispatched to conference organizers.
                  </p>

                  {ticketSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                      <SuccessCheck />
                      <h4 className="gcai-display" style={{ fontSize: '1.25rem', fontWeight: 500, margin: '1.4rem 0 0' }}>Registration Logged!</h4>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(20, 22, 46,0.45)', marginTop: '0.5rem' }}>
                        Thank you! We have registered your inquiry. Our support representative will contact you via WhatsApp shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                      <div style={fieldCol}>
                        <label style={labelBase}>Your Full Name *</label>
                        <input required type="text" placeholder="e.g. Dr. John Doe" value={ticketForm.name}
                          onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                          className="glass-input" style={inputBase} />
                      </div>

                      <div style={fieldCol}>
                        <label style={labelBase}>Email Address *</label>
                        <input required type="email" placeholder="e.g. john.doe@university.edu" value={ticketForm.email}
                          onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                          className="glass-input" style={inputBase} />
                      </div>

                      <div style={fieldCol}>
                        <label style={labelBase}>Mobile Number *</label>
                        <input required type="tel" placeholder="Your mobile number" value={ticketForm.phone}
                          onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                          className="glass-input" style={inputBase} />
                      </div>

                      <button type="submit" className="conf-btn-gold" style={{ padding: '1rem', marginTop: '0.5rem', width: '100%' }}>
                        Register & Pay
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid rgba(20, 22, 46, 0.07)', padding: '3.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 120% at 50% 100%, rgba(180, 83, 9,0.045), transparent 60%)' }} />
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="conf-logo" style={{ justifyContent: 'center', marginBottom: '1.2rem' }}>
              <div className="conf-logo-orb" />
              GCAI<span style={{ color: 'var(--accent)' }}>&nbsp;CON</span>&nbsp;2026
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(20, 22, 46,0.4)', margin: '0 0 1.6rem', fontFamily: "var(--gc-display)", letterSpacing: '1px' }}>
              Budapest, Hungary • September 14 – 16, 2026
            </p>
            <span style={{ fontSize: '0.75rem', color: 'rgba(20, 22, 46,0.3)' }}>© {new Date().getFullYear()} GCAI CON 2026. All rights reserved.</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
