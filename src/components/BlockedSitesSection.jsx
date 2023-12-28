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
}) {
  const [newWebsite, setNewWebsite] = useState("");
  const [editedTitle, setEditedTitle] = useState(title);

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
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit section title"
            />
            <button onClick={handleEditSectionTitle}>Edit Section Title</button>
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
};
