<template>
  <div id="list">
    <table class="table">
      <thead>
      <tr>
        <td class="active">编号</td>
        <td class="active">编码</td>
        <td class="active">名称</td>
        <td class="success">最近买点</td>
        <td class="success">最大涨幅</td>
        <td class="warning">最大跌幅</td>
        <td class="success">平均最大涨幅</td>
        <td class="warning">平均最大跌幅</td>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(s,i) in stock">
        <td class="active">{{ i+1 }}</td>
        <td class="active">{{ s.code }}</td>
        <td class="active">{{ s.name }}</td>
        <td class="active">{{ s.nearly }}</td>
        <td class="warning">{{ s.max }}</td>
        <td class="warning">{{ s.min }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        stock: []
      }
    }
  }
</script>

<style scoped>

</style>
