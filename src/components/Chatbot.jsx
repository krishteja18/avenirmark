import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, MessageCircle } from 'lucide-react';

export default function Chatbot({ playSound }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! Welcome to AvenirMark. I'm your digital brand assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Lead collection flow state
  // 'chat' | 'collect_name' | 'collect_phone' | 'completed'
  const [flowState, setFlowState] = useState('chat');
  const [leadData, setLeadData] = useState({ name: '', phone: '' });

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (playSound) playSound('click');
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender,
        text,
      },
    ]);
  };

  // Predefined Q&A Knowledge Base
  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();

    // Greeting
    if (text.match(/\b(hi|hello|hey|greetings|good morning|good afternoon)\b/)) {
      return "Hi there! I can help you with details about our digital marketing services, portfolio, or schedule a custom consultation. What interests you today?";
    }

    // Services
    if (text.match(/\b(services|service|seo|web|design|development|app|content|branding|logo|photography|digital marketing|voice agent)\b/)) {
      return "We offer premium high-performance digital services, including:\n" +
             "• SEO & Organic Strategy\n" +
             "• High-End Web Design & Dev\n" +
             "• App Development (iOS/Android)\n" +
             "• Brand Strategy & Logo Identity\n" +
             "• AI Voice Agents & Support Automation\n" +
             "• Product Photography\n" +
             "• 360° Social Media & Digital Marketing\n\n" +
             "Would you like to discuss a specific service or get in touch with our team?";
    }

    // Process
    if (text.match(/\b(process|methodology|how you work|how does it work)\b/)) {
      return "We use a refined 4-phase methodology to deliver compounding results:\n" +
             "1. Discovery (Audit & Strategy Planning)\n" +
             "2. Engineering (Vite, React, custom animations development)\n" +
             "3. Creative Design (Premium graphics & photography)\n" +
             "4. Omnichannel Distribution (Launch, scale, & growth)\n\n" +
             "We ensure high-touch premium quality every step of the way.";
    }

    // Pricing
    if (text.match(/\b(pricing|price|cost|how much|quote|charges|fees)\b/)) {
      return "Every project at AvenirMark is custom-scoped to fit the brand's unique goals, ensuring maximum ROI. To get a detailed quote for your project, let's schedule a brief consultation! Type 'consultation' or click 'Book a Consultation' below.";
    }

    // Portfolio / Work / Clients
    if (text.match(/\b(portfolio|work|clients|projects|case studies|showcase)\b/)) {
      return "We work with top-tier brands like Ekam, GAGA Luxury, and others. Our works span luxury brand identity, high-end web portals, campaigns, and brochures. You can explore them in our 'Selected Works' section on the homepage, or download our PDF portfolio.";
    }

    // About Avenirmark
    if (text.match(/\b(about|who are you|avenirmark|agency|company|experience|years)\b/)) {
      return "AvenirMark is an elite, high-end digital agency with over 10 years of experience. We serve luxury brands and high-value corporate clients, crafting high-performance campaigns, websites, and brand identities that compound value and drive direct conversions.";
    }

    // Default Fallback
    return "I'm a virtual helper for AvenirMark. You can ask me about our services, process, pricing, or portfolio. To have one of our directors contact you directly, type 'contact' or click 'Book a Consultation' below!";
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    if (playSound) playSound('click');

    // Add user message
    addMessage('user', text);
    setInputValue('');

    // Process chat based on lead collection flow
    if (flowState === 'collect_name') {
      const name = text;
      setLeadData((prev) => ({ ...prev, name }));
      setFlowState('collect_phone');
      
      // Bot requests phone
      setTimeout(() => {
        addMessage('bot', `Thank you, ${name}! To have our lead strategist reach out to you, what is your mobile number?`);
      }, 800);

    } else if (flowState === 'collect_phone') {
      const phone = text;
      const finalLeadData = { ...leadData, phone };
      setLeadData(finalLeadData);
      setFlowState('completed');

      // Add loading state message from bot
      setTimeout(() => {
        addMessage('bot', "Processing your request and notifying our directors...");
        
        // Trigger backend email delivery
        const updatedMessages = [
          ...messages,
          { sender: 'user', text: leadData.name }, // user's name message
          { sender: 'user', text: phone } // user's phone message
        ];

        fetch('/api/send-email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadData.name,
            phone: phone,
            messages: updatedMessages,
          }),
        })
          .then((res) => {
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              return res.json();
            }
            return res.text().then((text) => {
              console.warn("AvenirMark Chatbot: Server responded with non-JSON text. If you are in local development (npm run dev), Vite serves PHP files as static plain text rather than executing them.");
              return { success: false, localDev: true, rawText: text.substring(0, 100) };
            });
          })
          .then((data) => {
            console.log("Lead email response:", data);
          })
          .catch((err) => {
            console.error("Error sending lead email:", err);
          });

        // Bot finishes flow and directs to WhatsApp
        setTimeout(() => {
          addMessage('bot', `All set, ${leadData.name}! I've dispatched your consultation request to our management team. They will contact you shortly.`);
          addMessage('bot', "For immediate consultation or to discuss project details right away, please connect with us on WhatsApp.");
        }, 1200);

      }, 800);

    } else {
      // Normal Chat Flow
      if (text.toLowerCase().match(/\b(consultation|contact|hire|get in touch|book|start|callback|call)\b/)) {
        setFlowState('collect_name');
        setTimeout(() => {
          addMessage('bot', "I'd love to help you schedule a consultation! To get started, could you please share your name?");
        }, 800);
      } else {
        setTimeout(() => {
          const response = getBotResponse(text);
          addMessage('bot', response);
        }, 800);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const triggerConsultation = () => {
    if (playSound) playSound('click');
    setFlowState('collect_name');
    addMessage('user', "I'd like to book a consultation");
    setTimeout(() => {
      addMessage('bot', "Excellent decision. I can gather your info right here. First, what is your name?");
    }, 600);
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSend(suggestionText);
  };

  // WhatsApp Redirection Link generator
  const getWhatsAppLink = () => {
    const defaultNumber = "919966093777";
    const text = `*New Lead from AvenirMark Chatbot*\n\n` +
                 `*Name:* ${leadData.name || 'Anonymous Client'}\n` +
                 `*Phone:* ${leadData.phone || 'Not Shared'}\n` +
                 `*Interest:* Custom Brand Consultation`;
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={handleHover}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '2px solid var(--accent)',
          boxShadow: '0 8px 30px rgba(27, 39, 81, 0.12), var(--shadow-glow)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          outline: 'none',
        }}
        className="chatbot-trigger-btn"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <MessageSquare size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            data-lenis-prevent
            style={{
              position: 'fixed',
              bottom: '6.5rem',
              right: '2rem',
              width: '380px',
              height: '520px',
              zIndex: 99998,
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(27, 39, 81, 0.12)',
              boxShadow: '0 20px 50px rgba(27, 39, 81, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'var(--font-body)',
            }}
            className="chatbot-window"
          >
            {/* Header */}
            <div
              style={{
                padding: '1.2rem 1.5rem',
                background: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
                borderBottom: '1px solid rgba(27, 39, 81, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Bot size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                    AvenirBot
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        boxShadow: '0 0 8px var(--accent)',
                        display: 'inline-block',
                      }}
                      className="pulsing-dot"
                    />
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Always Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleToggle}
                onMouseEnter={handleHover}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Content */}
            <div
              data-lenis-prevent
              style={{
                flex: 1,
                padding: '1.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              className="chatbot-messages-container"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                      background: msg.sender === 'user' ? 'rgba(255, 222, 66, 0.15)' : '#F1F5F9',
                      border: msg.sender === 'user' ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(27, 39, 81, 0.05)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      lineHeight: '1.45',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Special WhatsApp action button when completed */}
              {flowState === 'completed' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={handleHover}
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      padding: '0.75rem 1.4rem',
                      borderRadius: '50px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'none',
                      border: 'none',
                    }}
                    onClick={() => {
                      if (playSound) playSound('click');
                    }}
                  >
                    <MessageCircle size={18} />
                    Connect on WhatsApp
                  </a>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* suggestion chips for Q&A */}
            {flowState === 'chat' && (
              <div
                data-lenis-prevent
                style={{
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  gap: '0.45rem',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  borderTop: '1px solid rgba(27, 39, 81, 0.05)',
                  background: 'rgba(248, 250, 252, 0.8)',
                }}
                className="chatbot-suggestions"
              >
                <button
                  onClick={triggerConsultation}
                  onMouseEnter={handleHover}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid var(--accent)',
                    background: '#FFFFFF',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    cursor: 'none',
                  }}
                >
                  Book a Consultation
                </button>
                <button
                  onClick={() => handleSuggestionClick("What services do you offer?")}
                  onMouseEnter={handleHover}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(27, 39, 81, 0.08)',
                    background: '#FFFFFF',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'none',
                  }}
                >
                  Services
                </button>
                <button
                  onClick={() => handleSuggestionClick("How does your process work?")}
                  onMouseEnter={handleHover}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(27, 39, 81, 0.08)',
                    background: '#FFFFFF',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'none',
                  }}
                >
                  Our Process
                </button>
              </div>
            )}

            {/* Input Bar */}
            <div
              style={{
                padding: '1rem',
                borderTop: '1px solid rgba(27, 39, 81, 0.08)',
                background: '#F8FAFC',
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                placeholder={
                  flowState === 'collect_name'
                    ? "Enter your name..."
                    : flowState === 'collect_phone'
                    ? "Enter mobile number..."
                    : flowState === 'completed'
                    ? "Chat completed."
                    : "Type a message..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={flowState === 'completed'}
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: '1px solid rgba(27, 39, 81, 0.1)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  cursor: 'text',
                }}
              />
              <button
                onClick={() => handleSend()}
                onMouseEnter={handleHover}
                disabled={flowState === 'completed' || !inputValue.trim()}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--accent)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: flowState === 'completed' || !inputValue.trim() ? 0.5 : 1,
                  cursor: 'none',
                  outline: 'none',
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pulsing-dot {
          animation: pulse-gold 2s infinite;
        }
        @keyframes pulse-gold {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 222, 66, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(255, 222, 66, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 222, 66, 0);
          }
        }
        .chatbot-trigger-btn {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease !important;
        }
        .chatbot-trigger-btn:hover {
          transform: scale(1.08) !important;
          box-shadow: 0 0 25px rgba(255, 222, 66, 0.4) !important;
        }
        /* Custom scrollbar for message window */
        .chatbot-messages-container::-webkit-scrollbar {
          width: 5px;
        }
        .chatbot-messages-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-messages-container::-webkit-scrollbar-thumb {
          background: rgba(27, 39, 81, 0.1);
          border-radius: 10px;
        }
        .chatbot-messages-container::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
        .chatbot-suggestions::-webkit-scrollbar {
          height: 0px;
        }
      `}</style>
    </>
  );
}
