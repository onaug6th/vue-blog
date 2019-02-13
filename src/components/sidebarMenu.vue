<template>
    <transition name="fadefast">
        <div v-show="menuShow" class="side-menu">
            <div v-if="!isMenuFixed" class="modal-backdrop fade in" @click="closeMenu()"></div>
            <div class="sidebar-main" :class="{'short': isMenuFixed}">
                <div class="sidebar-header header-cover"
                    :style="{'background-image' : `url(${imgCdnUrl}common/hope.png)`}"
                    >
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
                        <a @click="pageTo(item)"><i class="glyphicon" :class="item.icon"></i>  {{item.label}}</a>
                    </li>
                    <li>
                        <a href="https://github.com/onaug6th" target="_blank" title="github">
                            <img class="emoji" alt="github" height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/octocat.png">
                            <span class="relative">onaug6th</span>
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a @click="pageTo({path: 'about'})">关于</a>
                    </li>
                </ul>
                <div class="sidebar-footer">
                    <div>
                        <span class="relative">固定菜单</span>
                        <superSwitch class="pull-right" :config="switchConfig" @switchChange="toggleFixedMenu"></superSwitch>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
import superSwitch from "./superSwitch.vue";

export default {
    name: "sidebarMenu",
    props: {
        menuShow: {
            type: Boolean
        }
    },
    components: {
        superSwitch
    },
    data(){
        return {
            sidebarList: [
                {
                    "path": "",
                    "icon": "glyphicon-home",
                    "label": "主页"
                },
                {
                    "path": "archive",
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
            ],
            switchConfig: {
                onText: "on",
                offText: "off",
                isChecked: false
            }
        }
    },
    computed: {
        isMenuFixed(){
            return this.$store.state.isMenuFixed;
        }
    },
    watch: {
        isMenuFixed(){
            this.switchConfig.isChecked = this.isMenuFixed;
        }
    },
    methods:{
        closeMenu(){
            this.$emit("close", true);
        },
        /**
         * 切换其他页面
         * @param {object} item 页面
         */
        pageTo(item){
            !this.isMenuFixed && this.closeMenu();
            this.$router.push({
                path : `/${item.path}`
            });
        },
        toggleFixedMenu(status){
            this.$store.commit("toggleMenuFixed", status);
        }
    }
}
</script>


<style lang="scss" scoped>

    /*
     * 来自远古时期的样式代码
     */
    .side-menu{
        z-index: 20;
        position:absolute;

        .sidebar-main.short{
            width: 200px !important;

            .sidebar-footer{
                width: 200px !important;
            }
        }

        .sidebar-main{
            transition: all .5s;
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
                transition: all .5s;

                .top-bar{
                    height: 25px;;
                }
                .sidebar-image{
                    position: relative;

                    img{
                        width: 50px;
                        margin: 16px;
                    }

                }
                .sidebar-brand{
                    display: block;
                    width: 100%;
                    color:white;
                    text-decoration: none;
                    padding: 10px 10px 0px 10px;
                    background: rgba(0, 0, 0, 0.4);
                }
            }

            .sidebar-nav{
                
                li a{
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

            .sidebar-footer{
                transition: all .5s;
                position: fixed;
                bottom: 0px;
                width: 300px;
                padding: 15px;

                > div{
                    color: #555;
                    user-select: none;
                    display: block;
                    
                    transition: all .2s ease-in-out;
                }
            }
        }
    }

    .relative{
        position: relative;
        bottom: -5px;
    }
    
</style>
