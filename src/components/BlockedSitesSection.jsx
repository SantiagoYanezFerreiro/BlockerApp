import PropTypes from "prop-types";

export default function BlockedSitesSection({
  title,
  sites,
  onAddSite,
  onEditSite,
  onDeleteSite,
}) {
  return (
    <div className="blocker-sites-section">
      <h2>{title}</h2>
      <ul>
        {sites.map((site, index) => (
          <li key={index}>
            {site}
            <button onClick={() => onEditSite(index)}>Edit</button>
            <button onClick={() => onDeleteSite(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onAddSite}>Add Website</button>
    </div>
  );
}

BlockedSitesSection.propTypes = {
  title: PropTypes.string.isRequired,
  sites: PropTypes.array.isRequired,
  onAddSite: PropTypes.func.isRequired,
  onEditSite: PropTypes.func.isRequired,
  onDeleteSite: PropTypes.func.isRequired,
};
