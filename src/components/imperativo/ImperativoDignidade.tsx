import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Hero } from './Hero';
import { Section } from './Section';
import { MortalityChart, JudicialChart } from './Charts';
import { CONTENT } from '../../data/imperativo-content';
import { useDonation } from '../../context/DonationContext';
import { Instagram, Heart, MessageCircle, ArrowLeft, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ImpactFlowSvg from './ImpactFlowSvg';

interface ImperativoDignidadeProps {
  onBack: () => void;
}

const ImperativoDignidade: React.FC<ImperativoDignidadeProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('intro');
  const { openDonationModal } = useDonation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'intro';
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute('id') || 'intro';
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F9F7F2] fixed inset-0 z-[200] overflow-y-auto">
      {/* Botón Volver Flotante (Móvil) */}
      <button
        onClick={onBack}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-brand-navy/90 text-white rounded-full shadow-lg backdrop-blur-md"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Botón Volver Persistente (Desktop - Top Right) */}
      <button
        onClick={onBack}
        className="hidden lg:flex fixed top-8 right-12 z-[250] items-center gap-3 px-6 py-3
                   bg-brand-navy/90 text-white rounded-full shadow-2xl backdrop-blur-md
                   hover:bg-brand-cyan hover:text-brand-navy transition-all duration-300 group
                   border border-white/10"
      >
        <span className="uppercase tracking-widest text-xs font-bold">Voltar ao Site</span>
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      </button>

      <Sidebar activeSection={activeSection} onBack={onBack} />

      <main className="flex-1 lg:ml-64 selection:bg-[#34BBCE] selection:text-white overflow-x-hidden relative">
        <Hero />

        {/* INTRODUÇÃO */}
        <Section id="intro" bgColor="bg-white">
          <div className="w-full max-w-none px-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[80vh]">
              <div className="lg:col-span-5 flex flex-col justify-center px-8 lg:px-0 lg:pl-24 lg:pr-12 py-20">
                <p className="text-3xl lg:text-5xl serif italic text-[#24526E] leading-tight mb-16 border-l-8 border-[#34BBCE] pl-8">
                  {CONTENT.intro_full[0]}
                </p>
                <div className="text-xl leading-relaxed text-gray-700 text-justify">
                  <p className="drop-cap">{CONTENT.intro_full[1]}</p>
                </div>
              </div>
              <div className="lg:col-span-7 h-full">
                <img
                  src="/assets/brand/donation/documento-imagenes/panorama-de-divinopolis.png"
                  alt="Panorama de Divinópolis"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ESTATÍSTICAS */}
        <Section id="stats" bgColor="bg-[#F9F7F2]" title="Diagnóstico" titleColor="text-[#34BBCE]">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl text-[#24526E] mb-16 leading-tight max-w-2xl">{CONTENT.stats_section.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
              <div className="space-y-8 text-lg leading-relaxed text-justify text-gray-700">
                <p className="drop-cap">{CONTENT.stats_section.p1}</p>
                <p>{CONTENT.stats_section.p2}</p>
              </div>
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <h4 className="text-center font-bold text-[#24526E] mb-12 uppercase tracking-[0.2em] text-[10px]">Mortalidade Oncológica</h4>
                <div className="h-72 w-full">
                  <MortalityChart />
                </div>
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {CONTENT.stats_section.table_mortality.map((item, i) => (
                    <div key={i} className="p-5 bg-[#F9F7F2] rounded-2xl text-center border border-gray-50">
                      <div className="text-[#34BBCE] font-bold text-3xl">{item.value}</div>
                      <div className="text-[9px] uppercase text-[#24526E] font-bold opacity-40 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xl leading-relaxed text-justify text-gray-700 max-w-3xl border-t border-gray-200 pt-16">
              <p>{CONTENT.stats_section.p3}</p>
            </div>
          </div>
        </Section>

        {/* HOSPITAL */}
        <Section id="hospital" bgColor="bg-[#24526E]" title="Estrutura">
          <div className="max-w-5xl mx-auto py-32 px-8 text-white">
            <h2 className="serif text-5xl mb-16 italic">{CONTENT.hospital_section.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-7 space-y-8 text-xl opacity-90 leading-relaxed text-justify">
                <p>{CONTENT.hospital_section.p1}</p>
                <blockquote className="py-16 px-10 bg-white/5 border-l-2 border-[#34BBCE] my-16 shadow-2xl">
                  <p className="serif text-4xl italic leading-tight">"{CONTENT.hospital_section.quote}"</p>
                </blockquote>
                <p>{CONTENT.hospital_section.p2}</p>
              </div>
              <div className="lg:col-span-5 sticky top-32">
                <img
                  src="/assets/brand/donation/documento-imagenes/ambientes-hospitalares-pyb.png"
                  alt="Ambientes Hospitalares"
                  className="aspect-[4/5] w-full object-cover rounded-2xl border border-white/10 opacity-60 mix-blend-overlay"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* JUDICIALIZAÇÃO */}
        <Section id="judicial" bgColor="bg-white" title="Legalidade" titleColor="text-[#34BBCE]">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl text-[#24526E] mb-12">{CONTENT.judicial_section.title}</h2>
            <p className="text-2xl text-gray-500 mb-20 max-w-3xl leading-relaxed italic">{CONTENT.judicial_section.intro}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
              <div className="p-12 bg-[#F9F7F2] rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="serif text-3xl text-[#24526E] mb-8 font-bold">{CONTENT.judicial_section.shield_title}</h3>
                <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                  <p>{CONTENT.judicial_section.shield_p1}</p>
                  <p>{CONTENT.judicial_section.shield_p2}</p>
                </div>
              </div>
              <div className="p-12 bg-[#24526E] text-white rounded-[3rem] shadow-xl">
                <h3 className="serif text-3xl text-[#34BBCE] mb-8 font-bold">{CONTENT.judicial_section.fraud_title}</h3>
                <div className="space-y-6 opacity-90 leading-relaxed text-justify">
                  <p>{CONTENT.judicial_section.fraud_p1}</p>
                  <p>{CONTENT.judicial_section.fraud_p2}</p>
                </div>
              </div>
            </div>

            <div className="h-[30rem] w-full pt-12">
              <h4 className="text-center serif text-3xl text-[#24526E] mb-16 italic font-light">Análise Econômica da Judicialização</h4>
              <JudicialChart />
            </div>
          </div>
        </Section>

        {/* REALIDADES */}
        <Section id="realities" bgColor="bg-[#F9F7F2]" title="Humanidade" titleColor="text-[#34BBCE]">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl text-[#24526E] mb-16">{CONTENT.realities_section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg text-gray-700 leading-relaxed text-justify">
              <div className="space-y-8 h-full">
                <p className="drop-cap">{CONTENT.realities_section.p1}</p>
                <div className="sticky top-32">
                  <img
                    src="/assets/brand/donation/documento-imagenes/cuidados-domiciliares.png"
                    alt="Cuidados Domiciliares"
                    className="aspect-video w-full object-cover border border-gray-100 rounded-2xl shadow-md"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <p>{CONTENT.realities_section.p2}</p>
                <div className="bg-[#24526E] text-white p-12 rounded-[2rem] shadow-lg">
                  <h3 className="serif text-3xl text-[#34BBCE] mb-6 italic">Terminalidade Pediátrica</h3>
                  <p className="opacity-90 leading-loose">{CONTENT.realities_section.pediatric}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* LAURA VITÓRIA */}
        <Section id="laura" bgColor="bg-white">
          <div className="max-w-5xl mx-auto py-40 px-8">
            <div className="text-center mb-32">
              <span className="text-[#34BBCE] font-bold tracking-[0.5em] uppercase text-xs">A Gênese do Amor</span>
              <h2 className="text-[#24526E] mt-12 leading-none flex flex-col items-center">
                <span className="serif text-6xl lg:text-8xl italic block mb-6">
                  {CONTENT.laura_section.title.split(':')[0]}:
                </span>
                <span className="font-sans text-xl lg:text-2xl uppercase tracking-[0.3em] font-bold opacity-50 max-w-4xl">
                  {CONTENT.laura_section.title.split(':')[1]}
                </span>
              </h2>
            </div>

            <div className="aspect-[21/10] bg-[#F9F7F2] mb-32 rounded-[4rem] border border-gray-100 overflow-hidden flex items-center justify-center italic text-gray-300 uppercase text-[10px] tracking-[0.5em]">
              <motion.img
                src="/assets/brand/donation/documento-imagenes/laura.png"
                alt="Laura Vitória"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-5">
                <h3 className="serif text-5xl text-[#24526E] sticky top-32 leading-tight italic font-light">
                  {CONTENT.laura_section.battle_title}
                </h3>
              </div>
              <div className="lg:col-span-7 space-y-10 text-xl leading-relaxed text-gray-700 text-justify">
                <p className="drop-cap">{CONTENT.laura_section.p1}</p>
                <p>{CONTENT.laura_section.battle_p1}</p>
                <div className="py-12 border-y border-gray-100 my-12">
                  <p className="text-3xl serif italic text-[#24526E] leading-snug">
                    {CONTENT.laura_section.battle_p2}
                  </p>
                </div>
                <p className="font-bold text-[#24526E] text-2xl leading-relaxed">{CONTENT.laura_section.battle_p3}</p>
              </div>
            </div>

            <div className="mt-40 p-20 bg-[#F9F7F2] rounded-[4rem] border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#34BBCE]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="serif text-4xl text-[#24526E] mb-10 relative z-10">{CONTENT.laura_section.community_title}</h3>
              <p className="text-2xl text-gray-700 leading-relaxed text-justify relative z-10 font-light italic">{CONTENT.laura_section.community_p1}</p>
            </div>
          </div>
        </Section>

        {/* IMPACTO E SERVIÇOS */}
        <Section id="impact" bgColor="bg-[#24526E]" title="Impacto">
          <div className="max-w-6xl mx-auto py-32 px-8 text-white">
            <h2 className="serif text-6xl mb-20">{CONTENT.impact_section.title}</h2>
            <p className="text-2xl mb-24 opacity-80 max-w-4xl font-light italic leading-relaxed">{CONTENT.impact_section.intro}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
              {CONTENT.impact_section.metrics.map((m, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] text-center hover:bg-white/10 transition-all duration-500 flex flex-col justify-center items-center">
                  <div className="text-[#34BBCE] text-5xl font-bold mb-3">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-16">
                <p className="text-xl opacity-90 leading-relaxed text-justify">{CONTENT.impact_section.therapies_p1}</p>
                <div className="space-y-10">
                  {CONTENT.impact_section.services.map((s, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-16 h-16 rounded-full border border-[#34BBCE]/30 flex-shrink-0 flex items-center justify-center text-[#34BBCE] text-xl font-serif group-hover:bg-[#34BBCE] group-hover:text-white transition-all duration-500">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-[#34BBCE] mb-2">{s.name}</h4>
                        <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-16 rounded-[3rem] border border-white/10 flex flex-col justify-center h-auto"> {/* h-auto applied */}
                <p className="serif text-3xl italic mb-12 opacity-90 leading-relaxed text-center font-light">
                  "{CONTENT.impact_section.metrics_p}"
                </p>
                {/* Removed placeholder div */}
              </div>
            </div>

            {/* NEW VISUAL FLOW */}
            <div className="w-full mt-24">
              <ImpactFlowSvg />
            </div>
          </div>
        </Section>

        {/* TESTEMUNHOS - LEGADO (2 Columnas: Texto / Imagen) */}
        <section id="mayara" className="w-full bg-[#F9F7F2] py-24">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* COLUMNA IZQUIERDA: TEXTO */}
              <div className="lg:col-span-6 space-y-12">
                <h2 className="serif text-5xl lg:text-6xl text-[#24526E] italic leading-tight">
                  {CONTENT.mayara_section.title}
                </h2>

                <div className="space-y-10">
                  {/* Tarjeta de Cita */}
                  <div className="bg-[#24526E]/5 p-12 rounded-[3rem] border border-[#24526E]/10 relative shadow-sm">
                    <span className="absolute -top-10 left-10 text-8xl text-[#34BBCE]/30 serif select-none">“</span>
                    <p className="relative z-10 italic serif text-2xl text-[#24526E] leading-relaxed">
                      {CONTENT.mayara_section.p1}
                    </p>
                  </div>

                  {/* Texto Descriptivo */}
                  <div className="text-xl text-gray-700 leading-relaxed text-justify font-light">
                    <p>{CONTENT.mayara_section.p2}</p>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: IMAGEN */}
              <div className="lg:col-span-6 h-full min-h-[500px] lg:min-h-[700px] overflow-hidden rounded-xl shadow-xl">
                <motion.img
                  src="/assets/brand/donation/documento-imagenes/mayara.png"
                  alt="Mayara sorrindo - Comunidade Paliativista"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* POLÍTICA PÚBLICA */}
        <Section id="policy" bgColor="bg-white" title="Futuro" titleColor="text-[#34BBCE]">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl md:text-6xl text-[#24526E] mb-12 italic leading-tight">{CONTENT.policy_section.title}</h2>
            <p className="text-2xl text-gray-400 mb-24 max-w-3xl leading-relaxed font-light">{CONTENT.policy_section.intro}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32">

              {/* Columna Izquierda: Directrices (Lista Limpia) */}
              <div className="space-y-16">
                <h3 className="serif text-4xl text-[#34BBCE] font-bold">Diretrizes CIB-SUS/MG</h3>
                <div className="space-y-10">
                  {CONTENT.policy_section.guidelines.map((g, i) => (
                    <div key={i} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0 hover:pl-4 transition-all duration-300 group">
                      <span className="text-[#34BBCE]/30 font-bold serif text-4xl group-hover:text-[#34BBCE] transition-colors">0{i + 1}</span>
                      <div>
                        <h4 className="font-bold text-xl text-[#24526E] mb-2 group-hover:text-[#34BBCE] transition-colors">{g.title}</h4>
                        <p className="text-gray-500 text-base leading-relaxed">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: FHEMIG (Tarjeta de Alto Contraste - Navy) */}
              <div className="bg-[#24526E] p-12 lg:p-16 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                {/* Elemento Decorativo de Fondo */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#34BBCE]/10 rounded-full blur-3xl group-hover:bg-[#34BBCE]/20 transition-colors duration-700"></div>

                <h3 className="serif text-3xl md:text-4xl text-white mb-10 font-bold relative z-10 italic border-l-4 border-[#34BBCE] pl-6">
                  {CONTENT.policy_section.fhemig_title}
                </h3>

                <p className="text-white/80 mb-12 text-lg leading-relaxed relative z-10 font-light">
                  {CONTENT.policy_section.fhemig_p}
                </p>

                <div className="grid grid-cols-1 gap-4 relative z-10">
                  {CONTENT.policy_section.protocols.map((p, i) => (
                    <div key={i} className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 hover:bg-[#34BBCE] hover:border-[#34BBCE] hover:text-[#24526E] transition-all duration-300 group/item cursor-default">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-[#34BBCE] text-[10px] uppercase tracking-[0.2em] group-hover/item:text-white transition-colors">{p.title}</h4>
                        <div className="w-2 h-2 rounded-full bg-[#34BBCE] group-hover/item:bg-white transition-colors"></div>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed group-hover/item:text-white/90 transition-colors">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tarjeta Inferior: RAS (Complementaria - Cyan Suave) */}
            <div className="p-16 bg-[#F0FBFC] rounded-[3rem] mb-32 border border-[#34BBCE]/20 relative overflow-hidden flex items-center justify-center text-center">
              <div className="max-w-3xl relative z-10">
                <p className="text-2xl md:text-3xl leading-relaxed italic text-[#24526E] font-serif">
                  "{CONTENT.policy_section.ras_p}"
                </p>
                <div className="w-24 h-1 bg-[#34BBCE] mx-auto mt-8 rounded-full opacity-50"></div>
              </div>
            </div>

          </div>
        </Section>

        {/* CONCLUSÃO */}
        <Section id="conclusion" bgColor="bg-[#24526E]" title="Epílogo">
          <div className="max-w-5xl mx-auto py-40 px-8 text-white">
            <h2 className="serif text-6xl mb-24 italic leading-none">{CONTENT.conclusion_section.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              <div className="lg:col-span-8 space-y-16">
                <p className="text-3xl opacity-95 leading-snug text-justify serif italic font-light">{CONTENT.conclusion_section.p1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {CONTENT.conclusion_section.recommendations.map((r, i) => (
                    <div key={i} className="p-8 bg-white/5 border-l-2 border-[#34BBCE] hover:bg-white/10 transition-all duration-500">
                      <h4 className="font-bold text-[#34BBCE] text-lg mb-3 tracking-wide">{r.title}</h4>
                      <p className="text-sm opacity-60 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-2xl opacity-80 leading-relaxed text-justify pt-16 border-t border-white/10 font-light italic">
                  {CONTENT.conclusion_section.final_p}
                </p>
              </div>
              <div className="lg:col-span-4 space-y-16 sticky top-32 h-fit">
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] shadow-xl">
                  <h4 className="serif text-2xl mb-8 text-[#34BBCE] italic">Fontes Técnicas</h4>
                  <ul className="space-y-5 text-[10px] uppercase tracking-[0.25em] opacity-50 font-medium leading-relaxed">
                    {CONTENT.sources.map((s, i) => (
                      <li key={i} className="border-b border-white/10 pb-4 last:border-0">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-[3/4] bg-white/5 rounded-[2rem] flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/brand/donation/documento-imagenes/final.png?v=2"
                    alt="O Legado do Cuidado"
                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Footer de Acciones Sociales */}
            <div className="mt-48 mb-20">
              <div className="h-px w-32 bg-[#34BBCE]/30 mx-auto mb-16"></div>

              <h3 className="serif text-4xl italic text-center text-white/90 mb-12">Junte-se a esta causa</h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                {/* Instagram Key Visual */}
                <a href="https://www.instagram.com/institutosobreviver37/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300 w-full md:w-auto justify-center">
                  <Instagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <span className="uppercase tracking-widest text-xs font-bold font-sans">Instagram</span>
                </a>

                {/* Botón de Donación Principal */}
                <button
                  onClick={() => {
                    onBack();
                    openDonationModal();
                  }}
                  className="group flex items-center gap-4 bg-[#34BBCE] border border-[#34BBCE] px-10 py-5 rounded-full hover:bg-white hover:text-[#24526E] transition-all duration-300 transform w-full md:w-auto justify-center shadow-[0_0_40px_rgba(52,187,206,0.3)]"
                >
                  <span className="uppercase tracking-[0.2em] text-sm font-bold font-sans">Faça sua Doação</span>
                  <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                </button>

                {/* WhatsApp */}
                <a href="https://wa.me/553797783092" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 w-full md:w-auto justify-center">
                  <span className="uppercase tracking-widest text-xs font-bold font-sans">WhatsApp</span>
                  <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>


              <div className="mt-24 relative flex flex-col md:flex-row items-center justify-between px-8 text-center md:text-left">
                <a
                  href="/assets/brand/o-imperativo-da-dignidade.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 group mb-8 md:mb-0"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#24526E] transition-all">
                    <FileDown size={16} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Baixar PDF completo</span>
                </a>

                <div>
                  <h3 className="serif text-3xl italic opacity-70 font-light mb-2 text-right">Divinópolis, Minas Gerais</h3>
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold text-right">Instituto Sobre'Viver — MMXXIV</p>
                </div>
              </div>
            </div>

          </div>
        </Section>

      </main>
    </div>
  );
};

export default ImperativoDignidade;
