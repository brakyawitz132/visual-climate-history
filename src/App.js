import React, { useEffect, useState } from 'react';
import csv from 'csv-parser'
import './App.css';

function App() {

  useEffect(() => {
    fetch('https://data.giss.nasa.gov/gistemp/tabledata_v4/T_AIRS/GLB.Ts+dSST.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse the CSV data
        const results = [];

        // Create a readable stream from the CSV data string
        const stream = Readable.from(csvData);

        // Use csv-parser to parse the data
        stream
          .pipe(csv())
          .on('data', (row) => {
            results.push(row);
          })
          .on('end', () => {
            // Process and manipulate the parsed CSV data (results array) here
            console.log('Parsed CSV data:', results);

            // You can now work with the parsed data in your component
          });
      })
      .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  return (
    <div>
      <h1>Visual Climate History</h1>
    </div>
  );
}

export default App;
