export const routes = [
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/main.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/mainView/home.vue')
            },
            {
                path: 'classify',
                name: 'Classify',
                component: () => import('../views/mainView/classify.vue')
            },
            {
                path: 'mine',
                name: 'Mine',
                component: () => import('../views/mainView/mine.vue')
            },
            {
                path: 'shoppingcart',
                name: 'shoppingCart',
                component: () => import('../views/mainView/shoppingcart.vue')
            },
        ]
    },
    {
        path: '/searchPage',
        name: 'SearchPage',
        component: () => import('../views/searchPage.vue') 
    },
    {
        path: '/searchResult',
        name: 'SearchResult',
        component: () => import('../views/searchResult.vue') 
    },
    
    {
        path: '/goodsDetails',
        name: 'GoodsDetails',
        component: () => import('../views/goodsDetails.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/countSetting',
        name: 'CountSetting',
        component: () => import('../views/countSetting.vue')
    },
    {
        path: '/countLink',
        name: 'CountLink',
        component: () => import('../views/countLink.vue')
    },
    {
        path: '/address',
        name: 'Address',
        component: () => import('../views/address.vue')
    },
    {
        path: '/editAddress',
        name: 'EditAddress',
        component: () => import('../views/editAddress.vue')
    },
    {
        path: '/settlement',
        name: 'Settlement',
        component: () => import('../views/settlement.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/order.vue')
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import('../views/collect.vue')
    },
    {
        path: '/basicMes',
        name: 'BasicMes',
        component: () => import('../views/basicMes.vue')
    },
    
    {
        path: '*',
        redirect: { name: 'BasicMes' }
    }
]

