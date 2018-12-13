<template>
    
    <div class="side-menu">
        <transition-group name="fade">
            <div v-if="isShowMenu" class="modal-backdrop fade in" @click="menuToggle()"></div>
            <div v-if="isShowMenu" class="sidebar-main">
                <div class="sidebar-header header-cover" :style="{'background-image' : `url(${imgCdnUrl}/hope.png)`}">
                    <div class="top-bar"></div>
                    <div class="sidebar-image">
                        <img class="img-circle" :src="myAvatar" alt="avatar">
                    </div>
                    <a class="sidebar-brand clearfix">
                        <p>August Yang</p>
                        <p>onaug6th@qq.com</p>
                    </a>
                </div>
                <ul class="nav sidebar-nav">
                    <li>
                        <router-link to="/">主页</router-link>
                    </li>
                    <li class="dropdown clearfix">
                        <a href="#" class="ripple-effect dropdown-toggle">
                            <i class="glyphicon glyphicon-book"></i> 归档
                        </a>
                    </li>
                    <li class="dropdown clearfix">
                        <a href="#" class="ripple-effect dropdown-toggle">
                            <i class="glyphicon glyphicon-inbox"></i> 印象
                        </a>
                    </li>
                    <li class="dropdown clearfix">
                        <a href="#" class="ripple-effect dropdown-toggle">
                            <i class="glyphicon glyphicon-inbox"></i> 墙
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <router-link to="/about">关于</router-link>
                    </li>
                </ul>
            </div>
        </transition-group>
    </div>

</template>

<script>

export default {
    name: "sidebarMenu",
    data(){
        return {
            isShowMenu: false
        }
    },
    computed: {
        
    },
    mounted() {

    },
    methods:{
        menuToggle(){
            this.isShowMenu = false;
        }
    }
}
</script>


<style lang="scss" scoped>

    /*
    * 来自远古代码的样式
    */
    .side-menu{
        display: none;
        z-index: 20;
        position:absolute;

        .sidebar-main{
            position: fixed;
            z-index: 1041;
            top: 0;
            width: 300px;
            left: 0px;
            height: 100%;
            background: #FFFFFF;
            box-shadow: -4px 0 4px rgba(7, 17, 27, 0.1), 4px 0 4px rgba(7, 17, 27, 0.1), 0 -4px 4px rgba(7, 17, 27, 0.1), 0 4px 4px rgba(7, 17, 27, 0.1);

            .sidebar-header{
                background-size: cover !important;
                background-position: center !important;
            }

            .top-bar{
                height: 25px;;
            }

            .sidebar-image img{
                width: 50px;
                margin: 16px;
            }

            .sidebar-brand{
                display: block;
                width: 100%;
                color:white;
                text-decoration: none;
                padding: 10px 10px 0px 10px;
                background: rgba(0, 0, 0, 0.4);
            }

            .sidebar-nav li a{
                position: relative;
                cursor: pointer;
                color: #555;
                user-select: none;
                display: block;
                padding: 15px;
                transition: all .2s ease-in-out;
            }

            li.dropdown ul{
                position: relative;
                width: 100%;
                margin: 0;
                padding: 0;
                border: none;
                border-radius: 0;
                box-shadow: none;
            }

            li.divider{
                height: 1px;
                margin: 9px 0;
                overflow: hidden;
                background-color: #e5e5e5;
            }
        }
    }
    
</style>
