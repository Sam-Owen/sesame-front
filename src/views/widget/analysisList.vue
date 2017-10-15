<template>
    <!--列表-->
    <el-table :data="buys" highlight-current-row style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="buy" label="买点">
        </el-table-column>
        <el-table-column prop="maxProfit" label="最高盈利率">
        </el-table-column>
        <el-table-column prop="maxProfitDays" label="止盈天数">
        </el-table-column>
        <el-table-column prop="wait" label="等待亏损率">
        </el-table-column>
        <el-table-column prop="maxLosses" label="最大亏损率">
        </el-table-column>
        <el-table-column prop="maDensity" label="均线密度">
        </el-table-column>
        <el-table-column prop="timeToProfit" label="时间盈利比">
        </el-table-column>
        <el-table-column prop="maxRetracement" label="最大回撤率">
        </el-table-column>
    </el-table>
</template>


<script>
import ma250 from '@/components/js/analysis/ma250'

let vm = {
    name: 'analysisList',
    data() {
        return {
            buys: []
        }
    },
    created() {
        let me = this;
        // service.getLocalStock(this.$route.query.symbol).done(function(data) {
        //     //特别注意，不能通过修改[]值来触发双向绑定，只能通过修改引用，即buys的指向
        //     me.buys = ma250.execute(data, 250);
        // });

        this.$store.dispatch('getStockData', this.$route.query.symbol).then(() => {
            me.buys = ma250.execute(this.$store.state.stockData, 250);
        });
    }
};

export default vm
</script>

<style scoped>

</style>
