import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/home/Home'
import Service from '../pages/home/Service'
import Product from '../pages/home/product/Product'
import ProductList from '../pages/home/product/ProductList';
import ProductEdit from '../pages/home/product/ProductEdit';
import App from '../App'
import { getGlobalData } from '../utils/globalData'
Vue.use(VueRouter)
const routes = [{
    path: '/', //父路由路径
    component: App, // 父路由组件，传入vue component
    name: 'App',
    children: [
        // 登录页
        {
            path: 'login',
            component: Login,
            name: 'Login' // 路由的名称
        },
        // 应用首页
        {
            path: "home",
            component: Home,
            name: "Home",
            children: [
                // 服务列表
                {
                    path: 'service',
                    component: Service,
                    name: 'Service'
                },
                // 产品容器
                {
                    path: 'product',
                    component: Product,
                    name: "Product",
                    children: [
                        // 产品列表页
                        { path: "list", component: ProductList, name: 'ProductList' },
                        //  技巧：新增产品默认id=0
                        { path: 'add/0', component: ProductEdit, name: 'ProductAdd' },
                        // 产品修改
                        // :id可以是任何值，且组件通过this.$route.params.id获取
                        { path: 'edit/:id', component: ProductEdit, name: 'ProductEdit' }
                    ]
                }
            ]
        }
    ]
}]
const router = new VueRouter({
    mode: 'hash', // 使用hash模式
    base: process.env.BASE_URL,
    routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
    // 非登录页
    if (to.name !== 'Login') {
        // 如果用户没有登入
        if (!getGlobalData('username')) {
            // 如果用户没有登入,跳转到登录页
            next({ name: "Login" })
        }
    }
    // 其他页直接过去
    next()
})
export default router