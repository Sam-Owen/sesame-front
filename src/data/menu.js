import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'

export default [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        "name": "自选股",
        component: Home,
        path: '/',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/widget/stockList', name: '深圳交易所' }
        ]
    },
    {
        name: "国内A股",
        component: Home,
        iconCls: 'fa fa-bar-chart',
        path: "/",
        "children": [
            {
                name: "上海主板（6XXXXX）",
                path: "/widget/stockList?exchange=上海主板"
            },
            {
                name: "深圳主板（000XXX）",
                path: "/widget/stockList?exchange=深圳主板"
            },
            {
                name: "中小板（002XXX）",
                path: "/widget/stockList?exchange=中小板"
            },
            {
                name: "创业板（300XXX）",
                path: "/widget/stockList?exchange=创业板"
            }
        ]
    },
    {
        name: "国内期货",
        path: "/",
        component: Home,
        iconCls: 'fa fa-bar-chart',
        "children": [ 
            {
                name: "中金所",
                path: "/widget/stockList?exchange=中金所"
            },
            {
                name: "大商所",
                path: "/widget/stockList?exchange=大连商品交易所"
            },
            {
                name: "郑商所",
                path: "/widget/stockList?exchange=郑州商品交易所"
            },
            {
                name: "上期所",
                path: "/widget/stockList?exchange=上海期货交易所"
            }
        ]
    },
    {
        name: "功能菜单",
        path: "/",
        component: Home,
        iconCls: 'fa fa-bar-chart',
        "children": [
            {
                name: "列表",
                path: "/widget/stockList"
            },
            {
                name: "K线",
                path: "/widget/kLine"
            },
            {
                name: "详情",
                path: "/widget/analysisList"
            },
            {
                name: "复盘",
                path: "/widget/replayList"
            }
        ]
    }
];