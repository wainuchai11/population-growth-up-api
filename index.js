const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

app.get("/api/populationDemography", (req, res) => {
  const results = {};
  const csvFilePath = path.join(
    __dirname,
    "public",
    "population-and-demography.csv"
  );

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => {
      const countryName = data["Country name"];
      if (!results[countryName]) {
        results[countryName] = {
          id: Object.keys(results).length + 1,
          country_name: countryName,
          populations: [],
          years: [],
        };
      }
      results[countryName].populations.push(parseInt(data["Population"]));
      results[countryName].years.push(parseInt(data["Year"]));
    })
    .on("end", () => {
      res.json(Object.values(results));
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
