
import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  bgColor: string;
  titleColor?: string; // Nuevo prop opcional
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, bgColor, titleColor, children }) => {
  return (
    <section id={id} className={`${bgColor} transition-colors duration-500 min-h-screen relative`}>
      {title && (
        <div className="pt-24 px-6 lg:px-12">
          <h2 className={`serif text-4xl lg:text-6xl ${titleColor || 'text-current'} sticky top-12 select-none pointer-events-none`}>
            {title}
          </h2>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};
