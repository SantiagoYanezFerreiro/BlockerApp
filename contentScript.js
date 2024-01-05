useEffect(() => {
  const blockedSites = sections.flatMap((section) => section.sites);
  const currentSite = window.location.hostname;

  if (blockedSites.includes(currentSite)) {
    window.location.href = "www.google.com";
  }
}, [sections]);
