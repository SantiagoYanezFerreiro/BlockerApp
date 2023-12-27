import { useState, useEffect } from "react";
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
    console.log("function add site called");
    const updatedSections = [...sections];
    if (isAddingSection) {
      if (site.trim() !== "") {
        setSections([...sections, { title: site, sites: [] }]);
      }
    } else if (site && currentEditSectionIndex !== null) {
      if (editIndex !== null) {
        updatedSections[currentEditSectionIndex].sites[editIndex] = site;
      } else {
        updatedSections[currentEditSectionIndex].sites.push(site);
      }
      console.log(updatedSections);
      setSections(updatedSections);
      resetModalAndEditState();
    }
  }

  useEffect(() => {
    console.log("Sections updated", sections);
  }, [sections]);

  function openModalToAddNewSection() {
    setIsAddingSection(true);
    setIsModalOpen(true);
    resetEditStates();
  }

  function openModalForEdit(sectionIndex, siteIndex) {
    setIsAddingSection(false);
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

      <AddBlockedSiteModal
        isOpen={isModalOpen}
        onClose={resetModalAndEditState}
        onAddOrEditSite={addSiteToSection}
        currentEditSite={currentEditSite}
        isAddingSection={isAddingSection}
      />

      <button onClick={openModalToAddNewSection}>Add Section</button>
    </div>
  );
}
