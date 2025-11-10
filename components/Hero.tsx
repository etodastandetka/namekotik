'use client';

import Link from 'next/link';
import { Send, Instagram, MessageCircle, Gamepad2, ArrowRight } from 'lucide-react';

const Hero = () => {
  const socials = [
    {
      name: 'Telegram',
      url: 'https://t.me/name_kotik',
      icon: Send,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/name_kotik',
      icon: Instagram,
    },
    {
      name: 'Discord',
      url: 'https://discord.com',
      icon: MessageCircle,
    },
    {
      name: 'Steam',
      url: 'https://steamcommunity.com/profiles/76561199573089462',
      icon: Gamepad2,
    },
  ];

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/fon.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          name_kotik
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 px-4 mb-8 sm:mb-12">
          Fullstack Developer
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link
            href="/second"
            className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all active:scale-95"
          >
            О себе
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contacts"
            className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all active:scale-95"
          >
            Контакты
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-95"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;

