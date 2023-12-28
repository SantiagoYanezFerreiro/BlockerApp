import { useState } from "react";
import BlockedSitesSection from "./BlockedSitesSection";

export default function WebsiteBlocker() {
  const [sections, setSections] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const addSection = (title) => {
    setSections([...sections, { title, sites: [] }]);
  };

  const editSectionTitle = (index, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[index].title = newTitle;
    setSections(updatedSections);
  };

  const addWebsiteToSection = (sectionIndex, website) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites.push(website);
    setSections(updatedSections);
  };

  const editWebsiteInSection = (sectionIndex, websiteIndex, newWebsite) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sites[websiteIndex] = newWebsite;
    setSections(updatedSections);
  };

  const openModal = (index) => setActiveModalIndex(index);
  const closeModal = () => setActiveModalIndex(null);

  return (
    <div className="blocker-container">
      <h1>Website Blocker</h1>
      {sections.map((section, index) => (
        <BlockedSitesSection
          key={index}
          index={index}
          title={section.title}
          sites={section.sites}
          isModalOpen={activeModalIndex === index}
          onOpenModal={() => openModal(index)}
          onCloseModal={closeModal}
          onAddWebsite={(website) => addWebsiteToSection(index, website)}
          onEditWebsite={(websiteIndex, newWebsite) =>
            editWebsiteInSection(index, websiteIndex, newWebsite)
          }
          onEditSectionTitle={(newTitle) => editSectionTitle(index, newTitle)}
        />
      ))}
      <button onClick={() => addSection(`Section${sections.length + 1}`)}>
        Add Section
      </button>
    </div>
  );
}
