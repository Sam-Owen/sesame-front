<template>
  <div>
    <button class="btn btn-default" type="button">分析</button>
    <button class="btn btn-default" type="button">更新并分析</button>

    <grid id="stockList" :stock="stock"></grid>
  </div>
</template>


<script>
  import data from '@/components/sz-stock.json'
  import grid from '@/components/widget/grid'

  let stock = [];

  function getData(prefix) {
    stock.length = 0;
    let reg = new RegExp("^" + prefix);
    for (let i = 0; i < data.length; i++) {
      if (data[i].code.match(reg)) {
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
  button{
    margin-right:20px;
  }
</style>
