import { useState } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import AddBlockedSiteModal from "./AddBlockedSiteModal";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addSiteToSection(sectionIndex, site) {
    if (site) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].sites.push(site);
      setSections(updatedSections);
    }
  }

  function addSection(title) {
    if (title.trim() !== "") {
      setSections([...sections, { title, sites: [] }]);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="blocker-container">
      <h1>Website Blocker</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={index}
          title={section.title}
          sites={section.sites}
          onAddSite={(site) => addSiteToSection(index, site)}
        />
      ))}
      <AddBlockedSiteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddSection={addSection}
      />
    </div>
  );
}
