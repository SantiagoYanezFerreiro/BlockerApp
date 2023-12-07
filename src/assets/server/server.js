const express = require("express");
const app = express();
const port = 5173;

app.use(express.static("public"));

app.use((req, res, next) => {
  const blockedSites = ["example.com", "blockedsite.com"];
  const requestedSite = req.hostname;

  if (blockedSites.includes(requestedSite)) {
    return res.redirect("https://www.your-redirect-page.com");
  }

  next();
});

app.get("/api/data", (req, res) => {
  const data = { message: "Hello from the server!" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
