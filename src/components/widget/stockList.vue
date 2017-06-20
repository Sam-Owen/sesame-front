<template>
  <div>
    <button class="btn btn-default" type="button" data-loading-text="Loading..."
            v-on:click="analysis($event, false)">分析
    </button>
    <button class="btn btn-default" type="button" data-loading-text="Loading..."
            v-on:click="analysis($event, true)">更新并分析
    </button>

    <grid id="stockList" :stock="stock"></grid>
  </div>
</template>


<script>
  import sz from '@/assets/data/sz-stock.json'
  import sh from '@/assets/data/sh-stock.json'

  import service from '@/components/js/common/service'
  import ma250 from '@/components/js/analysis/ma250'

  import grid from '@/components/widget/grid'

  let stock = [];
  let data = sz.concat(sh);
  for (let i = 0; i < data.length; i++) {
    let e = data[i];
    e.code = e.exchange + e.code;
  }

  function getData(prefix) {
    stock.length = 0;
    let reg = new RegExp("^" + prefix);
    for (let i = 0; i < data.length; i++) {
      let e = data[i];
      if (e.code.match(reg)) {
        //vuejs数据双向绑定监控不了新增属性和引用的改变
        //data[i].nearly = "";
        //data[i].max = "";
        //data[i].min = "";
        stock.push(e);
      }
    }
//    stock.length = 1;
  }

  export default {
    name: 'stockList',
    data () {
      return {
        stock
      }
    },
    created(){
      getData(this.$route.query.prefix);
    },
    methods: {
      analysis: function (event, update) {
        $(event.target).button('loading');
        let count = 0;
        for (let i = 0; i < stock.length; i++) {
          service.getLocalStock(stock[i].code, update).done(function (data) {
            let ar = ma250.execute(data, 250);
            if (ar.length > 0) {
              stock[i].max = ar.slice(-1)[0].maxProfit;
              stock[i].min = ar.slice(-1)[0].maxLosses;
              stock[i].nearly = ar.slice(-1)[0].buy;
            }
            //按最近买点倒序
            count++;
            if (count === stock.length) {
              $(event.target).button('reset');
              //array.sort会引发数据重新绑定
              stock.sort(function (o1, o2) {
                let a = o1.nearly || 0, b = o2.nearly || 0;
                return new Date(b).getTime() - new Date(a).getTime();
              });
            }
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

</script>

<style scoped>
  #stockList {
    margin-top: 10px;
  }

  button {
    margin-right: 20px;
  }
</style>
