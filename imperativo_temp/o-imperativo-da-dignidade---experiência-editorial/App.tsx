
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { MortalityChart, JudicialChart } from './components/Charts';
import { CONTENT } from './content';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F9F7F2]">
      <Sidebar activeSection={activeSection} />
      
      <main className="flex-1 lg:ml-64 selection:bg-[#34BBCE] selection:text-white overflow-x-hidden">
        <Hero />
        
        {/* INTRODUÇÃO */}
        <Section id="intro" bgColor="bg-white">
          <div className="max-w-4xl mx-auto py-32 px-8 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <p className="text-3xl lg:text-5xl serif italic text-[#24526E] leading-tight mb-16 border-l-8 border-[#34BBCE] pl-8">
                  {CONTENT.intro_full[0]}
                </p>
                <div className="text-xl leading-relaxed text-gray-700 text-justify">
                  <p className="drop-cap">{CONTENT.intro_full[1]}</p>
                </div>
              </div>
              <div className="lg:col-span-4 flex items-start">
                <div className="aspect-[3/4] w-full bg-[#F9F7F2] border border-gray-100 flex items-center justify-center p-8 text-center italic text-gray-300 text-[10px] uppercase tracking-widest leading-loose">
                  [Imagem: Panorama de Divinópolis]
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ESTATÍSTICAS */}
        <Section id="stats" bgColor="bg-[#F9F7F2]" title="Diagnóstico">
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
                <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-12 text-center italic opacity-30 text-[10px] uppercase tracking-widest leading-loose">
                  [Imagem: Ambientes Hospitalares P&B]
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* JUDICIALIZAÇÃO */}
        <Section id="judicial" bgColor="bg-white" title="Legalidade">
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
        <Section id="realities" bgColor="bg-[#F9F7F2]" title="Humanidade">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl text-[#24526E] mb-16">{CONTENT.realities_section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg text-gray-700 leading-relaxed text-justify">
              <div className="space-y-8">
                <p className="drop-cap">{CONTENT.realities_section.p1}</p>
                <div className="aspect-video bg-white border border-gray-100 flex items-center justify-center italic text-gray-300 text-[10px] uppercase tracking-widest">
                  [Imagem: Cuidados Domiciliares]
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
                <h2 className="serif text-7xl lg:text-9xl text-[#24526E] mt-8 italic leading-none">{CONTENT.laura_section.title}</h2>
            </div>
            
            <div className="aspect-[21/10] bg-[#F9F7F2] mb-32 rounded-[4rem] border border-gray-100 overflow-hidden flex items-center justify-center italic text-gray-300 uppercase text-[10px] tracking-[0.5em]">
               [Fotografia Editorial: Laura Vitória]
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
                    <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] text-center hover:bg-white/10 transition-all duration-500">
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
                <div className="bg-white/5 p-16 rounded-[3rem] border border-white/10 flex flex-col justify-center">
                    <p className="serif text-3xl italic mb-12 opacity-90 leading-relaxed text-center font-light">
                        "{CONTENT.impact_section.metrics_p}"
                    </p>
                    <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center italic text-[9px] uppercase tracking-widest opacity-20 text-center p-12 leading-loose">
                      [Infográfico: Fluxo de Atendimento e Terapias]
                    </div>
                </div>
            </div>
          </div>
        </Section>

        {/* TESTEMUNHOS */}
        <Section id="mayara" bgColor="bg-[#F9F7F2]" title="Legado">
            <div className="max-w-4xl mx-auto py-40 px-8">
                <h2 className="serif text-6xl text-[#24526E] mb-20 text-center italic">{CONTENT.mayara_section.title}</h2>
                <div className="space-y-20">
                    <div className="bg-white p-20 rounded-[4rem] shadow-sm border border-gray-100 italic serif text-3xl text-gray-700 leading-snug relative text-center">
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl text-[#34BBCE]/20 serif select-none">“</span>
                        <p className="relative z-10">{CONTENT.mayara_section.p1}</p>
                    </div>
                    <div className="text-2xl text-gray-700 leading-relaxed text-justify space-y-10 font-light">
                        <p>{CONTENT.mayara_section.p2}</p>
                    </div>
                </div>
            </div>
        </Section>

        {/* POLÍTICA PÚBLICA */}
        <Section id="policy" bgColor="bg-white" title="Futuro">
          <div className="max-w-5xl mx-auto py-32 px-8">
            <h2 className="serif text-5xl text-[#24526E] mb-12">{CONTENT.policy_section.title}</h2>
            <p className="text-2xl text-gray-400 mb-24 max-w-3xl leading-relaxed italic">{CONTENT.policy_section.intro}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
                <div className="space-y-12">
                    <h3 className="serif text-4xl text-[#24526E] font-bold">Diretrizes CIB-SUS/MG</h3>
                    <div className="space-y-8">
                        {CONTENT.policy_section.guidelines.map((g, i) => (
                            <div key={i} className="flex gap-8 pb-8 border-b border-gray-100 last:border-0">
                                <span className="text-[#34BBCE] font-bold serif text-2xl">0{i+1}</span>
                                <div>
                                    <h4 className="font-bold text-xl text-[#24526E] mb-2">{g.title}</h4>
                                    <p className="text-gray-500 text-base leading-relaxed">{g.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#F9F7F2] p-16 rounded-[3.5rem] border border-gray-100 shadow-sm">
                    <h3 className="serif text-3xl text-[#24526E] mb-10 font-bold">{CONTENT.policy_section.fhemig_title}</h3>
                    <p className="text-gray-600 mb-10 text-lg italic leading-relaxed">{CONTENT.policy_section.fhemig_p}</p>
                    <div className="grid grid-cols-1 gap-6">
                        {CONTENT.policy_section.protocols.map((p, i) => (
                            <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#34BBCE] transition-colors group">
                                <h4 className="font-bold text-[#34BBCE] text-xs mb-2 uppercase tracking-[0.2em]">{p.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="p-16 bg-[#24526E] text-white rounded-[3rem] mb-32 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-[#34BBCE] h-full"></div>
                <p className="text-2xl leading-relaxed italic opacity-90 font-light">{CONTENT.policy_section.ras_p}</p>
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
                    <div className="aspect-[3/4] bg-white/5 rounded-[2rem] flex items-center justify-center italic text-[9px] uppercase tracking-[0.4em] opacity-20 text-center p-12 leading-loose">
                        [Foto Final: O Legado do Cuidado]
                    </div>
                </div>
            </div>

            <div className="mt-48 text-center pb-20">
                <div className="h-px w-32 bg-[#34BBCE]/30 mx-auto mb-16"></div>
                <p className="text-[10px] uppercase tracking-[0.8em] opacity-30 font-bold mb-6">Instituto Sobre'Viver — MMXXIV</p>
                <h3 className="serif text-4xl italic opacity-70 font-light">Divinópolis, Minas Gerais</h3>
            </div>
          </div>
        </Section>

      </main>
    </div>
  );
};

export default App;
