
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#24526E]">
      {/* Visual Prompt: Soft ethereal abstract light shifting from Navy to Cyan. Very blurry, high editorial feel. */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#34BBCE_0%,_transparent_50%)] animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl px-8 text-center">
        <h1 className="serif text-white text-5xl lg:text-8xl leading-none mb-8 tracking-tight">
          O Imperativo da <br /> <span className="italic text-[#34BBCE]">Dignidade</span>
        </h1>
        <div className="h-px w-24 bg-[#34BBCE] mx-auto mb-8"></div>
        <p className="text-white/80 max-w-2xl mx-auto text-lg lg:text-xl font-light leading-relaxed uppercase tracking-[0.2em]">
          Uma Análise Abrangente dos Cuidados Paliativos no Oeste de Minas Gerais e a Missão Transformadora do Instituto Sobre'Viver
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-white/40 text-[10px] uppercase tracking-widest">Role para explorar</p>
        <div className="w-px h-12 bg-white/20"></div>
      </div>
    </header>
  );
};
