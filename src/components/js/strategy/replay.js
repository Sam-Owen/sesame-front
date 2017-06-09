//多策略复盘
/**
 var replay = function(){
	//复盘策略(组合策略)
	this.strategy = [];

	//复盘数据
	this.data;

};
 **/

import constant from '@/components/js/common/constant'
import util from '@/components/js/common/util'

let buy;

//止损
function sl(e) {
  if (util.getAmp(buy, e) <= this.sl) {
    return e;
  }
}

//止盈
function tp(e) {
  if (util.getAmp(buy, e) >= this.tp) {
    return e;
  }
}

//周期截止
function stop(e) {
  if (util.getDays(buy, e) >= this.stopDate) {
    return e;
  }
}

//单策略复盘
export default function replay(data) {
  let r, result = [], totalProfit = 1;

  for (let i = 0, l = data.length; i < l; i++) {
    let e = data[i];
    if (this.buy(e)) {
      r = {
        buyDate: e[constant.BASE_ATTR_DATE],
        holdStock: true //持股状态
      };
      buy = e;
    }

    if (r && r.holdStock) {
      if (sl.call(this, e) || tp.call(this, e) || stop.call(this, e)) {
        r.profit = util.getAmp(buy, e);
        r.sellDate = e[constant.BASE_ATTR_DATE];
        r.holdStock = false;
        totalProfit = totalProfit * (1 + r.profit / 100);
        r.totalProfit = (totalProfit * 100).toFixed(2) + '%';
        result.push(r);
      }
    }
  }
  return result;
}
