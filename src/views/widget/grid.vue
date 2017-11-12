<template>
    <!--列表-->
    <el-table :data="stock" highlight-current-row style="width: 100%;">

        <el-table-column type="index" width="100">
        </el-table-column>

        <el-table-column prop="code" label="编码" >
            <template scope="scope">
                <router-link :to="`/views/widget/kLine?code=${scope.row.code}`">{{ scope.row.code }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
            <template scope="scope">
                <router-link :to="`/views/widget/analysisList?symbol=${scope.row.code}`">{{ scope.row.name }}</router-link>
            </template>
        </el-table-column>

        <el-table-column prop="name" label="详情">
            <template scope="scope">
                <router-link :to="`/views/widget/replayList?symbol=${scope.row.code}`">Clik me</router-link>
            </template>
        </el-table-column>

        <el-table-column prop="nearly" label="最近买点">
        </el-table-column>
        <el-table-column prop="max" label="最大涨幅">
        </el-table-column>
        <el-table-column prop="min" label="最大跌幅">
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
