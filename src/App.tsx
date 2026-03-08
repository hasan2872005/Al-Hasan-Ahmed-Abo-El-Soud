/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Play, 
  MessageSquare, 
  X, 
  Send, 
  ChevronRight,
  Music,
  Briefcase
} from 'lucide-react';
import { getChatbotResponse } from './services/chatbot.ts';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="text-2xl font-serif font-bold gold-text-gradient tracking-widest">HOVEN</div>
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
        <a href="#home" className="hover:text-gold transition-colors">Home</a>
        <a href="#bio" className="hover:text-gold transition-colors">Story</a>
        <a href="#work" className="hover:text-gold transition-colors">Work</a>
        <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4 tracking-tighter">
          HOVEN
        </h1>
        <p className="text-lg md:text-xl text-gold-light/80 uppercase tracking-[0.3em] font-light max-w-2xl mx-auto">
          Cinematic Storytelling Through Sound
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

const Bio = () => {
  return (
    <section id="bio" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-12 gold-text-gradient">The Journey</h2>
        <div className="glass-card p-8 md:p-12 text-lg md:text-xl leading-relaxed font-light text-white/80 italic">
          "Hi, I’m Hoven, a music producer and composer obsessed with cinematic storytelling. For 5 years, I’ve been crafting music that blends orchestral emotion, modern textures, and raw energy, all while dreaming of scoring films, games, and visual projects."
        </div>
      </motion.div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="py-24 bg-dark-lighter px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 text-center">Featured Showcase</h2>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/wjhIfB6SaEM" 
            title="Mission Impossible Fight scene (with my music)" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, description, link }: { title: string, description: string, link: string, key?: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card group overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Music className="text-gold w-6 h-6" />
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-white/40 group-hover:text-gold transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
        <h3 className="text-xl font-serif mb-3 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gold hover:text-gold-light transition-colors mt-auto"
        >
          Listen Now <ChevronRight size={14} />
        </a>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const projects = [
    {
      title: "Days Gone (Cinematic Album)",
      description: "A deep dive into post-apocalyptic soundscapes, blending gritty textures with haunting orchestral melodies.",
      link: "https://youtu.be/zdLvYp8Vlmw"
    },
    {
      title: "Mission Impossible Fight Scene",
      description: "A high-octane re-score focusing on rhythmic tension and aggressive orchestral stabs.",
      link: "https://youtu.be/wjhIfB6SaEM"
    },
    {
      title: "No Tomorrow",
      description: "My latest electronic release. Exploring the boundaries between cinematic atmosphere and modern electronic energy.",
      link: "https://youtu.be/grZ46f-c7Q0"
    },
    {
      title: "Spirited Away",
      description: "A cinematic reimagining of a classic theme, focusing on ethereal textures and emotional depth.",
      link: "https://youtu.be/Hm2B-dIrmP4"
    },
    {
      title: "Journey",
      description: "An evocative track designed for visual storytelling, taking the listener through shifting emotional landscapes.",
      link: "https://youtu.be/wO4VXcElTI0"
    },
    {
      title: "Chernobyl (Album)",
      description: "A dark, atmospheric exploration of industrial decay and human tragedy through sound.",
      link: "https://youtu.be/F5GxrcYNt8c"
    }
  ];

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif mb-16 text-center gold-text-gradient">Selected Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={idx} 
            title={project.title} 
            description={project.description} 
            link={project.link} 
          />
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-dark-lighter px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8">Let's Collaborate</h2>
        <p className="text-white/60 mb-12 max-w-xl mx-auto">
          Whether you're looking for a score for your next film, a custom track for a game, or a professional mix, I'm ready to bring your vision to life.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href="mailto:aboelsoudhasan6@gmail.com" className="glass-card p-4 hover:bg-gold/10 transition-colors flex items-center gap-3">
            <Mail className="text-gold" />
            <span>Email Me</span>
          </a>
          <a href="https://www.upwork.com/freelancers/~017ad876a65a17f74f?mp_source=share" target="_blank" rel="noopener noreferrer" className="glass-card p-4 hover:bg-gold/10 transition-colors flex items-center gap-3">
            <Briefcase className="text-gold" />
            <span>Upwork</span>
          </a>
        </div>

        <div className="flex justify-center gap-8 border-t border-white/5 pt-12">
          <a href="https://youtube.com/@hhhoven?si=8Y0EbGESBoCeaWtn" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
            <Youtube size={24} />
          </a>
          <a href="https://www.instagram.com/hhhoven?igsh=OG43dW5uemxzOW5r" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/al-hasan-ahmed-69412838a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://open.spotify.com/artist/2zSNYcIrZlzJ4JPlK8dCHO?si=GlRfb4LQT8OUQeGELsz4Cg" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
            <Music size={24} />
          </a>
        </div>
        <p className="mt-12 text-xs text-white/20 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} HOVEN. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hi! I'm Hoven's AI assistant. Ask me anything about his music, style, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getChatbotResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card w-[350px] h-[450px] mb-4 flex flex-col overflow-hidden shadow-2xl border-gold/20"
          >
            <div className="bg-gold/10 p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase">Hoven AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold text-dark font-medium rounded-tr-none' 
                      : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my music..."
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-gold text-dark p-2 rounded-full hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gold text-dark p-4 rounded-full shadow-2xl flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Bio />
      <VideoSection />
      <Work />
      <Contact />
      <Chatbot />
    </div>
  );
}
