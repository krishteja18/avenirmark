import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BookOpen, Laptop, Brain, Share2, Smartphone, ArrowUpRight, Bot, Palette, Camera, Megaphone } from 'lucide-react';
import gsap from 'gsap';

export default function Services({ playSound }) {
  const services = [
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      desc: 'We don’t chase rankings — we architect them. Our SEO practice combines technical mastery, semantic authority, and precision link intelligence to deliver compounding organic growth at scale.',
      icon: TrendingUp,
      gridSpan: 'span 1',
    },
    {
      id: 'content',
      title: 'Content Marketing',
      desc: 'We produce content that moves people — and the needle. From thought leadership to conversion-focused campaigns, every asset is engineered with audience psychology and SEO authority at its core.',
      icon: BookOpen,
      gridSpan: 'span 1',
    },
    {
      id: 'web',
      title: 'Website Design & Development',
      desc: 'We craft digital environments that compel action. Every pixel, interaction, and micro-animation is intentional — built to convert visitors into customers and reflect your brand at its absolute best.',
      icon: Laptop,
      gridSpan: 'span 1',
    },
    {
      id: 'app',
      title: 'App Development',
      desc: 'From native iOS and Android to cross-platform powerhouses, we build high-performance apps that users love. Elegant UX, bulletproof architecture, and seamless integrations — shipped fast.',
      icon: Smartphone,
      gridSpan: 'span 1',
    },
    {
      id: 'brand',
      title: 'Brand Strategy',
      desc: 'We dissect your market, decode your audience, and forge a brand identity that doesn’t just stand out — it stands apart. Positioning, voice, visual language — built to command attention and sustain loyalty.',
      icon: Brain,
      gridSpan: 'span 2', // Brand Strategy spans 2 columns to balance the bento grid
    },
    {
      id: 'social',
      title: '360° Social Media Marketing',
      desc: 'We transform social channels into revenue engines. From audience architecture to paid amplification and influencer strategy — we make your brand impossible to scroll past.',
      icon: Share2,
      gridSpan: 'span 1',
    },
    {
      id: 'aiVoice',
      title: 'AI Voice Agents',
      desc: 'Empower your business with next-gen conversational AI. Our voice agents deliver human-like, real-time voice interactions to automate support, qualify leads, and scale customer engagement 24/7.',
      icon: Bot,
      gridSpan: 'span 1',
    },
    {
      id: 'logoDesign',
      title: 'Logo Design & Identity',
      desc: 'Define your visual legacy. We craft remarkable, enduring logos and cohesive identity systems that capture your brand essence, command attention, and foster profound recognition.',
      icon: Palette,
      gridSpan: 'span 1',
    },
    {
      id: 'productPhotography',
      title: 'Product Photography',
      desc: 'Capture the soul of your products. Our high-end commercial photography and studio lighting bring out every texture, detail, and premium angle to drive immediate desire and conversions.',
      icon: Camera,
      gridSpan: 'span 1',
    },
    {
      id: 'digitalMarketing',
      title: 'Digital Marketing & Growth',
      desc: 'Hyper-targeted, multi-channel performance marketing that scales. We unify paid search, programmatic ads, retargeting, and funnel optimization to maximize acquisition and scale customer lifetime value.',
      icon: Megaphone,
      gridSpan: 'span 2',
    },
  ];

  const cardThemes = {
    seo: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(255, 222, 66, 0.14)', border: '1px solid rgba(255, 222, 66, 0.35)', color: '#9a7c00' },
      accent: '#9a7c00',
    },
    content: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(192, 132, 252, 0.12)', border: '1px solid rgba(192, 132, 252, 0.3)', color: '#7c22c9' },
      accent: '#7c22c9',
    },
    web: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(34, 211, 238, 0.10)', border: '1px solid rgba(34, 211, 238, 0.3)', color: '#0e7490' },
      accent: '#0e7490',
    },
    app: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(16, 185, 129, 0.10)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#047857' },
      accent: '#047857',
    },
    brand: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(84, 120, 255, 0.10)', border: '1px solid rgba(84, 120, 255, 0.3)', color: '#2c46d4' },
      accent: '#2c46d4',
    },
    social: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(251, 113, 133, 0.10)', border: '1px solid rgba(251, 113, 133, 0.3)', color: '#be1239' },
      accent: '#be1239',
    },
    aiVoice: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(249, 115, 22, 0.10)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#ea580c' },
      accent: '#ea580c',
    },
    logoDesign: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(236, 72, 153, 0.10)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#db2777' },
      accent: '#db2777',
    },
    productPhotography: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(20, 184, 166, 0.10)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#0f766e' },
      accent: '#0f766e',
    },
    digitalMarketing: {
      card: {
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(230, 230, 240, 0.9)',
        boxShadow: '0 8px 40px rgba(27, 39, 81, 0.10), 0 2px 8px rgba(27,39,81,0.06)',
      },
      icon: { background: 'rgba(59, 130, 246, 0.10)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#1d4ed8' },
      accent: '#1d4ed8',
    },
  };

  const [activeServiceId, setActiveServiceId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveServiceId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (activeServiceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeServiceId]);

  const handleCardClick = (id) => {
    if (playSound) playSound('click');
    setActiveServiceId(id);
  };

  const serviceDetails = {
    seo: {
      philosophy: 'Semantic Entity Authority over Legacy Keyword Tactics.',
      pillars: [
        {
          title: 'Algorithmic Topical Mapping',
          desc: 'We map search intent as high-dimensional semantic entities rather than simple text keywords, aligning content vectors perfectly with search engine NLP models.'
        },
        {
          title: 'Schema Graph Architecture',
          desc: 'We construct complex JSON-LD structured data graphs mapping your brand as a primary entity with verified relationships to categories, locations, and authors.'
        },
        {
          title: 'Speed & Edge Optimization',
          desc: 'Ultra-fast Core Web Vitals audit and engineering, leveraging edge caching, headless rendering, and modern image compression to achieve sub-500ms TTFB.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Deep Audit', desc: 'Reverse-engineering competitor link velocity and crawlers log files.' },
        { phase: 'Phase 02', title: 'Entity Architecture', desc: 'Deploying semantic topical maps and structural URL schemas.' },
        { phase: 'Phase 03', title: 'Content Engine', desc: 'Generating authoritative content clusters targeted at high-value query nodes.' },
        { phase: 'Phase 04', title: 'Link Intelligence', desc: 'Acquiring high-contextuality contextual links from tier-1 digital domains.' }
      ]
    },
    content: {
      philosophy: 'Neurological Resonance Engine: Crafting assets that capture intent.',
      pillars: [
        {
          title: 'Topical Velocity Engine',
          desc: 'We analyze structural search gaps and create high-frequency content pipelines targeted at capturing long-tail informational search volume.'
        },
        {
          title: 'Cognitive Copywriting',
          desc: 'Content engineered using psychological framing models (AIDA, PAS) balanced with high density of semantic contextual entities.'
        },
        {
          title: 'Dynamic Syndication Network',
          desc: 'We programmatically amplify your articles across verified high-authority editorial networks, guaranteeing instant visibility and backlink indexation.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Topical Discovery', desc: 'Extracting untapped search queries and building a 12-month topic grid.' },
        { phase: 'Phase 02', title: 'Copy Engineering', desc: 'Drafting deep-tech technical briefings with certified industry experts.' },
        { phase: 'Phase 03', title: 'SEO Infusion', desc: 'Injecting LSI synonyms, schema structure, and logical internal links.' },
        { phase: 'Phase 04', title: 'Omnichannel Distribution', desc: 'Syndicating through email campaigns, social channels, and press platforms.' }
      ]
    },
    web: {
      philosophy: 'High-Performance Spatial Environments with Sub-Millisecond Interactivity.',
      pillars: [
        {
          title: 'WebGL & Creative Frontend',
          desc: 'Interactive 3D shaders, dynamic mouse spotlights, and custom physics engines rendered at 60 FPS utilizing hardware-accelerated CSS and Canvas.'
        },
        {
          title: 'Edge Hydration & Jamstack',
          desc: 'Zero-JS initial payloads, static site generation (SSG) with incremental server rendering, hosted on globally-distributed hyper-scalable CDN edge nodes.'
        },
        {
          title: 'Neurological UX/UI Design',
          desc: 'Layout grids optimized around user eye-tracking heatmaps and F-shaped reading patterns to guide attention directly to primary CTA buttons.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Behavioral Wireframing', desc: 'Mapping user interactions and path conversion funnels.' },
        { phase: 'Phase 02', title: '3D Mockup Crafting', desc: 'Designing premium visual guidelines with immersive aesthetic elements.' },
        { phase: 'Phase 03', title: 'Clean-Code Dev', desc: 'Writing semantic, perfectly structured, ultra-fast components.' },
        { phase: 'Phase 04', title: 'Speed Certification', desc: 'Extensive performance testing to secure 100/100 Google Lighthouse scores.' }
      ]
    },
    app: {
      philosophy: 'Ultra-Low Latency Native Performance Built for Multi-Million User Scales.',
      pillars: [
        {
          title: 'Reactive Concurrent Pipelines',
          desc: 'Asynchronous state management and event-driven architecture that ensures fluid interface frames even during heavy background processing.'
        },
        {
          title: 'Offline-First Sync Engine',
          desc: 'Built-in local serverless database synchronization with intelligent vector-based collision resolution to support disconnected states.'
        },
        {
          title: 'End-to-End Analytics Stream',
          desc: 'Comprehensive visual telemetry pipelines tracking micro-interactions, conversion funnels, and performance bottlenecks in real-time.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Product Mapping', desc: 'Designing product blueprints, state machines, and system integration specs.' },
        { phase: 'Phase 02', title: 'UX Flow Design', desc: 'Iterating dynamic mobile screens and micro-interaction prototypes.' },
        { phase: 'Phase 03', title: 'Engine Coding', desc: 'Developing the frontend app and connecting robust backend APIs.' },
        { phase: 'Phase 04', title: 'Telemetry Deploy', desc: 'Beta testing through TestFlight / Play Store with integrated error telemetry.' }
      ]
    },
    brand: {
      philosophy: 'Category Design: Forging Brands That Command Market Premiums.',
      pillars: [
        {
          title: 'Competitive Market Telemetry',
          desc: 'Deep qualitative analysis of industry competitor structures, isolating category blind spots to design your distinct market monopoly.'
        },
        {
          title: 'Verbal Identity Token System',
          desc: 'Engineering precise narrative frameworks, category definitions, and messaging blueprints to unify your sales, product, and leadership channels.'
        },
        {
          title: 'Dynamic Asset Design',
          desc: 'Crafting comprehensive, scalable brand books, design tokens, color guidelines, and media kits ready for global enterprise integration.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Category Audit', desc: 'Uncovering audience psychology and mapping competitor positions.' },
        { phase: 'Phase 02', title: 'Verbal Framework', desc: 'Establishing brand pillars, messaging matrices, and core positioning.' },
        { phase: 'Phase 03', title: 'Identity Rendering', desc: 'Iterating high-impact logo systems and comprehensive visual concepts.' },
        { phase: 'Phase 04', title: 'System Handover', desc: 'Deploying robust style guides and design tokens across product suites.' }
      ]
    },
    social: {
      philosophy: 'Attention Engineering: Programmatic Paid Campaigns & Viral Telemetry.',
      pillars: [
        {
          title: 'Attention Triggers',
          desc: 'Hook frameworks engineered using modern short-form video algorithms and cognitive psychology principles to maximize click-through and dwell rates.'
        },
        {
          title: 'Algorithmic Paid Retargeting',
          desc: 'Multi-stage behavioral custom audience setups (TOFU, MOFU, BOFU) designed to move prospects seamlessly through the customer lifecycle.'
        },
        {
          title: 'Predictive Trend Analysis',
          desc: 'Tracking platform trends, format shifts, and audio loops in real-time using custom data APIs to execute campaigns before they peak.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Funnel Architecture', desc: 'Designing customized conversion pathways and retargeting blueprints.' },
        { phase: 'Phase 02', title: 'Hook Engineering', desc: 'Generating premium visual hook concepts and high-impact messaging.' },
        { phase: 'Phase 03', title: 'Paid Optimization', desc: 'Launching ad sets, running algorithmic bids, and A/B split-testing.' },
        { phase: 'Phase 04', title: 'Scale & Compound', desc: 'Reviewing performance reports and allocating capital to high-ROI channels.' }
      ]
    },
    aiVoice: {
      philosophy: 'Neuromorphic Conversational Pipelines Shipped with Low-Latency Streaming.',
      pillars: [
        {
          title: 'Low-Latency Streaming',
          desc: 'Ultra-low response delay (sub-800ms) achieved through native audio streaming, edge VAD (Voice Activity Detection), and streaming LLM chunking.'
        },
        {
          title: 'Custom Cognitive Workflows',
          desc: 'Equipped with context-aware memory buffers, state-machine agent architectures, and direct REST API hooks to retrieve/update user databases.'
        },
        {
          title: 'Emotion & Vocal Tuning',
          desc: 'Advanced speech synthesizer calibration targeting perfect tone, pitch, inflection, and natural pauses to match your exact brand archetype.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Agent Blueprint', desc: 'Mapping user conversation trees and database API access points.' },
        { phase: 'Phase 02', title: 'Pipeline Integration', desc: 'Configuring VAD models, LLM routing, and streaming audio buffers.' },
        { phase: 'Phase 03', title: 'Tone Calibration', desc: 'Polishing voice synthesis variables and setting up speech metrics.' },
        { phase: 'Phase 04', title: 'Deploy & Monitor', desc: 'Launching agents on phone trunks / web portals with live dashboard tracking.' }
      ]
    },
    logoDesign: {
      philosophy: 'Geometric Mastery: Creating Visual Trademarks That Outlast Trends.',
      pillars: [
        {
          title: 'Geometric Grid Systems',
          desc: 'Every mark is engineered utilizing precise mathematical ratios, golden grid lines, and perfect symmetry to guarantee infinite visual scaling.'
        },
        {
          title: 'Contextual Color Mapping',
          desc: 'Color palettes developed using evolutionary psychology, market context, and accessibility rules to maximize emotional impact.'
        },
        {
          title: 'Multi-Surface Optimization',
          desc: 'Rigorous responsive testing across digital favicons, mobile apps, billboards, and debossed letterpress interfaces to ensure utility.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Creative Discovery', desc: 'Deconstructing industry codes and outlining visual metaphors.' },
        { phase: 'Phase 02', title: 'Geometric Sketching', desc: 'Building vector marks on strict mathematical grid models.' },
        { phase: 'Phase 03', title: 'Visual Iteration', desc: 'Refining selected marks with custom typographic letterforms.' },
        { phase: 'Phase 04', title: 'Asset Package', desc: 'Delivering full SVG bundles, brand sheets, and style books.' }
      ]
    },
    productPhotography: {
      philosophy: 'Hyper-Fidelity Commercial Rendering: Bringing Products to Life.',
      pillars: [
        {
          title: 'High-Fidelity Capture',
          desc: 'Leveraging medium-format raw digital capture systems to extract pristine color depth, infinite dynamic range, and extreme sharpness.'
        },
        {
          title: 'Focus Stacking & CGI Hybrid',
          desc: 'Advanced software focus stacking combined with raw 3D scene elements to achieve flawless edge-to-edge sharpness and texture rendering.'
        },
        {
          title: 'Chroma & Color Grading',
          desc: 'Precision color profiling matching your exact product physical packaging, retouched by commercial high-end beauty retouncers.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Creative Scoping', desc: 'Developing mood boards, art direction, and dynamic lighting plans.' },
        { phase: 'Phase 02', title: 'Studio Capture', desc: 'Setting up high-end camera rigs, diffuse lighting, and angles.' },
        { phase: 'Phase 03', title: 'Beauty Retouch', desc: 'Executing focus blending, scratch removal, and lighting enhancement.' },
        { phase: 'Phase 04', title: 'Delivery', desc: 'Exporting web-ready assets in lossless, compressed next-gen formats.' }
      ]
    },
    digitalMarketing: {
      philosophy: 'Funnel Engineering: Programmatic Capital Allocation & Growth Trajectories.',
      pillars: [
        {
          title: 'Programmatic Bidding Engines',
          desc: 'Algorithmic auction models dynamically adjusting bids across Google, Meta, and LinkedIn based on real-time CAC-to-LTV performance.'
        },
        {
          title: 'Multi-Touch Attribution',
          desc: 'Deploying advanced data pipelines and custom tracking parameters to measure exact customer conversion paths and organic touchpoints.'
        },
        {
          title: 'Cohort Value Modeling',
          desc: 'Predictive models projecting customer lifetime value to optimize early acquisition campaigns and double down on high-value cohorts.'
        }
      ],
      steps: [
        { phase: 'Phase 01', title: 'Audit & Setup', desc: 'Tracking conversion events, tag managers, and data pipelines.' },
        { phase: 'Phase 02', title: 'Strategy Architecture', desc: 'Setting up campaign budgets, bidding options, and custom audiences.' },
        { phase: 'Phase 03', title: 'Creative Deployment', desc: 'Deploying dynamic creative assets across major ad channels.' },
        { phase: 'Phase 04', title: 'Scaling Funnel', desc: 'Incrementally scaling budget based on direct ROI and CPA targets.' }
      ]
    }
  };

  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    // Set mouse custom properties for spotlight shader
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle 3D Card Tilt Effect
    const tiltX = (y - rect.height / 2) / (rect.height / 2) * -8; // max 8deg tilt
    const tiltY = (x - rect.width / 2) / (rect.width / 2) * 8;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 800,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleCTA = () => {
    if (playSound) playSound('click');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      {/* Background glow shadow elements */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 175, 55, 0.02)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(83, 203, 243, 0.06)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--accent)',
            display: 'inline-block',
            marginBottom: '0.8rem',
          }}
        >
          Our Expertise
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '1.2rem' }}
        >
          Full-Spectrum Growth. Zero Guesswork.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          Every engagement is built on data, driven by creativity, and engineered to produce results your competitors won’t see coming.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid" style={{ perspective: 1000 }}>
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={handleHover}
              onClick={() => handleCardClick(service.id)}
              className="spotlight-card"
              style={{
                gridColumn: service.gridSpan,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '2rem',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                ...(cardThemes[service.id]?.card || {}),
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Custom glowing icon wrapper */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(cardThemes[service.id]?.icon || {}),
                  }}
                >
                  <IconComponent size={28} />
                </div>
                
                <h3 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 800, 
                  fontSize: '1.5rem', 
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)'
                }}>
                  {service.title}
                </h3>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.6 
                }}>
                  {service.desc}
                </p>
              </div>

              {/* Bottom detail action link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: cardThemes[service.id]?.accent || '#FFDE42',
                  transition: 'color 0.3s ease',
                }}
                className="card-action"
              >
                Learn more
                <ArrowUpRight size={16} style={{ 
                  transition: 'transform 0.3s ease',
                  color: cardThemes[service.id]?.accent || '#FFDE42'
                }} className="card-arrow" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <motion.button
          onClick={handleCTA}
          onMouseEnter={handleHover}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="btn-premium"
          style={{ border: 'none' }}
        >
          Ready to Outperform Your Market? Let’s Talk. <ArrowUpRight size={18} />
        </motion.button>
      </div>

      <AnimatePresence>
        {activeServiceId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="modal-overlay"
            onClick={() => setActiveServiceId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button inside modal-card (in padding area to avoid scrollbar) */}
              <button
                onClick={() => setActiveServiceId(null)}
                className="modal-close-btn"
                onMouseEnter={handleHover}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Modal Static Header (Not Scrollable) */}
              <div className="modal-static-header" style={{ position: 'relative', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', marginBottom: '1.5rem' }}>
                <div className="modal-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingRight: '3.5rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...(cardThemes[activeServiceId]?.icon || {}),
                    }}
                  >
                    {(() => {
                      const TargetIcon = services.find(s => s.id === activeServiceId)?.icon;
                      return TargetIcon ? <TargetIcon size={30} /> : null;
                    })()}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: cardThemes[activeServiceId]?.accent || '#FFDE42',
                    }}>
                      Proprietary Tech Pipeline
                    </span>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.1,
                      marginTop: '0.2rem',
                    }}>
                      {services.find(s => s.id === activeServiceId)?.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Scrollable Content Wrapper */}
              <div 
                data-lenis-prevent
                className="modal-scroll-content"
              >

                {/* Core Philosophy Banner */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderLeft: `4px solid ${cardThemes[activeServiceId]?.accent || '#FFDE42'}`,
                    padding: '1.2rem 1.8rem',
                    borderRadius: '0 12px 12px 0',
                    marginBottom: '2.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(15, 23, 42, 0.45)', fontWeight: 700 }}>
                    Strategic Philosophy
                  </div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1E293B', marginTop: '0.2rem', lineHeight: 1.4 }}>
                    {serviceDetails[activeServiceId]?.philosophy}
                  </p>
                </div>

                {/* Technical Pillars Section */}
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Technical Capabilities & Pillars
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="modal-pillars-grid">
                    {serviceDetails[activeServiceId]?.pillars.map((pillar, pIdx) => (
                      <div
                        key={pIdx}
                        style={{
                          background: 'rgba(0, 0, 0, 0.015)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          borderRadius: '16px',
                          padding: '1.5rem',
                          transition: 'border-color 0.3s ease',
                        }}
                        className="modal-pillar-card"
                      >
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.6rem' }}>
                          {pillar.title}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Implementation Roadmap */}
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Execution & Delivery Pipeline
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="modal-steps-grid">
                    {serviceDetails[activeServiceId]?.steps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          position: 'relative',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: cardThemes[activeServiceId]?.accent || '#FFDE42', opacity: 0.8 }}>
                          {step.phase}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>
                          {step.title}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="modal-actions-row" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', marginTop: '2rem' }}>
                  <button
                    onClick={() => setActiveServiceId(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(15, 23, 42, 0.15)',
                      color: '#0F172A',
                      padding: '0.9rem 1.8rem',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }}
                    className="modal-cancel-btn"
                    onMouseEnter={handleHover}
                  >
                    Close Exploration
                  </button>
                  <button
                    onClick={() => {
                      setActiveServiceId(null);
                      window.dispatchEvent(new CustomEvent('select-service', { detail: { service: activeServiceId } }));
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="btn-premium"
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '0.9rem 2.2rem',
                      fontSize: '0.95rem',
                      boxShadow: 'var(--shadow-glow)',
                    }}
                    onMouseEnter={handleHover}
                  >
                    Deploy Service <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .spotlight-card:hover .card-action {
          color: var(--accent) !important;
        }
        .spotlight-card:hover .card-arrow {
          transform: translate(3px, -3px);
        }
        
        /* Premium Responsive Modal Classes */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(5, 10, 25, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .modal-overlay {
            padding: 0.8rem !important;
          }
        }

        .modal-card {
          width: 100%;
          max-width: 850px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 0 50px rgba(0, 0, 0, 0.03);
          border-radius: 24px;
          padding: 3rem;
          position: relative;
          z-index: 100000;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }
        @media (max-width: 640px) {
          .modal-card {
            padding: 1.2rem !important;
            border-radius: 16px !important;
            max-height: 75vh !important;
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #0F172A;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          z-index: 101000;
        }
        .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.08) !important;
          transform: scale(1.08);
        }
        @media (max-width: 640px) {
          .modal-close-btn {
            top: 0.8rem !important;
            right: 0.8rem !important;
            width: 32px !important;
            height: 32px !important;
          }
        }

        .modal-scroll-content {
          overflow-y: auto;
          max-height: calc(85vh - 12rem);
          padding-right: 1rem;
          display: flex;
          flex-direction: column;
        }
        .modal-scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
          border-radius: 3px;
        }
        .modal-scroll-content::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.12);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        .modal-scroll-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 640px) {
          .modal-scroll-content {
            max-height: calc(75vh - 8rem) !important;
            padding-right: 0.4rem !important;
          }
        }

        @media (max-width: 640px) {
          .modal-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.8rem !important;
            margin-top: 1rem !important;
          }
        }

        .modal-cancel-btn:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          border-color: rgba(0, 0, 0, 0.3) !important;
        }
        .modal-pillar-card:hover {
          border-color: rgba(0, 0, 0, 0.12) !important;
        }

        @media (max-width: 640px) {
          .modal-actions-row {
            flex-direction: column-reverse !important;
            gap: 1rem !important;
            width: 100% !important;
          }
          .modal-actions-row button {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 1024px) {
          .spotlight-card {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 768px) {
          .modal-pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-steps-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .modal-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
