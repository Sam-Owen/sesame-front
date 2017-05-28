<template>
  <div id="list">
    <table class="table">
      <thead>
      <tr>
        <td class="active">编号</td>
        <td class="active">编码</td>
        <td class="active">名称</td>

      </tr>
      </thead>

      <tbody>
      <tr v-for="(s,i) in stock">
        <td class="active">{{ i+1 }}</td>
        <td class="active"><router-link :to="'/kLine?code='+s.code">{{ s.code }}</router-link></td>
        <td class="active">{{ s.name }}</td>
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
