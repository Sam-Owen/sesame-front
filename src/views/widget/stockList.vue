<template>
    <div>
        <el-button type="primary" @click="analysis(false)">仅分析</el-button>
        <el-button type="primary" @click="analysis(true)">更新并分析</el-button>
        <grid id="stockList " :stock="stock"></grid>
    </div>
</template>
<script>

import ma250 from '@/components/js/analysis/ma250'
import grid from '@/views/widget/grid'

export default {
    name: 'stockList',
    created() {
        this.$store.dispatch('getStockList', this.$route.query.board);
    },
    computed: {
        stock() {
            console.log(this.$store.state.stockList)
            return this.$store.state.stockList
        }
    },
    methods: {
        analysis: function(update) {
            let count = 0, stock = this.stock;
            for (let i = 0; i < stock.length; i++) {
                this.$store.dispatch('getStockData', {
                    symbol: stock[i].code,
                    update: update
                }).then(() => {
                    let ar = ma250.execute(this.$store.state.stockData, 250);
                    if (ar.length > 0) {
                        stock[i].max = ar.slice(-1)[0].maxProfit;
                        stock[i].min = ar.slice(-1)[0].maxLosses;
                        stock[i].nearly = ar.slice(-1)[0].buy;
                    }
                    //确定所有服务执行完成再进行排序 
                    count++;
                    if (count === stock.length) {
                        //按最近买点倒序,array.sort会引发数据重新绑定
                        stock.sort(function(o1, o2) {
                            let a = o1.nearly || 0, b = o2.nearly || 0;
                            return new Date(b).getTime() - new Date(a).getTime();
                        });
                    }
                });
            }
        }
    },
    watch: {
        $route(to, from) {
            this.$store.dispatch('getStockList', this.$route.query.board);
        },
    },
    components: {
        grid
    }
}

</script>

<style scoped>
#stockList {
    margin-top: 10px;
}

button {
    margin: 20px;
}
</style>
