<template>
  <div>
    <input class="btn btn-default" type="button" value="Input">
    <grid id="stockList" :stock="stock"></grid>

  </div>
</template>


<script>
  import data from '@/components/sz-stock.json'
  import grid from '@/components/widget/grid'

  let stock = [];
  export default {
    name: 'stockList',
    data () {
      return {
        stock: stock
      }
    },
    watch: {
      $route (to, from){
        stock.length = 0;
        let r = this.$route;
        let reg = new RegExp("^" + r.query.prefix);

        for (let i = 0; i < data.length; i++) {
          if (data[i].code.match(reg)) {
            stock.push(data[i]);
          }
        }
        console.log(stock.length);
      }
    },
    components: {
      grid
    }
  }
</script>

<style scoped>

</style>
