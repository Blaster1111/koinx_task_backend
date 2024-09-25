import Trade from '../models/trade.model.js';
import parseCSV from '../utils/csvParser.js';

const storeTrades = async (filePath) => {
    const trades = await parseCSV(filePath);
    await Trade.insertMany(trades);
};

const getBalanceAtTimestamp = async (timestamp) => {
    const date = new Date(timestamp);
    const trades = await Trade.find({ utcTime: { $lte: date } });

    const initialBalances = {
        BTC: 0,
        MATIC: 0,
    };
    const balances = trades.reduce((acc, trade) => {
        const asset = trade.baseCoin;

        if (trade.operation === 'Buy') {
            acc[asset] += trade.amount;
        } else if (trade.operation === 'Sell') {
            acc[asset] -= trade.amount; 
        }
        return acc;
    }, initialBalances);
    return balances; 
};
export { storeTrades, getBalanceAtTimestamp };
