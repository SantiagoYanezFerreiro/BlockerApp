const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use((req, res, next) => {
  const blockedSites = ["example.com", "blockedsite.com"];
  const requestedSite = req.hostname;

  if (blockedSites.includes(requestedSite)) {
    return res.redirect("https://www.your-redirect-page.com");
  }

  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
