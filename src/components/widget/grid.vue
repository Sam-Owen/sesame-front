<template>
  <!--列表-->
  <el-table :data="stock" highlight-current-row style="width: 100%;">

    <el-table-column type="index" width="60">
    </el-table-column>
  
    <el-table-column prop="code" label="编码" width="100">
    </el-table-column>
    <el-table-column prop="name" label="名称" width="100" >
    </el-table-column>
    <el-table-column prop="nearly" label="最近买点" width="120" >
    </el-table-column>
    <el-table-column prop="max" label="最大涨幅" min-width="180" >
    </el-table-column>
    <el-table-column prop="min" label="最大跌幅" min-width="180" >
    </el-table-column>
   
  </el-table>

</template>


<script>
export default {
  name: 'list',
  props: {
    stock: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style scoped>

</style>
