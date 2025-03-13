const Papa = require('papaparse');
const fs = require('fs');

// Sample data
const data = [
  { name: "John", age: 25, city: "New York" },
  { name: "Anna", age: 30, city: "London" },
  { name: "Mike", age: 32, city: "San Francisco" }
];

// Convert JSON to CSV
const csv = Papa.unparse(data);

// Write CSV to a file
fs.writeFileSync('./output.csv', csv);
console.log('CSV file saved successfully!');
