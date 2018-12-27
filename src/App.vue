<template>

    <div class="app">

        <sidebarMenu ref="sidebarMenu"></sidebarMenu>

        <!-- 页面顶部导航栏 -->
        <nav class="top-nav container-fluid" :class="{'scroll' : navShow}">
            <div class="container">
                <!-- 导航栏右部 -->
                <div class="top-nav-right pull-right">
                    <img alt="avatar" class="avatar img-circle" :src="myAvatar" @click="togglesideBarMenu">
                </div>
                <!-- 导航栏右部 -->
            </div>
        </nav>
        <!-- 页面顶部导航栏 -->

        <div ref="contentRef">
            <transition name="fade">
                <!-- 路由页面出口 -->
                <router-view/>
            </transition>
        </div>

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
            navShow: false
        }
    },
    computed: {
        lastScrollY(){
            return this.$store.state.scrollY;
        }
    },
    components:{
        superFooter,
        sidebarMenu
    },
    mounted() {

        console.log(`%c 你好 😄 %c 开发者 💻`,
            "background:#014983 ; font-size : 13px;color : white; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
            "background:#ccc ; font-size : 13px; color : #014983; padding: 1px; border-radius: 0 3px 3px 0;");

        console.log(`%c很高兴在这里看到你，have a nice day~`,
            "background:#fff ; color : #014983;font-size : 13px; padding: 1px; border-radius: 0 3px 3px 0;");

        this.$refs.contentRef.style.minHeight = document.documentElement.clientHeight + "px";

        //  监听导航栏滚动状态
        window.addEventListener('scroll', this.handleScroll);

        //  拉取文章分类列表
        this.$http.post('articleType/list').then( (result) =>{
            this.$store.commit("updateArticleTypeList", result.data.rows);
        });

        //  拉取文章标签列表
        this.$http.post('tag/list').then( (result) =>{
            this.$store.commit("updateTagList", result.data.rows);
        });

    },
    methods:{

        //  监听滚动事件
        handleScroll(){
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let direction = scrollTop > this.lastScrollY ? "down" : "up";
            this.$store.commit("updateScrollY", scrollTop);

            if(scrollTop == 0){
                return this.navShow = false;
            }

            //  下滚隐藏
            if(direction == "down"){
                return this.navShow = true;
            }else{
                //  否则显示
                return this.navShow = false;
            }
        },

        //  切换显示sideBarMenu
        togglesideBarMenu(){
            this.$refs.sidebarMenu.menuToggle();
        }

    }
}
</script>


<style lang="scss" scoped>
    // 顶部状态栏
    .top-nav{
        width: 100%;
        position: fixed;
        padding: 0px;
        top: 0px;
        z-index:3;
        transition: all .3s;

        // 状态栏右部
        .top-nav-right{
            position: relative;

            >img.avatar{
                position: absolute;
                right: 0px;
                width: 50px;
                margin-top: 5px;
                cursor: pointer;
            }
        }
    }

    .scroll{
        top: -55px;
        z-index: 1;
        transition: all .3s;
    }
    
</style>
