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
        component: () => import("./views/Home.vue"),
        meta: {
            title: "onaug6th"
        }
    },
    //  文章页
    {
        path: "/article/:id",
        name: "article",
        component: () => import("./views/Article.vue"),
        meta: {
            title: "文章"
        }
    },
    //  归档
    {
        path: "/archive",
        name: "archive",
        component: () => import("./views/Archive.vue"),
        meta: {
            title: "归档"
        }
    },
    //  印象
    {
        path: "/memory",
        name: "memory",
        component: () => import("./views/Memory.vue"),
        meta: {
            title: "印象"
        }
    },
    //  墙
    {
        path: "/wall",
        name: "wall",
        component: () => import("./views/Wall.vue"),
        meta: {
            title: "墙"
        }
    },
    //  关于
    {
        path: "/about",
        name: "about",
        component: () => import("./views/About.vue"),
        meta: {
            title: "关于"
        }
    },
    {
        path: "*",
        component: () => import("./views/NotFound.vue"),
        meta: {
            title: "未知的世界"
        }
    }
];

const Router = new Vue_router({ routes });

//	监听路由跳转前事件
Router.beforeEach((to, from, next) => {

    //	进度条开始
    NProgress.start();
    document.title = to.meta.title;
    //  如果从 首页，归档 前往 文章页
    if (["home", "archive"].includes(from.name) && to.name == "article") {
        //  记录上一个页面滚动的距离
        store.commit("updateLastPageScrollY", window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
    }

    if (from.name == "article" && to.name !== "archive") {
        store.commit("recordArchiveParams", {});
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

