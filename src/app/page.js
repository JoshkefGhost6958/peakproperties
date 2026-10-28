"use client";

import { useState } from "react";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraHero from "@/components/Sphera/SpheraHero";
import SpheraAbout from "@/components/Sphera/SpheraAbout";
import SpheraCatalog, { CATALOG_PROJECTS } from "@/components/Sphera/SpheraCatalog";
import SpheraSteps from "@/components/Sphera/SpheraSteps";
import SiteViewingSection from "@/components/Sphera/SiteViewingSection";
import DirectContactSection from "@/components/Sphera/DirectContactSection";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import CaseStudyModal from "@/components/Sphera/CaseStudyModal";
import CustomHouseModal from "@/components/Sphera/CustomHouseModal";
import PriceDownloadModal from "@/components/Sphera/PriceDownloadModal";
import LegalModal from "@/components/Modals/LegalModal";
import ScrollProgress from "@/components/Effects/ScrollProgress";

export default function Home() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [customHouseOpen, setCustomHouseOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [legalType, setLegalType] = useState(null);

  const handleSelectHeroProject = (projectId) => {
    if (projectId === "bnb-ridge") {
      setSelectedProject(CATALOG_PROJECTS.bnbs[0]);
    } else {
      setSelectedProject(CATALOG_PROJECTS.villas[0]);
    }
  };

  const scrollToSiteViewing = () => {
    const el = document.getElementById("site-viewing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookViewingForProject = (project) => {
    scrollToSiteViewing();
  };

  return (
    <main>
      {/* Top Scroll Reading Progress & Back-to-Top Glass Button */}
      <ScrollProgress />

      {/* Header with WhatsApp & Site Viewing CTA */}
      <SpheraHeader
        onOpenSiteViewing={scrollToSiteViewing}
      />

      {/* Hero Section */}
      <SpheraHero
        onSelectProject={handleSelectHeroProject}
        onOpenSiteViewing={scrollToSiteViewing}
      />

      {/* Our Promise: What You See Is What You Get */}
      <SpheraAbout
        onOpenSiteViewing={scrollToSiteViewing}
      />

      {/* Properties & BnBs (Apartments, Villas, Houses, BnBs) */}
      <SpheraCatalog
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Construction & Vetted Contractors Showcase */}
      <SpheraSteps
        onOpenContractorInquiry={() => setCustomHouseOpen(true)}
      />

      {/* Interactive Site Viewing Booking */}
      <SiteViewingSection />

      {/* Direct Contact: Joseph Simiyu Kefa */}
      <DirectContactSection />

      {/* Footer */}
      <SpheraFooter
        onOpenLegal={(type) => setLegalType(type)}
        onOpenSiteViewing={scrollToSiteViewing}
      />

      {/* Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookViewing={handleBookViewingForProject}
      />

      <CustomHouseModal
        isOpen={customHouseOpen}
        onClose={() => setCustomHouseOpen(false)}
      />

      <PriceDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </main>
  );
}
