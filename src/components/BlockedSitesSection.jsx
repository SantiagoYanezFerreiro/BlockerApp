import React from "react";
import PropTypes from "prop-types";

export default function BlockedSitesSection({ title, sites, onAddSite }) {
  return (
    <div className="blocker-sites-section">
      <h2>{title}</h2>
      <ul>
        {sites.map((site, index) => (
          <li key={index}>{site}</li>
        ))}
      </ul>
      <button onClick={() => onAddSite(prompt("Enter a site"))}>
        Add Website
      </button>
    </div>
  );
}

BlockedSitesSection.propTypes = {
  title: PropTypes.string.isRequired,
  sites: PropTypes.array.isRequired,
  onAddSite: PropTypes.func.isRequired,
};
