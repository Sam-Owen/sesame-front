import axios from 'axios';

let base = 'http://127.0.0.1:3000';

export const getLocalStock = params => { return axios.get(`${base}/getLocalStockData`, { params: params }); }

export const getLocalFutrues = params => { return axios.get(`${base}/getLocalFuturesData`, { params: params }); }

