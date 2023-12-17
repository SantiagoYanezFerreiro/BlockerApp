import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function AddBlockedSiteModal({
  isOpen,
  onClose,
  onAddOrEditSite,
  currentEditSite,
}) {
  const [siteTitle, setSiteTitle] = useState("");

  useEffect(() => {
    setSiteTitle(currentEditSite || "");
  }, [currentEditSite]);

  function handleSubmit() {
    if (siteTitle.trim() !== "") {
      onAddOrEditSite(siteTitle);
      setSiteTitle("");
      onClose();
    }
  }

  function handleInputChange(event) {
    setSiteTitle(event.target.value);
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Enter Site Name"
          value={siteTitle}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>
          {currentEditSite ? "Edit Site" : "Add Site"}
        </button>
      </div>
    </div>
  );
}

AddBlockedSiteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddSection: PropTypes.func.isRequired,
  onAddOrEditSite: PropTypes.func.isRequired,
  currentEditSite: PropTypes.string,
};
