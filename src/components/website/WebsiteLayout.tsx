import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProcessWorkflowSection } from './ProcessWorkflowSection';
import { ProjectsSection } from './ProjectsSection';
import { TeamSection } from './TeamSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const WebsiteLayout: React.FC = () => {
  const { activePublicPage, setActivePublicPage } = useApp();
  const [inquirySubjectPreset, setInquirySubjectPreset] = useState<string>('');

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setInquirySubjectPreset(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Main Content Sections with Scroll-Based 3D Flow */}
      <main className="flex-1">
        <HeroSection
          onExploreServices={() => handleNavigateSection('services')}
          onViewDemos={() => handleNavigateSection('projects')}
          onContactUs={() => handleNavigateSection('contact')}
        />

        <AboutSection />

        <ServicesSection onSelectServiceForContact={handleSelectServiceForContact} />

        <ProcessWorkflowSection />

        <ProjectsSection />

        <TeamSection />

        <TestimonialsSection />

        <ContactSection initialSubject={inquirySubjectPreset} />
      </main>

      {/* Footer with original MESARA AI logo and credit */}
      <Footer onNavigateSection={handleNavigateSection} />
    </div>
  );
};
