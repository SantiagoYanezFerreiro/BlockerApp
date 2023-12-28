import { useState } from "react";
import PropTypes from "prop-types";

export default function BlockedSitesSection({
  index,
  title,
  sites,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onAddWebsite,
  onEditWebsite,
  onEditSectionTitle,
  onDeleteSection,
  onDeleteWebsite,
}) {
  const [newWebsite, setNewWebsite] = useState("");

  const handleAddWebsite = () => {
    onAddWebsite(newWebsite);
    setNewWebsite("");
  };

  const handleEditSectionTitle = () => {
    onEditSectionTitle(editedTitle);
  };

  return (
    <div className="blocker-sites-section">
      <h2 onClick={onOpenModal}>{title}</h2>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder="Enter new website"
            />
            <button onClick={handleAddWebsite}>Add Website</button>
            <input
              type="text"
              value={title} // Use title from props directly
              onChange={(e) => onEditSectionTitle(e.target.value)}
              placeholder="Enter Section Title"
            />
            <button onClick={() => onDeleteSection(index)}>
              Delete Section
            </button>
            <button onClick={onCloseModal}>Close</button>
          </div>
        </div>
      )}

      <ul>
        {sites.map((site, siteIndex) => (
          <li key={siteIndex}>
            {site}
            <button
              onClick={() =>
                onEditWebsite(siteIndex, prompt("Edit website", site))
              }
            >
              Edit
            </button>
            <button onClick={() => onDeleteWebsite(siteIndex)}>Delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

BlockedSitesSection.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  sites: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onAddWebsite: PropTypes.func.isRequired,
  onEditWebsite: PropTypes.func.isRequired,
  onEditSectionTitle: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
};
