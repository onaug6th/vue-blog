<template>

    <div class="app">
        <!-- 页面顶部导航栏 -->
        <nav class="top-nav container-fluid" :class="{'scroll' : navShow}">
            <div class="top-nav-mid container">
                <div class="top-nav-content">
                    <ul class="menuNav">
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/memory">印象</router-link>
                        </li>
                        <li>
                            <router-link to="/wall">墙</router-link>
                        </li>
                        <li>
                            <router-link to="/about">关于</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <transition name="fade">
            <!-- 路由页面出口 -->
            <router-view/>
        </transition>

        <superFooter></superFooter>
        <!-- 结束啦 :) -->
    </div>

</template>

<script>
import superFooter from './components/superFooter.vue';
//  获取文章类型列表
import { articleTypeList } from "./api/articleType.js";

export default {
    data(){
        return {
            
        }
    },
    computed: {
        navShow(){
            return this.$store.state.navShow;
        },
        navFixed(){
            return this.$store.state.navFixed;
        }
    },
    components:{
        superFooter
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        articleTypeList().then( (result) =>{
            this.$store.commit("updateArticleTypeList", result.data.rows);
        });
    },
    methods:{
        //  监听滚动事件
        handleScroll(){
            if(this.navFixed){
                return false;
            }
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 200){
                return this.$store.commit("toggleNavShow", true);
                
            }
            return this.$store.commit("toggleNavShow", false);
        }
    }
}
</script>


<style>
    .top-nav{
        width:100%;
        position:fixed;
        padding:0px;
        top:0px;
        z-index:3;
        transition: all .3s;
    }
    .scroll{
        background: hsla(0,0%,100%,.86);
        box-shadow: 0 0 25px #ccc;
        color: #999;
    }
    .scroll a{
        color: #555 !important;
        text-shadow: none;
    }
    .top-nav-content .menuNav{
        font-weight: 100;
        float:left;
        margin:0;
        padding:0;
        box-sizing: border-box;
        display: block;
        text-shadow: 1px 1px 8px #444;
    }
    .top-nav-content .menuNav li{
        display: block;
        padding:20px 20px 20px 0px;
        float:left;
    }
    .top-nav-content .menuNav a{
        padding:15px;
        line-height:20px;
        text-decoration: none;
        color: white;
        font-size: 16px;
        transition:all;
    }
    .top-nav-content .menuNav a:hover{
        color:#0083cb;
    }
    
</style>
