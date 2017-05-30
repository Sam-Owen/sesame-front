<template>
  <div>
    <button class="btn btn-default" type="button" v-on:click="analysis(false)">分析</button>
    <button class="btn btn-default" type="button" v-on:click="analysis(true)">更新并分析</button>

    <grid id="stockList" :stock="stock"></grid>
  </div>
</template>


<script>
  import data from '@/assets/data/sz-stock.json'
  import grid from '@/components/widget/grid'

  let stock = [];

  function getData(prefix) {
    stock.length = 0;
    let reg = new RegExp("^" + prefix);
    for (let i = 0; i < data.length; i++) {
      if (data[i].code.match(reg)) {
        //vuejs数据双向绑定监控不了新增属性和引用的改变
        data[i].nearly = "";
        data[i].max = "";
        data[i].min = "";
        stock.push(data[i]);
      }
    }
  }

  export default {
    name: 'stockList',
    data () {
      getData(this.$route.query.prefix);
      return {
        stock: stock
      }
    },
    methods: {
      analysis: function (update) {
        for (let i = 0; i < stock.length; i++) {
          fx(stock[i], update).done(function () {
            console.log(stock[i]);
          });
        }
      }
    },
    watch: {
      $route (to, from){
        getData(this.$route.query.prefix)
      }
    },
    components: {
      grid
    }
  }


  function init(data) {
    var head = [], jsonArr = data;

    $.each(jsonArr[0], function (k, v) {
      head.push(k);
    });


    for (var i = 0, l = jsonArr.length; i < l; i++) {
      var e = jsonArr[i];
      e.pre = jsonArr[i - 1] || {};
      e.pre.next = e;

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
        kdj.init(jsonArr[i]);
      }
      if (head.indexOf(constant.MA + 5) === -1) {
        ma.init(jsonArr[i]);
      }
    }
    if (head.indexOf(constant.MACD_BAR) === -1) {
      macd.init(jsonArr);
    }
  }

  function fx(object, update) {
    return $.ajax({url: "http://127.0.0.1:3000/getLocalStockData?symbol=" + object.location + object.code + "&type=after&update=" + update}).done(function (r) {
      init(r);
      var maHalfYear = constant.MA + 250;

      var allBuy = [];
      for (var i = 0, l = r.length; i < l; i++) {
        var e = r[i];
        // e.time = new Date(e.time).toLocaleDateString();
        if (e[constant.BASE_ATTR_CLOSE] >= e[maHalfYear]
          && e.pre[constant.BASE_ATTR_CLOSE] < e.pre[maHalfYear] /*突破年线*/
          && e[maHalfYear] <= e.pre[maHalfYear] /*年线还处于下行趋势*/
          && e[constant.MA + 500] <= e.pre[constant.MA + 500] /*2年线还处于下行趋势*/
          && e[maHalfYear] >= e[constant.MA + 5]
          && e[maHalfYear] >= e[constant.MA + 10]
          && e[maHalfYear] >= e[constant.MA + 20]
          && e[maHalfYear] >= e[constant.MA + 60]
          && e[maHalfYear] >= e[constant.MA + 120] /*年线压制其它均线*/) {


          var allAmp = [0];
          for (var j = 1; j <= 250; j++) {
            var nextN = util.getDayByDay(e, j);
            allAmp.push(+util.getAmp(e, nextN));
            object.nearly = e.time;
            //console.log("后续" + j + "天涨幅为：" + util.getAmp(e, nextN) + "%");
          }

          allBuy.push(allAmp);

          //console.log(e.time);//当前对象
          //console.log(nextN.time);//后续N天对象
        }
      }

      var max = [];
      var min = [];

      for (var m = 0; m < allBuy.length; m++) {
        var amp = allBuy[m];

        max.push(amp.sort(function sortNumber(a, b) {
          return a - b
        }).slice(-1)[0]);
        min.push(amp[0]);
        //console.log(amp);
      }

      object.max = max.sort(function sortNumber(a, b) {
        return a - b
      }).slice(-1)[0];
      object.min = min.sort(function sortNumber(a, b) {
        return a - b
      })[0];

      var sum = 0;
      for (var ii = 0; i < max.length; ii++) {
        sum += max[ii];
      }
      //console.log(max);
      //console.log(min);
    });
  }
</script>

<style scoped>
  #stockList {
    margin-top: 10px;
  }

  button {
    margin-right: 20px;
  }
</style>
