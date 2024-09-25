import fs from 'fs';
import csv from 'csv-parser';

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const marketSplit = data['Market'].split('/');
        results.push({
          utcTime: new Date(data['UTC_Time']),
          operation: data['Operation'],
          market: data['Market'],
          baseCoin: marketSplit[0],
          quoteCoin: marketSplit[1],
          amount: parseFloat(data['Buy/Sell Amount']),
          price: parseFloat(data['Price']),
        });
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

export default parseCSV;
