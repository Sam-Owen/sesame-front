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
            { path: '/views/widget/stockList?board=my', name: '深圳交易所' }
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
                path: "/views/widget/stockList?board=上海主板"
            },
            {
                name: "深圳主板（000XXX）",
                path: "/views/widget/stockList?board=深圳主板"
            },
            {
                name: "中小板（002XXX）",
                path: "/views/widget/stockList?board=中小板"
            },
            {
                name: "创业板（300XXX）",
                path: "/views/widget/stockList?board=创业板"
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
                path: "/views/widget/stockList?board=中金所"
            },
            {
                name: "大商所",
                path: "/views/widget/stockList?board=大连商品交易所"
            },
            {
                name: "郑商所",
                path: "/views/widget/stockList?board=郑州商品交易所"
            },
            {
                name: "上期所",
                path: "/views/widget/stockList?board=上海期货交易所"
            }
        ]
    },
    {
        name: "系统设置",
        path: "/",
        component: Home,
        iconCls: 'fa fa-bar-chart',
        hidden: false,
        "children": [
        ]
    },
    {
        name: "功能菜单",
        path: "/",
        component: Home,
        iconCls: 'fa fa-bar-chart',
        hidden: true,
        "children": [
            {
                name: "列表",
                path: "/views/widget/stockList",
                hidden: true
            },
            {
                name: "K线",
                path: "/views/widget/kLine",
                hidden: true
            },
            {
                name: "详情",
                path: "/views/widget/analysisList",
                hidden: true
            },
            {
                name: "复盘",
                path: "/views/widget/replayList",
                hidden: true
            }
        ]
    }
];