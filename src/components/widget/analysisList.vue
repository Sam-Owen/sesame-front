<template>
  <div id="analysisList">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>买点</th>
        <th>最高盈利率</th>
        <th class="">止盈天数</th>
        <th class="">等待亏损率</th>
        <th class="">最大亏损率</th>
        <th class="">最大回撤率</th>
        <th class="">均线密度</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(b,i) in buys">
        <td>{{ i+1 }}</td>
        <td>{{ b.buy }}</td>
        <td>{{ b.maxProfit }}</td>
        <td class="">{{ b.maxProfitDays }}</td>
        <td class="">{{ b.wait }}</td>
        <td class="">{{ b.maxLosses }}</td>
        <td class="">{{ b.maxRetracement }}</td>
        <td class="">{{ b.maDensity }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  import ma250 from '@/components/js/analysis/ma250'
  import service from '@/components/js/common/service'

  let vm = {
    name: 'analysisList',
    data () {
      return {
        buys:[]
      }
    },
    created(){
      let me = this;
      service.getLocalStock(this.$route.query.symbol).done(function (data) {
        //特别注意，不能通过修改[]值来触发双向绑定，只能通过修改引用，即buys的指向
        me.buys = ma250.execute(data, 250);
      });
    }
  };

  export default vm
</script>

<style scoped>

</style>
