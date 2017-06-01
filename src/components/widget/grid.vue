<template>
  <div id="list">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>编号</th>
        <th>编码</th>
        <th>名称</th>
        <th class="">最近买点</th>
        <th class="">详情</th>
        <th class="">最大涨幅</th>
        <th class="">最大跌幅</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(s,i) in stock">
        <td>{{ i+1 }}</td>
        <td>
          <router-link :to="'/widget/kLine?code='+s.code">{{ s.code }}</router-link>
        </td>
        <td>{{ s.name }}</td>
        <td class="">{{ s.nearly }}</td>
        <td class="">
          <router-link :to="'/widget/analysisList?symbol='+s.code">Click Me</router-link>
        </td>
        <td class="">{{ s.max }}</td>
        <td class="">{{ s.min }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>


<script>
  export default {
    name: 'list',
    props: {
      stock: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>
<style scoped>

</style>
