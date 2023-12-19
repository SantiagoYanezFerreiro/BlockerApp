import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function AddBlockedSiteModal({
  isOpen,
  onClose,
  onAddOrEditSite,
  currentEditSite,
  isAddingSection,
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(currentEditSite || "");
  }, [currentEditSite, isOpen]);

  function handleSubmit() {
    if (inputValue.trim() !== "") {
      onAddOrEditSite(inputValue);
      console.log(inputValue);
      setInputValue("");
      onClose();
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <input
          type="text"
          placeholder={isAddingSection ? "Enter Section Title" : "Enter site"}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>
          {isAddingSection
            ? "Add Section"
            : currentEditSite
            ? "Edit Site"
            : "Add Site"}
        </button>
      </div>
    </div>
  );
}

AddBlockedSiteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddOrEditSite: PropTypes.func.isRequired,
  currentEditSite: PropTypes.string,
  isAddingSection: PropTypes.bool.isRequired,
};
