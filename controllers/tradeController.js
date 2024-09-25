import { storeTrades, getBalanceAtTimestamp } from '../services/tradeService.js';

const uploadCSV = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    await storeTrades(filePath);
    res.status(200).send('CSV data uploaded successfully.');
  } catch (error) {
    next(error);
  }
};

const calculateBalance = async (req, res, next) => {
  try {
    const { timestamp } = req.body;
    const balance = await getBalanceAtTimestamp(timestamp);
    res.status(200).json(balance);
  } catch (error) {
    next(error);
  }
};

export { uploadCSV, calculateBalance };
