import { useState, useEffect } from "react";

export default function WebsiteBlocker() {
  const [blockedSites, setBlockedSites] = useState([]);
  const [currentSite, setCurrentSite] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleInput(event) {
    setCurrentSite(event.target.value);
  }

  function addBlockedSite() {
    if (!blockedSites.includes(currentSite)) {
      if (editIndex !== null) {
        const updatedSites = [...blockedSites];
        updatedSites[editIndex] = currentSite;
        setBlockedSites(updatedSites);
        setEditIndex(null);
      } else {
        setBlockedSites([...blockedSites, currentSite]);
      }
      setCurrentSite("");
    }
  }

  function editBlockedSites(index) {
    setCurrentSite(blockedSites[index]);
    setEditIndex(index);
  }

  function deleteBlockedSites(index) {
    const updatedSites = [...blockedSites];
    updatedSites.splice(index, 1);
    setBlockedSites(updatedSites);
    setEditIndex(null);
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const currentSite = window.location.hostname;
      if (blockedSites.includes(currentSite)) {
        event.preventDefault();
        event.returnValue = "";
        console.log(`blocked site detected ${currentSite}`);
      }
    };

    const handleUnload = () => {
      const currentSiteHostname = window.location.hostname;
      if (blockedSites.some((site) => site.includes(currentSiteHostname))) {
        window.location.href = "https://www.example.com/blocked";
        console.log(`Blocked site detected: ${currentSiteHostname}`);
      }
    };

    //Add Event Listeners
    window.addEventListener("beforeUnload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    //Remove event listeners when component unmounts

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [blockedSites]);

  return (
    <div className="blocker-container">
      <h1>Website Blocker</h1>
      <input type="url" value={currentSite} onChange={handleInput} />
      <button onClick={addBlockedSite}>Add New Website</button>
      <div>
        {blockedSites.map((site, index) => (
          <div key={site}>
            <p>{site}</p>{" "}
            <button onClick={() => deleteBlockedSites(index)}>Delete</button>
            <button onClick={() => editBlockedSites(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
