<template>
  <div id="list">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>编号</th>
        <th>编码</th>
        <th>名称</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(s,i) in stock">
        <td>{{ i+1 }}</td>
        <td>
          <router-link :to="'/kLine?code='+s.code">{{ s.code }}</router-link>
        </td>
        <td>{{ s.name }}</td>
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
