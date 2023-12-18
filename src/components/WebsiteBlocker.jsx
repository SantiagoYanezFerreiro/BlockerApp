import { useState } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import AddBlockedSiteModal from "./AddBlockedSiteModal";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentEditSite, setCurrentEditSite] = useState(null);
  const [currentEditSectionIndex, setCurrentEditSectionIndex] = useState(null);

  function addSiteToSection(site) {
    const updatedSections = [...sections];
    if (site && currentEditSectionIndex !== null) {
      if (editIndex !== null) {
        updatedSections[currentEditSectionIndex].sites[editIndex] = site;
      } else {
        updatedSections[currentEditSectionIndex].sites.push(site);
      }
      setSections(updatedSections);
      resetModalAndEditState();
    }
  }

  function openModalToAddNewSection() {
    setIsAddingSection(true);
    setIsModalOpen(true);
    // Reset other states
    setEditIndex(null);
    setCurrentEditSite(null);
    setCurrentEditSectionIndex(null);
  }

  function addSection(title) {
    if (title.trim() !== "") {
      setSections([...sections, { title, sites: [] }]);
    }
  }

  function openModalForEdit(sectionIndex, siteIndex) {
    setIsModalOpen(true);
    setEditIndex(siteIndex);
    setCurrentEditSite(sections[sectionIndex].sites[siteIndex]);
    setCurrentEditSectionIndex(sectionIndex);
  }

  function resetModalAndEditState() {
    setIsModalOpen(false);
    setEditIndex(null);
    setCurrentEditSite(null);
    setCurrentEditSectionIndex(null);
  }

  function deleteSite(sectionIndex, siteIndex) {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites.splice(siteIndex, 1);
    setSections(updatedSections);
  }

  return (
    <div className="blocker-container">
      <h1>Website Blocker</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={index}
          title={section.title}
          sites={section.sites}
          onAddSite={() => {
            setCurrentEditSectionIndex(index);
            setIsModalOpen(true);
          }}
          onEditSite={(siteIndex) => openModalForEdit(index, siteIndex)}
          onDeleteSite={(siteIndex) => deleteSite(index, siteIndex)}
        />
      ))}
      <button onClick={openModalToAddNewSection}>Add New Section</button>

      <AddBlockedSiteModal
        isOpen={isModalOpen}
        onClose={resetModalAndEditState}
        onAddOrEditSite={addSiteToSection}
        currentEditSite={currentEditSite}
      />
    </div>
  );
}
