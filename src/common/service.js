import axios from 'axios';

let base = 'http://127.0.0.1:3000';

export const stockList = params => {
    return axios.get(`${base}/stockList`, {
        params: params
    });
}

export const stockData = params => {
    return axios.get(`${base}/stockData`, {
        params: params
    });
}