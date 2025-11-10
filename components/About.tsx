'use client';

import { Code, Smartphone, Globe } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'JavaScript', icon: Code },
    { name: 'Python', icon: Code },
    { name: 'Kotlin', icon: Smartphone },
    { name: 'Fullstack', icon: Globe },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex items-center"
    >
      <div className="container mx-auto max-w-4xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          О себе
        </h2>
        
        <div className="space-y-6 sm:space-y-8">
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed text-center px-2">
            Я программист и fullstack разработчик с опытом работы с современными
            технологиями. Специализируюсь на создании качественных веб-приложений
            и мобильных решений.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 sm:p-5 md:p-6 bg-gray-900/50 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mb-2 sm:mb-3 md:mb-4" />
                  <span className="text-white text-sm sm:text-base md:text-lg font-medium text-center">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-12 space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center sm:text-left">
              Технологии
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
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
    </section>
  );
};

export default About;

