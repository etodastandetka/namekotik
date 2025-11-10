'use client';

import { Code, Smartphone, Globe } from 'lucide-react';

const SecondPageHero = () => {
  const skills = [
    { name: 'JavaScript', icon: Code },
    { name: 'Python', icon: Code },
    { name: 'Kotlin', icon: Smartphone },
    { name: 'Fullstack', icon: Globe },
  ];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/2fon.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center">
            О себе
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed text-center px-2">
              Я программист и fullstack разработчик с опытом работы с современными
              технологиями. Специализируюсь на создании качественных веб-приложений
              и мобильных решений.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-3 sm:p-4 md:p-5 bg-gray-900/50 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mb-2 sm:mb-3" />
                    <span className="text-white text-xs sm:text-sm md:text-base font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 sm:mt-6 space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 text-center">
                Технологии
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {['JavaScript', 'TypeScript', 'Python', 'Kotlin', 'React', 'Next.js', 'Node.js', 'Express.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900/50 border border-white/10 rounded-full text-white text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondPageHero;

