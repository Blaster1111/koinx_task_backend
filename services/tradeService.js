import Trade from '../models/trade.model.js';
import parseCSV from '../utils/csvParser.js';

const storeTrades = async (filePath) => {
    const trades = await parseCSV(filePath);
    await Trade.insertMany(trades);
};
const getBalanceAtTimestamp = async (timestamp) => {
    const date = new Date(timestamp);
    const trades = await Trade.find({ utcTime: { $lte: date } });
    let btcBalance = 0;
    let maticBalance = 0;

    console.log('Trades before timestamp:', trades);
    trades.forEach((trade) => {
        const asset = trade.baseCoin; 
        if (trade.operation === 'Buy') {
            if (asset === 'BTC') {
                btcBalance += trade.amount; 
                console.log(btcBalance);
            } else if (asset === 'MATIC') {
                maticBalance += trade.amount;
                console.log(maticBalance); 
            }
        } else if (trade.operation === 'Sell') {
            if (asset === 'BTC') {
                    btcBalance -= trade.amount;
                    console.log(btcBalance);
            } else if (asset === 'MATIC') {
                    maticBalance -= trade.amount;
                    console.log(maticBalance);
               
            }
        } 
    });
    return {
        BTC: btcBalance,
        MATIC: maticBalance,
    };
};

export { storeTrades, getBalanceAtTimestamp };