import axios from 'axios'

import constant from '@/components/js/common/constant'
import kdj from '@/components/js/index/kdj'
import ma from '@/components/js/index/ma'
import macd from '@/components/js/index/macd'

import {
    stockList,
    stockData
} from '@/common/service'

import sz from '@/assets/data/sz-stock.json'
import sh from '@/assets/data/sh-stock.json'
import lf from '@/assets/data/local-futures.json'

export const getStockList = ({
    commit
}, board) => {
    return stockList({
        board: board
    }).then(function (result) {
        commit('GET_STOCK_LIST', result.data);
    });
}

export const getStockData = ({
    commit
}, symbol) => {
    return stockData({
        symbol: symbol
    }).then(function (result) {
        let data = result.data
        //设置pre、next
        for (let i = 0; i < data.length; i++) {
            let e = data[i];
            e.pre = data[i - 1] || {};
            e.pre.next = e;
        }
        commit('GET_STOCK_DATA', data);
    });
}
/**
export const getStockData = ({
    commit
}, para) => {
    if (typeof para === 'string') {
        para = {
            symbol: para
        }
    }
    if (para.symbol.match(/^sz|^sh/ig)) {
        return getLocalStock(para).then(function (result) {
            init(result.data);
            commit('GET_STOCK_DATA', result.data);
        });
    } else {
        return getLocalFutrues(para).then(function (result) {
            // console.log(parseSinaFuturesData(result.data));
            console.assert(result.data, `${para.symbol} have no data`)
            let data = init(parseSinaFuturesData(result.data));
            commit('GET_STOCK_DATA', data);
        });
    }
}

let data = sz.concat(sh).concat(lf);
export const getStockList = ({
    commit
}, exchange) => {
    for (let i = 0; i < data.length; i++) {
        let e = data[i],
            symbol = `${e.exchange}${e.code}`;
        if (symbol.match(/^sh6/ig)) {
            e.code = symbol;
            e.exchange = '上海主板'
        } else if (symbol.match(/^sz000/ig) || e.code.match(/^sz001/ig)) {
            e.code = symbol;
            e.exchange = '深圳主板'
        } else if (symbol.match(/^sz002/ig)) {
            e.code = symbol;
            e.exchange = '中小板'
        } else if (symbol.match(/^sz300/ig)) {
            e.code = symbol;
            e.exchange = '创业板'
        }
    }
    let stockList = data.filter(entity => entity.exchange === exchange);
    // stockList.length = 11
    console.log(stockList);
    commit('GET_STOCK_LIST', stockList)
}

function parseSinaFuturesData(data) {
    return (data || []).map(i => {
        let e = {};
        //日期、开盘、最高、最低、收盘、成交量
        e[constant.BASE_ATTR_DATE] = i[0];
        e[constant.BASE_ATTR_OPEN] = +i[1];
        e[constant.BASE_ATTR_HIGH] = +i[2];
        e[constant.BASE_ATTR_LOW] = +i[3];
        e[constant.BASE_ATTR_CLOSE] = +i[4];
        e[constant.BASE_ATTR_VOL] = i[5];
        return e;
    })
}
 */

/**
 * 初始化数据，设置指标
 * @param data
 */
function init(data) {
    let head = [];

    for (var i in data[0]) {
        if (data[0].hasOwnProperty(i)) { //filter,只输出man的私有属性
            head.push(i);
        };
    }

    // $.each(data[0], function i, v) {
    //     head.push(k);
    // });

    //设置pre、next
    for (let i = 0; i < data.length; i++) {
        let e = data[i];
        e.pre = data[i - 1] || {};
        e.pre.next = e;
    }

    for (let i = 0, l = data.length; i < l; i++) {
        let e = data[i];

        // 转为数值
        e[constant.BASE_ATTR_OPEN] = +e[constant.BASE_ATTR_OPEN];
        e[constant.BASE_ATTR_CLOSE] = +e[constant.BASE_ATTR_CLOSE];
        e[constant.BASE_ATTR_HIGH] = +e[constant.BASE_ATTR_HIGH];
        e[constant.BASE_ATTR_LOW] = +e[constant.BASE_ATTR_LOW];

        // 错误数据处理，缺失数据用前一天的收盘数据代替，表示无波动
        if (!e[constant.BASE_ATTR_OPEN]) {
            e[constant.BASE_ATTR_OPEN] = e.pre[constant.BASE_ATTR_CLOSE];
        }
        if (!e[constant.BASE_ATTR_HIGH]) {
            e[constant.BASE_ATTR_HIGH] = e.pre[constant.BASE_ATTR_CLOSE];
        }
        if (!e[constant.BASE_ATTR_LOW]) {
            e[constant.BASE_ATTR_LOW] = e.pre[constant.BASE_ATTR_CLOSE];
        }
        if (!e[constant.BASE_ATTR_CLOSE]) {
            e[constant.BASE_ATTR_CLOSE] = e.pre[constant.BASE_ATTR_CLOSE];
        }

        if (head.indexOf(constant.KDJ_D) === -1) {
            kdj.init(data[i]);
        }
        if (head.indexOf(constant.MA + 5) === -1) {
            ma.init(data[i]);
        }
    }
    if (head.indexOf(constant.MACD_BAR) === -1) {
        macd.init(data);
    }
    global.testData = data;
    return data;
}