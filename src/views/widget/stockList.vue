<template>
    <div>
        <button class="btn btn-default" type="button" data-loading-text="Loading..." v-on:click="analysis($event, false)">分析
        </button>
        <button class="btn btn-default" type="button" data-loading-text="Loading..." v-on:click="analysis($event, true)">更新并分析
        </button>

        <grid id="stockList" :stock="stock"></grid>
    </div>
</template>


<script>

import ma250 from '@/components/js/analysis/ma250'
import grid from '@/views/widget/grid'

export default {
    name: 'stockList',
    // data() {
    //     return {
    //         stock: this.$store.state.stockList
    //     }
    // },
    created() {
        this.$store.dispatch('getStockList', this.$route.query.exchange);
    },
    computed: {
        stock () {
            return this.$store.state.stockList
        }
    },
    methods: {
        analysis: function(event, update) {
            let count = 0, stock = this.stock;
            for (let i = 0; i < stock.length; i++) {
                this.$store.dispatch('getStockData', stock[i].code, update).then(() => {
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
            this.$store.dispatch('getStockList', this.$route.query.exchange);
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
    margin-right: 20px;
}
</style>
