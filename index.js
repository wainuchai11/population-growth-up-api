const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();
const port = 6000;

app.get("/api/populationDemography", (req, res) => {
  const results = [];
  const csvFilePath = path.join(
    __dirname,
    "public",
    "population-and-demography.csv"
  );

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
