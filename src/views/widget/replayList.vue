<template>
    <!--列表-->
    <el-table :data="buys" highlight-current-row style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="buyDate" label="买点">
        </el-table-column>
        <el-table-column prop="sellDate" label="卖点">
        </el-table-column>
        <el-table-column prop="sellType" label="卖出方式">
        </el-table-column>
        <el-table-column prop="profit" label="单次收益率">
        </el-table-column>
        <el-table-column prop="totalProfit" label="累计收益率">
        </el-table-column>
    </el-table>
</template>


<script>
//  <tr v-for="(b,i) in buys" :class="b.profit > 0 ? 'danger' : 'success'">
import service from '@/components/js/common/service'
import ma250 from '@/components/js/analysis/ma250'
import replay from '@/components/js/strategy/replay'
export default {
    name: 'replayList',
    data() {
        return {
            buys: []
        }
    },
    created() {
        let me = this;

        this.$store.dispatch('getStockData', this.$route.query.symbol).then(() => {
            me.buys = replay.call(ma250.strategy, this.$store.state.stockData);
            //bestStrategy.call(ma250.strategy, data);
        });
    }
};


function bestStrategy(data) {
    let temp = [];
    let strategy = this;
    for (let i = -10; i >= -11; i--) {//sl
        for (let j = 1; j <= 100; j++) {//tp
            for (let k = 1; k <= 100; k++) {//stopDate
                strategy.sl = i;
                strategy.tp = j;
                strategy.stopDate = k;
                let result = replay.call(strategy, data).slice(-1)[0];
                let r = {
                    sl: i,
                    tp: j,
                    stopDate: k,
                    totalProfit: result ? result.totalProfit : 0
                };
                console.log(r);
                temp.push(r);
            }
        }
    }
    temp.sort(function(a, b) {
        return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
}

//寻找最佳买卖点的测试
function bestStrategy1(data) {
    let temp = [];
    let strategy = this;
    for (let i = -10; i >= -20; i--) {//sl
        strategy.sl = i;
        let result = replay.call(strategy, data).slice(-1)[0];
        let r = {
            sl: i,
            totalProfit: result ? result.totalProfit : 0
        };
        temp.push(r);
    }
    temp.sort(function(a, b) {
        return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
    temp = [];


    for (let j = 1; j <= 100; j++) {//tp
        strategy.tp = j;
        let result = replay.call(strategy, data).slice(-1)[0];
        let r = {
            tp: j,
            totalProfit: result ? result.totalProfit : 0
        };
        temp.push(r);
    }
    temp.sort(function(a, b) {
        return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
    temp = [];

    for (let k = 1; k <= 100; k++) {//stopDate
        strategy.stopDate = k;
        let result = replay.call(strategy, data).slice(-1)[0];
        let r = {
            stopDate: k,
            totalProfit: result ? result.totalProfit : 0
        };
        temp.push(r);
    }
    temp.sort(function(a, b) {
        return b.totalProfit - a.totalProfit;
    });
    console.log(temp[0]);
}
</script>

<style scoped>

</style>
