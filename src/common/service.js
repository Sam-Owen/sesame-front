import axios from 'axios';

let base = 'http://127.0.0.1:3000';

export const stockList = params => {
    return axios.get(`${base}/stockList`, {
        params: params
    });
}

export const getLocalFutrues = params => {
    return axios.get(`${base}/getLocalFuturesData`, {
        params: params
    });
}