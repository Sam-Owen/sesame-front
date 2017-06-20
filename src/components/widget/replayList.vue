<template>
  <div id="replayList">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>买点</th>
        <th>卖点</th>
        <th>卖出方式</th>
        <th>单次收益率</th>
        <th>累计收益率</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(b,i) in buys" :class="b.profit > 0 ? 'danger' : 'success'">
        <td>{{ i+1 }}</td>
        <td>{{ b.buyDate }}</td>
        <td>{{ b.sellDate }}</td>
        <td>{{ b.sellType }}</td>
        <td>{{ b.profit }}</td>
        <td>{{ b.totalProfit }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  import service from '@/components/js/common/service'
  import ma250 from '@/components/js/analysis/ma250'
  import replay from '@/components/js/strategy/replay'

  export default {
    name: 'replayList',
    data () {
      return {
        buys: []
      }
    },
    created(){
      let me = this;
      service.getLocalStock(this.$route.query.symbol).done(function (data) {
        //特别注意，不能通过修改[]值来触发双向绑定，只能通过修改引用，即buys的指向
        me.buys = replay.call(ma250.strategy, data);

        //bestStrategy.call(ma250.strategy, data);
      });
    }
  };


  function bestStrategy(data) {
    let temp = [];
    let strategy = this;
    for (let i = -10; i >= -11; i--) {//sl
      for (let j = 1; j <= 100; j++) {//tp
        for (let k = 1; k <= 100; k++) {//stopDate
          strategy.sl = i;
          strategy.tp = j;
          strategy.stopDate = k;
          let result = replay.call(strategy, data).slice(-1)[0];
          let r = {
            sl: i,
            tp: j,
            stopDate: k,
            totalProfit: result ? result.totalProfit : 0
          };
          console.log(r);
          temp.push(r);
        }
      }
    }
    temp.sort(function (a, b) {
      return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
  }


  function bestStrategy1(data) {
    let temp = [];
    let strategy = this;
    for (let i = -10; i >= -20; i--) {//sl
      strategy.sl = i;
      let result = replay.call(strategy, data).slice(-1)[0];
      let r = {
        sl: i,
        totalProfit: result ? result.totalProfit : 0
      };
      temp.push(r);
    }
    temp.sort(function (a, b) {
      return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
    temp = [];


    for (let j = 1; j <= 100; j++) {//tp
      strategy.tp = j;
      let result = replay.call(strategy, data).slice(-1)[0];
      let r = {
        tp: j,
        totalProfit: result ? result.totalProfit : 0
      };
      temp.push(r);
    }
    temp.sort(function (a, b) {
      return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
    temp = [];

    for (let k = 1; k <= 100; k++) {//stopDate
      strategy.stopDate = k;
      let result = replay.call(strategy, data).slice(-1)[0];
      let r = {
        stopDate: k,
        totalProfit: result ? result.totalProfit : 0
      };
      temp.push(r);
    }
    temp.sort(function (a, b) {
      return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
  }
</script>

<style scoped>

</style>
