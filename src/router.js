import Vue from "vue";
import Vue_router from "vue-router";
//	第三方依赖——进度条
import NProgress from 'nprogress';
//  vueX
import store from './store/store';

Vue.use(Vue_router);

const routes = [
    //  博客首页
    {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue")
    },
    //  文章页
    {
        path: "/article/:id",
        name: "article",
        component: () => import("./views/Article.vue")
    },
    //  归档
    {
        path: "/archive",
        name: "archive",
        component: () => import("./views/Archive.vue")
    },
    //  印象
    {
        path: "/memory",
        name: "memory",
        component: () => import("./views/Memory.vue")
    },
    //  墙
    {
        path: "/wall",
        name: "wall",
        component: () => import("./views/Wall.vue")
    },
    //  关于
    {
        path: "/about",
        name: "about",
        component: () => import("./views/About.vue")
    },
    {
        path: "*",
        component: () => import("./views/NotFound.vue")
    }
];

const Router = new Vue_router({ routes });

//	监听路由跳转前事件
Router.beforeEach((to, from, next) => {

    //	进度条开始
    NProgress.start();
    //  如果从 首页，归档 前往 文章页
    if (["home", "archive"].includes(from.name) && to.name == "article") {
        //  记录上一个页面滚动的距离
        store.commit("updateLastPageScrollY", window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
    }

    if (from.name == "article" && to.name !== "archive") {
        store.commit("recordLastPageParams", {});
    }

    next();
});

//	监听路由跳转后事件
Router.afterEach((to, from) => {
    //  如果从 文章 前往 首页，归档
    if (["article"].includes(from.name) && ["home", "archive"].includes(to.name)) {
        //  标记需要滚动回到标记位置
        sessionStorage.setItem("scrollLastPage", to.name);
    } else {
        //	回到顶部
        window.scrollTo(0, 0);
    }

    //	是时候结束了吧
    NProgress.done();

});

export default Router;

