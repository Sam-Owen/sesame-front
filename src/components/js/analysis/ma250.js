/**
 * 最初只是有一个想法，或者叫原始策略
 * 通过分析验证这个想法
 * 验证通过后形成可执行的策略
 *
 * 均线突破策略分析
 */

import constant from '@/components/js/common/constant'
import util from '@/components/js/common/util'

function execute(data, ma) {
  let buys = [], r = [], maCycle = constant.MA + ma;

  for (let i = 0, l = data.length; i < l; i++) {
    let e = data[i];
    // e.time = new Date(e.time).toLocaleDateString();
    if (e[constant.BASE_ATTR_CLOSE] >= e[maCycle]
      && e.pre[constant.BASE_ATTR_CLOSE] < e.pre[maCycle] /*突破年线*/
      && e[maCycle] <= e.pre[maCycle] /*年线还处于下行趋势*/
      //&& e[constant.MA + 500] <= e.pre[constant.MA + 500] /*2年线还处于下行趋势*/
      && e[maCycle] >= e[constant.MA + 5]
      && e[maCycle] >= e[constant.MA + 10]
      && e[maCycle] >= e[constant.MA + 20]
      && e[maCycle] >= e[constant.MA + 60]
      && e[maCycle] >= e[constant.MA + 120] /*年线压制其它均线*/) {/*再加个一阳穿三线？*/

      let mas = [e[constant.MA + 5], e[constant.MA + 10], e[constant.MA + 20], e[constant.MA + 60], e[constant.MA + 120]];
      let buy = {
        //买点
        buy: e.time,
        //最大盈利率
        maxProfit: "",
        //等待亏损率，盈利之前的亏损率
        wait: "",
        //最大亏损率，盈利之前的亏损率
        maxLosses: "",
        //最大回撤率，盈利以后的回撤率
        maxRetracement: "",
        //均线密度
        maDensity: util.array.standardDeviation(mas),
        //达到最大盈利率所需要的天数
        maxProfitDays : ""
      };

      //每天的涨跌幅度计数
      let amps = [0];

      for (let j = 1; j <= ma; j++) {
        let nextN = util.getDayByDay(e, j);
        amps.push(+util.getAmp(e, nextN));
      }

      let temp = amps.concat([]);
      buy.maxProfit = temp.sort(function (a, b) {
        return b - a;//倒序
      })[0];

      buy.maxLosses = temp.slice(-1)[0];

      buy.maxProfitDays = amps.indexOf(buy.maxProfit);

      let waitPeriod = amps.slice(0, buy.maxProfitDays);
      buy.wait = waitPeriod.sort(function (a, b) {
        return a - b;//顺序
      })[0];

      buys.push(buy);
    }
  }
  return filter(buys);
}

function filter(buys) {
  let density = [], result = [];
  //计算附合条件的均线密平均数
  for (let i = 0, l = buys.length; i < l; i++) {
    let buy = buys[i];
    if (buy.maxProfit > 100) {
      density.push(buy.maDensity);
    }
  }
  let avg = util.array.geometricMean(density);
  //通过平均数过滤
  for (let i = 0, l = buys.length; i < l; i++) {
    let buy = buys[i];
    if (buy.maDensity < avg) {
      result.push(buy);
    }
  }
  return result;
}

export default {
  execute
}
