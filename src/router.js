import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

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
    //  印象
    {
        path: "/memory",
        name: "memory",
        component: () => import("./views/Memory.vue"),
        meta : {
            showNav : true
        }
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
        component: () => import("./views/About.vue"),
        meta : {
            showNav : true
        }
    },
    {
        path: "*",
        component: () => import("./views/NotFound.vue"),
        meta : {
            showNav : true
        }
    }
];

export default new Router({
    routes
})
