<template>
  <div id="replayList">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>买点</th>
        <th>卖点</th>
        <th>单次收益率</th>
        <th>累计收益率</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(b,i) in buys">
        <td>{{ i }}</td>
        <td>{{ b.buyDate }}</td>
        <td>{{ b.sellDate }}</td>
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
      });
    }
  };

</script>

<style scoped>

</style>
