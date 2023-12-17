import { useState } from "react";
import PropTypes from "prop-types";

export default function AddBlockedSiteModal({ isOpen, onClose, onAddSection }) {
  const [currentTitle, setCurrentTitle] = useState("");

  function handleInput(event) {
    setCurrentTitle(event.target.value);
  }

  function addSection() {
    if (currentTitle.trim() != "") {
      onAddSection(currentTitle);
      setCurrentTitle("");
    }
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={() => onClose()}>
          &times;
        </span>
        <h2>Add Section</h2>
        <input
          type="text"
          placeholder="Enter Section Title"
          value={currentTitle}
          onChange={handleInput}
        />
        <button onClick={addSection}>Add Section</button>
      </div>
    </div>
  );
}

AddBlockedSiteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddSection: PropTypes.func.isRequired,
};
