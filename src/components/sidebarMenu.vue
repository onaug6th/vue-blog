<template>
    <transition name="fadefast">
        <div v-if="isShowMenu" class="side-menu">
            <div class="modal-backdrop fade in" @click="menuToggle()"></div>
            <div class="sidebar-main">
                <div class="sidebar-header header-cover" :style="{'background-image' : `url(${imgCdnUrl}/hope.png)`}">
                    <div class="top-bar"></div>
                    <div class="sidebar-image">
                        <img class="img-circle" :src="myAvatar" alt="avatar">
                    </div>
                    <a class="sidebar-brand clearfix">
                        <p>onaug6th</p>
                        <p>自言自语工程师</p>
                    </a>
                </div>
                <ul class="nav sidebar-nav">
                    <li v-for="(item, index) in sidebarList" :key="index">
                        <a @click="other(item)"><i class="glyphicon" :class="item.icon"></i>  {{item.label}}</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="https://github.com/onaug6th" target="_blank" title="github">
                            <img class="emoji" alt="github" height="20" width="20" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">
                            <span style="position: relative; bottom: -5px;">onaug6th</span>
                        </a>
                    </li>
                    <li>
                        <a @click="other({path: 'about'})">关于</a>
                    </li>
                </ul>
            </div>
        </div>
    </transition>

</template>

<script>

export default {
    name: "sidebarMenu",
    data(){
        return {
            isShowMenu: false,
            sidebarList: [
                {
                    "path": "",
                    "icon": "glyphicon-home",
                    "label": "主页"
                },
                {
                    "path": "",
                    "icon": "glyphicon-book",
                    "label": "归档"
                },
                {
                    "path": "memory",
                    "icon": "glyphicon-picture",
                    "label": "印象"
                },
                {
                    "path": "wall",
                    "icon": "glyphicon-tag",
                    "label": "墙"
                }
            ]
        }
    },
    methods:{
        menuToggle(){
            this.isShowMenu = !this.isShowMenu;
        },
        other(item){
            this.menuToggle();
            this.$router.push({
                path : `/${item.path}`
            });
        }
    }
}
</script>


<style lang="scss" scoped>

    /*
    * 来自远古代码的样式
    */
    .side-menu{
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

            li.divider{
                height: 1px;
                margin: 9px 0;
                overflow: hidden;
                background-color: #e5e5e5;
            }
        }
    }
    
</style>
