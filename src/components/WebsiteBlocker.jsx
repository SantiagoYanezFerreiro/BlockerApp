import { useState } from "react";
import BlockedSitesSection from "./BlockedSitesSection";
import AddBlockedSiteModal from "./AddBlockedSiteModal";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentEditSite, setCurrentEditSite] = useState(null);
  const [currentEditSectionIndex, setCurrentEditSectionIndex] = useState(null);

  function addSiteToSection(site) {
    if (isAddingSection) {
      addSection(site);
    } else if (site && currentEditSectionIndex !== null) {
      const updatedSections = [...sections];
      if (editIndex !== null) {
        updatedSections[currentEditSectionIndex].sites[editIndex] = site;
      } else {
        updatedSections[currentEditSectionIndex].sites.push(site);
      }
      setSections(updatedSections);
      resetModalAndEditState();
    }
  }

  function addSection(title) {
    if (title.trim() !== "") {
      setSections([...sections, { title, sites: [] }]);
      resetModalAndEditState();
    }
  }

  function openModalToAddNewSection() {
    isAddingSection(true);
    setIsModalOpen(true);
    resetEditStates();
  }

  function openModalForEdit(sectionIndex, siteIndex) {
    isAddingSection(true);
    setIsModalOpen(true);
    setEditIndex(siteIndex);
    setCurrentEditSite(sections[sectionIndex].sites[siteIndex]);
    setCurrentEditSectionIndex(sectionIndex);
  }

  function resetModalAndEditState() {
    setIsModalOpen(false);
    resetEditStates();
  }

  function resetEditStates() {
    setEditIndex(null);
    setCurrentEditSite(null);
    setCurrentEditSectionIndex(null);
    setIsAddingSection(false);
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
            setIsAddingSection(false);
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
