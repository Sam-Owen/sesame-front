<template>
  <div>
    <input class="btn btn-default" type="button" value="Input">

    <grid id="t" :stock="stock">

    </grid>

  </div>

</template>


<script>

  import data from '@/components/sz-stock.json'
  import grid from '@/components/widget/grid'

  let stock = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].code.match(/^1/)) {
      stock.push(data[i]);
    }
  }

  export default {
    name: 'list',
    data () {
      return {
        stock: stock
      }
    },
    components:{
        grid
    }
  }
</script>

<style scoped>

</style>
