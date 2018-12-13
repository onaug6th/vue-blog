<template>

    <div class="app">

        <sidebarMenu></sidebarMenu>

        <!-- 页面顶部导航栏 -->
        <nav class="top-nav container-fluid" :class="{'scroll' : navShow}">
            <div class="container">
                <!-- 导航栏中部 -->
                <div class="top-nav-mid">
                    <ul class="menuNav">
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/">时间</router-link>
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
                <!-- 导航栏中部 -->
                <!-- 导航栏右部 -->
                <div class="top-nav-right pull-right">
                    <img alt="avatar" class="avatar img-circle" :src="myAvatar">
                    <section class="info">
                        <div style="row">
                            <div class="col-sm-6">
                                <img :src="myAvatar" alt="avatar" class="avatar img-rounded">
                            </div>
                            <div class="col-sm-6">
                                <p class="name">August Yang</p>
                                <p class="intro">自言自语工程师</p>
                                <p class="other">
                                    <a href="https://github.com/onaug6th" target="_blank">
                                        <img class="emoji" alt="github" height="20" width="20" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">
                                        <span>onaug6th</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- 导航栏右部 -->
            </div>
        </nav>
        <!-- 页面顶部导航栏 -->

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
import sidebarMenu from "./components/sidebarMenu";

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
        superFooter,
        sidebarMenu
    },
    mounted() {

        //  监听导航栏滚动状态
        window.addEventListener('scroll', this.handleScroll);

        //  拉取文章分类列表
        this.$http.post('articleType/list').then( (result) =>{
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
            //  滚动距离大于 200 时，背景显示
            if(scrollTop > 200){
                return this.$store.commit("toggleNavShow", true);
            }
            //  否则背景隐藏
            return this.$store.commit("toggleNavShow", false);
        }

    }
}
</script>


<style lang="scss" scoped>
    // 顶部状态栏
    .top-nav{
        width:100%;
        position:fixed;
        padding:0px;
        top:0px;
        z-index:3;
        transition: all .3s;

        // 状态栏中部
        .top-nav-mid{
            .menuNav{
                font-weight: bold;
                float:left;
                margin:0;
                padding:0;
                box-sizing: border-box;
                display: block;
                text-shadow: 1px 1px 8px #444;

                li{
                    display: block;
                    padding:20px 20px 20px 0px;
                    float:left;
                }

                a{
                    padding:15px;
                    line-height:20px;
                    text-decoration: none;
                    color: white;
                    font-size: 16px;
                    transition:all;

                    &:hover{
                        color:#0083cb;
                    }
                }

            }
        }

        // 状态栏右部
        .top-nav-right{
            >img.avatar{
                width: 50px;
                margin-top: 5px;
                cursor: pointer;
            }
            &:hover .info{
                display: block;
            }
        }
    }

    // 顶部状态栏个人信息
    .info{
        display: none;
        position: absolute;
        width: 290px;
        right: 50px;
        top: 5px;
        background: white;
        border-radius: 10px;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #555;
        z-index: 2;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06), 1px 3px 8px rgba(39, 44, 49, 0.03);

        img.avatar{
            width:100px;
        }
        p{
            white-space: nowrap;

            &.name{
                font-weight: 300;
                font-size: 18px;
                
            }
            &.intro{
                margin-top: 10px;
            }
            &.other{
                margin-top: 10px;

                a{
                    color: black;
                    text-decoration: unset;

                    span{
                        position: relative;
                        bottom: -5px;
                    }
                }
            }
        }
    }

    .scroll{
        background: hsla(0,0%,100%,.86);
        box-shadow: 0 0 25px #ccc;
        color: #999;

        a{
            color: #555 !important;
            text-shadow: none;
        }
    }
    
</style>
