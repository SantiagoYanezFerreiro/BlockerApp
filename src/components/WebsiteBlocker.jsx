import { useState, useEffect } from "react";

export default function WebsiteBlocker() {
  const [blockedSites, setBlockedSites] = useState([]);
  const [currentSite, setCurrentSite] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const storedBlockedSites =
      JSON.parse(localStorage.getItem("blockedSites")) || [];
    setBlockedSites(storedBlockedSites);
  }, []);

  useEffect(() => {
    localStorage.setItem("blockedSites", JSON.stringify(blockedSites));
  }, [blockedSites]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/data");
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); //

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
    const currentSiteHostname = window.location.hostname;
    if (blockedSites.some((site) => site.includes(currentSiteHostname))) {
      window.location.replace("https://www.google.com");
      console.log(`Blocked site detected: ${currentSiteHostname}`);
    }
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
