'use client';

import { Send, Instagram, MessageCircle, Gamepad2 } from 'lucide-react';

const SocialLinks = () => {
  const socials = [
    {
      name: 'Telegram',
      url: 'https://t.me/name_kotik',
      icon: Send,
      color: 'hover:text-white',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/name_kotik',
      icon: Instagram,
      color: 'hover:text-white',
    },
    {
      name: 'Discord',
      url: 'https://discord.com',
      icon: MessageCircle,
      color: 'hover:text-white',
      username: 'etodastandetka',
    },
    {
      name: 'Steam',
      url: 'https://steamcommunity.com/profiles/76561199573089462',
      icon: Gamepad2,
      color: 'hover:text-white',
    },
  ];

  return (
    <section
      id="contacts"
      className="min-h-screen bg-gray-950 py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex items-center"
    >
      <div className="container mx-auto max-w-4xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          Контакты
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 md:p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:border-white/30 transition-all active:scale-95"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-800 ${social.color} transition-colors flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                    {social.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm truncate">
                    {social.username || social.url.replace(/^https?:\/\//, '')}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-white/70 text-sm sm:text-base">
            Свяжитесь со мной через любой из указанных каналов
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;

