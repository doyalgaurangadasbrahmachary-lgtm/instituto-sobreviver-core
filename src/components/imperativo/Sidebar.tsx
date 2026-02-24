
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onBack: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onBack }) => {
  const links = [
    { id: 'intro', label: 'Introdução' },
    { id: 'stats', label: 'Estatísticas' },
    { id: 'hospital', label: 'Infraestrutura' },
    { id: 'judicial', label: 'Judicialização' },
    { id: 'realities', label: 'Realidades' },
    { id: 'laura', label: 'Laura Vitória' },
    { id: 'impact', label: 'Impacto Social' },
    { id: 'mayara', label: 'Testemunhos' },
    { id: 'policy', label: 'Políticas' },
    { id: 'conclusion', label: 'Conclusão' },
  ];

  return (
    <nav className="hidden lg:flex lg:fixed lg:w-64 lg:h-full bg-[#24526E] text-white p-8 flex-col z-50 border-r border-white/5">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 hover:text-[#34BBCE] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Site
        </button>
        <h2 className="serif text-2xl leading-none font-bold">Sobre'Viver</h2>
        <p className="text-[#34BBCE] text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Relatório Técnico 2024</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`block text-xs uppercase tracking-widest transition-all duration-500 hover:text-[#34BBCE] ${activeSection === link.id
              ? 'text-[#34BBCE] translate-x-2 font-bold'
              : 'text-white/40'
              }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-white/10 flex-shrink-0 flex flex-col gap-6">
        <img
          src="/assets/brand/donation/documento-imagenes/rostro logo.png"
          alt="Rostro Logo"
          className="w-24 opacity-20 hover:opacity-100 transition-opacity duration-500"
        />
        <div className="text-[9px] text-white/30 leading-relaxed uppercase tracking-widest">
          O Imperativo da Dignidade<br />
          Divinópolis, MG
        </div>
      </div>
    </nav>
  );
};
