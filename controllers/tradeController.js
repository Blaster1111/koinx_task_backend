import { storeTrades, getBalanceAtTimestamp } from '../services/tradeService.js';
import sendResponse from '../utils/responseHandler.js';

const uploadCSV = async (req, res, next) => {
    try {
        const filePath = req.file.path;
        await storeTrades(filePath);
        sendResponse(res, 200, true, null, 'CSV data uploaded successfully.');
    } catch (error) {
      console.error('Error uploading CSV:', error.message); 
      return sendResponse(res, 500, false, null, 'An error occurred while processing your request.'); 
    }
};

const calculateBalance = async (req, res, next) => {
    try {
        const { timestamp } = req.body;
        if (!timestamp) {
            return sendResponse(res, 400, false, null, 'Timestamp is required.');
        }

        const balance = await getBalanceAtTimestamp(timestamp);
        sendResponse(res, 200, true, balance, 'Balance retrieved successfully.');
    } catch (error) {
      console.error('Error calculating balance:', error.message); 
      return sendResponse(res, 500, false, null, 'An error occurred while calculating your balance.'); 
      
    }
};

export { uploadCSV, calculateBalance };
