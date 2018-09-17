<template>
    <div class="new-world container-fluid">
        <div class="row">
            <div id="subNav" class="col-lg-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li :class="{'active': nowMenu == 'welcome'}">
                        <a @click="changeNowMenu('welcome')"><span class="glyphicon glyphicon-home"></span> 欢迎</a>
                    </li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li v-for="(item, index) in menuList" :key="index" :class="{'active': nowMenu == item.link}">
                        <a @click="changeNowMenu(item.link, item)">
                            <span :class="'glyphicon glyphicon-' + item.icon">
                                {{ item.name }}
                            </span>
                        </a>
                    </li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li>
                        <a><span class="glyphicon glyphicon-alert"></span> 小黑屋</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-10 main">
                <template v-if="nowMenu == 'welcome'">
                    <p class="alert Topalert">管理员操作界面<br />
                        <font size="1">很多功能都没有完成</font>
                    </p>
                    <h4 class="page-header">数据</h4>

                    <div class="row placeholders">
                        <div class="col-xs-6 col-sm-3">
                            <div class="placeholder" style="background-color: #3598dc;">
                                <div class="visual">
                                    <i class="glyphicon glyphicon-cloud"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 0 </div>
                                    <div class="desc"> 暂时不知道放什么 </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-3">
                            <div class="placeholder" style="background-color: #e7505a;">
                                <div class="visual">
                                    <i class="glyphicon glyphicon-signal"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 不知道 </div>
                                    <div class="desc"> 目前已有文章 </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-3">
                            <div class="placeholder" style="background-color: #32c5d2;">
                                <div class="visual">
                                    <i class="glyphicon glyphicon-user"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 不知道 </div>
                                    <div class="desc"> 目前已注册人数 </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-3">
                            <div class="placeholder" style="background-color: #8E44AD;">
                                <div class="visual">
                                    <i class="glyphicon glyphicon-fire"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 569 </div>
                                    <div class="desc"> 目前已访问人数 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="portlet">
                                <div class="portlet-title">
                                    <div class="caption" style="color:#32c5d2;">
                                        <i class="glyphicon glyphicon-user"></i>
                                        <span> 文章热度排行 </span>
                                    </div>
                                </div>
                                <div id="userDataChart" style="height: 320px;"></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="portlet">
                                <div class="portlet-title">
                                    <div class="caption" style="color:#8E44AD;">
                                        <i class="glyphicon glyphicon-fire"></i>
                                        <span> 访问人数 数据统计</span>
                                    </div>
                                </div>
                                <div id="userHotDataChart" style="height: 320px;"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <router-view/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'newWorld',
    components: {
        
    },
    mounted(){
    },
    data(){
        return {
            //  当前界面
            nowMenu : "welcome",
            //  菜单列表
            menuList: [
                {
                    link : "articleEdit",
                    name : "写文章",
                    icon : "pencil"
                },
                {
                    link : "articleTypeManage",
                    name : "文章分类管理",
                    icon : "cog"
                },
                {
                    link : "articlePictureManage",
                    name : "文章图片管理",
                    icon : "cog"
                },
                {
                    link : "articleManage",
                    name : "文章管理",
                    icon : "cog"
                },
                {
                    link : "articleReplyManage",
                    name : "文章回复管理",
                    icon : "cog"
                },
                {
                    link : "articleInsideReplyManage",
                    name : "文章楼中楼回复管理",
                    icon : "cog"
                },
                {
                    link : "systemLog",
                    name : "系统日志",
                    icon : "envelope"
                }
            ]
        }
    },
    computed:{

    },
    methods : {
        /**
         * 改变菜单
         * @param { string } menuName 菜单名称
         * @param { object } item 菜单属性
         */
        changeNowMenu(menuName, item){
            this.nowMenu = menuName;
            if(item){
                this.$router.push({
                    path : menuName
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.new-world{
    margin-top: 60px;
}


/* Hide for mobile, show later ,no i don't care */

.sidebar {
	padding-top: 30px;
	border-radius: 10px;
}

.sidebar a {
	color: #a7bdcd;
}



/* Sidebar navigation */

.nav-sidebar {
	margin-bottom: 20px;
	
}

.nav-sidebar> li> a {
	padding-right: 20px;
	padding-left: 20px;
}

.nav-sidebar> .active> a,
.nav-sidebar> li> a:hover,
.nav-sidebar> li> a:focus {
	cursor: pointer;
	border-left: 3px solid #5C9ACF;
	color: #5b9bd1;
	background-color: #f2f6f9;
}


/*
 * Main content
 */

.main {
	padding: 20px;
	padding-top: 30px;
}

@media (min-width: 768px) {
	.main {
		padding-right: 40px;
		padding-left: 40px;
	}
}

.main .page-header {
	margin-top: 0;
}

.main .Topalert {
	background: #f5f8fd;
	color: #010407;
	border-left: 5px solid #8bb4e7;
}


/*
 * Placeholder dashboard ideas
 */

.placeholders {
	margin-bottom: 30px;
	text-align: center;
}
.placeholders h4 {
	margin-bottom: 0;
}
.placeholder {
	height:125px;
	display: block;
	margin-bottom: 25px;
	overflow: hidden;
	border-radius: 4px;
}
.placeholder .visual{
    width: 80px;
    height: 80px;
    display: block;
    float: left;
    padding-top: 10px;
    padding-left: 15px;
    margin-bottom: 15px;
    font-size: 35px;
    line-height: 35px;
}
.placeholder .visual>i{
    opacity: 0.7;
    color: #FFF;
    margin-left: -55px;
    font-size: 110px;
    line-height: 122px;
}
.placeholder .details{
    position: absolute;
    right: 15px;
    padding-right: 15px;
}
.placeholder .details .number{
    color: #FFF;
    padding-top: 25px;
    text-align: right;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -1px;
    margin-bottom: 0;
    font-weight: 300;
}
.placeholder .details .desc{
	color: #FFF;
    opacity: 1;
    text-align: right;
    font-size: 14px;
    letter-spacing: 0;
    font-weight: 300;
}
.portlet{
    padding: 12px 20px 15px;
    background-color: #fff;
    border-radius: 5px;height: 400px;
}
.portlet .portlet-title{
    padding: 0;
    min-height: 48px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
    overflow: hidden;
}
.portlet .caption{
    padding: 10px 0;
    display: inline-block;
    font-size: 16px;
    line-height: 18px;
}
</style>