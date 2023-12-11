import React, { useState } from "react";

export default function BlockedSitesSection({ title, sites, onAddSite }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const savedBlockedSite = (newSite) => {
    setBlockedSites([...blockedSites, newSite]);
  };

  return (
    <div className="blocker-container">
      <h1>Site Blocker</h1>
      <button onClick={() => addBlockedSection("New Section")}>
        Add New Section
      </button>
      {BlockedSitesSection.map((section, index) => {
        <BlockedSitesSection
          key={index}
          title={section.title}
          sites={section.sties}
          onAddSite={(newSite) => addBlockedSiteToSection(index, newSite)}
        />;
      })}
    </div>
  );
}
