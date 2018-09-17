<template>

    <div class="home">
        <!-- 顶部背景图 -->
        <header class="home-bg">
            <div class="container">
                <div class="row">
                    <h1 style="font-weight:300">像我这样的人</h1>
                </div>
            </div>
        </header>
        <!-- 顶部背景图结束 -->
        <!-- 内容开始 -->
        <div class="container">
            <div class="row content">
                <!-- 左侧介绍 -->
                <div ref="contentLeft" class="col-lg-3 col-lg-offset-1">
                    <div ref="profile" class="profile" :class="{'profile-fiexd' : profileFiexd}">
                        <!-- 个人资料开始 -->
                        <h5>我 🦁️</h5>
                        <hr>
                        <section class="info">
                            <img src="../assets/home/avatar.jpg" alt="avatar" class="avatar img-rounded">
                            <span class="name">August Yang</span>
                            <span class="intro">自言自语工程师</span>
                        </section>
                        <!-- 个人资料结束 -->
                        <!-- 标签开始 -->
                        <h5>标签 🏷️</h5>
                        <hr>
                        <section class="tags">
                            <a :class="{ 'active': articleType == item.id }" v-for="(item,index) in typeList" :key="index" :title="item.name" @click="switchType(item)">{{ item.name }}</a>
                        </section>
                        <!-- 标签结束 -->
                    </div>
                </div>
                <!-- 右侧文章列表 -->
                <div class="col-lg-8">
                    <!-- 文章列表开始循环 -->
                    <div v-for="(item,index) in articleList" :key="index">
                        <template>
                            <div class="article-box col-sm-12 clearfix">

                                <template v-if="item.bgUrl">
                                    <div class="article-pic row"
                                    :style="{ 'background-image' : 'url('+ item.bgUrl +')' }">
                                        <span class="type">#{{ fliterTypeName(item.type) }}</span>
                                        <h3 class="title" :title="item.title">{{item.title}}</h3>
                                        <h5 class="intro" :title="item.intro">{{item.intro}}</h5>
                                    </div>
                                </template>
                                
                                <template v-else>
                                    <div class="article-content row">
                                        <span class="type">#{{ fliterTypeName(item.type) }}</span>
                                        <h3 class="title" :title="item.title">{{item.title}}</h3>
                                        <h5 class="intro" :title="item.intro">{{item.intro}}</h5>
                                    </div>
                                </template>

                                <div class="article-info">
                                    <hr>
                                    <p>
                                    {{item.createdAt}}
                                        <button class="btn btn-default pull-left" @click="readDetail(item.id)">Read Detail</button>
                                    </p>
                                    <p class="read" style="" :data-read="item.read">👍 {{item.like}}</p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div v-if="!articleList.length">
                        <h1>暂无文章</h1>
                    </div>
                    <!-- 文章列表循环结束 -->
                    <div class="col-sm-12">
                        <pagination :config="paginationConfig" @pageChange="pageChange"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 内容结束 -->
    
    </div>
  
</template>

<script>
import pagination from "../components/common-component/pagination";

export default {
    name: 'home',
    components: {
        pagination
    },
    data(){
        return {
            articleType : "",
            //  分页配置
            paginationConfig : {},
            //  资料固定状态
            profileFiexd : false,
            //  内容左侧索引
            contentLeftRef : {},
            //  资料索引
            profileRef : {},
            //  当前文章列表
            articleList : []
        }
    },
    computed:{
        //  标签列表
        typeList(){
            return this.$store.state.articleTypeList;
        }
    },
    mounted(){
        const that = this;

        that.contentLeftRef  = this.$refs.contentLeft;
        that.profileRef  = this.$refs.profile;
        
        //  监听滚动事件
        window.addEventListener('scroll', that.handleScroll);
        
        //  获取url上可能存在的hash
        that.getUrlQuery();
        //  设置分页组件属性
        that.setPagination();
        //  获取文章列表
        that.getArticleList();
    },
    methods : {
        /**
         * 文章类型中文名称转义
         * @param {string} id id
         */
        fliterTypeName(id){
            
            return this.typeList.filter((item) =>{
                if(item.id == id){
                    return item.name;
                }
            })[0]["name"];
            
        },
        /**
         * 监听滚动事件
         */
        handleScroll(){

            if(this.$route.name !== "home"){
                return;
            }
            //  滚动条高度
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //  窗口宽度
            const windowWidth = document.body.clientWidth;
            
            //  内容左侧宽度（bootstrap媒体查询后计算出）
            const contentLeftWidth = this.contentLeftRef.clientWidth;
            
            //  如果滚动到这个位置，且屏幕宽大于900，动态固定资料栏
            if(scrollTop > 300 && windowWidth > 1200){
                this.profileRef.style.width = (contentLeftWidth - 30) + "px";
                this.profileFiexd = true;
            }else{
                this.profileFiexd = false;
            }

        },
        /**
         * 切换文章类型
         * @param {object} item 类型
         */
        switchType(item){

            const paginationConfig = this.paginationConfig;
            
            const query = {
                page : paginationConfig.page,
                pageSize : paginationConfig.pageSize
            };

            if(this.articleType == item.id){
                this.articleType = "";
            }else{
                this.articleType = item.id;
                query.type = this.articleType;
            }

            this.$router.push({
                query
            });
            this.getArticleList();
        },
        /**
         * 获取url上可能存在的hash，进行分页查询
         */
        getUrlQuery(){
            const query = this.$route.query;
            const paginationConfig = this.paginationConfig;
            
            query.page && (paginationConfig.page = +query.page);
            query.pageSize && (paginationConfig.pageSize = +query.pageSize);
            query.type && (this.articleType = query.type)
        },
        /**
         * 设置分页组件属性
         */
        setPagination(){
            this.paginationConfig = {
                page : 1,
                pageSize : 10,
                prevText : "前页",
                nextText : "后页",
                currentPage : 1,
                totalPages : 0
            }
        },
        /**
         * 获取文章列表
         * 添加排除的内容，来减少数据拉取量
         */
        getArticleList(){
            const that = this;
            const { page, pageSize } = that.paginationConfig;
            
            const params = {
                page,
                pageSize,
                exclude : [ "content" ]
            };

            this.articleType && (params.where = { type : this.articleType });

            that.$http.post("article/list", params)
                .then( (result) =>{
                    if(result.code == 0){
                        that.paginationConfig.totalPages = result.data.totalPages;
                        that.articleList = result.data.rows;
                    }
                });
        },
        /**
         * 查看文章
         * @param {string} id id
         */
        readDetail(id){

            this.$router.push({
                path : `/article/${id}`
            });

        },
        /**
         * 页码改变事件
         * @param {number} page 页码
         */
        pageChange(page){
            const paginationConfig = this.paginationConfig;

            paginationConfig.page = page;
            
            this.$router.push({
                query : {
                    page : page,
                    pageSize : paginationConfig.pageSize,
                    type : this.articleType
                }
            });
            this.getArticleList();
        }
    }
}
</script>
<style lang="scss" scoped>

.home{

    hr{
        margin-top: 0px;
    }

    header.home-bg{
        height: 24em;
        background: gray;
        background-size: cover !important;
        background-position: bottom !important;
        // background-image: url("../assets/home/s75142.jpg");
        background-attachment: fixed;

        h1{
            position: absolute; 
            z-index: 2; 
            color: white; 
            top: 3em; 
            left: 0; 
            right: 0;
            text-align: center;
            text-shadow: 1px 1px 8px #444;
        }

    }

    .content{
        padding-top: 2em;

        .profile{
        
            .info{
                text-align: center;
                padding: 0px 15px 15px 15px;
                color:#555;
                
                >h5{
                    text-align: left;
                }

                span{
                    margin-top: 5px;
                }

                .name{
                    font-weight: 300;
                    font-size: 18px;
                    display: block;
                }

                .intro{
                    display: block;
                }

                .avatar{
                    width: 150px;
                }

            }

            .tags{

                a{
                    display: inline-block;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    color: #555;
                    border-radius: 15px;
                    padding: 0 10px;
                    line-height: 24px;
                    font-size: 12px;
                    text-decoration: none;
                    margin: 0 5px;
                    margin-bottom: 10px;
                    transition: 0.75s;

                    &.active{
                        color: white;
                        background: #2c84cc;
                    }
                }

            }
        }

        .profile-fiexd{
            position: fixed;
            top: 5em;
        }
    }

    .article-box{
        margin: 0px 0px 2em 0px;
        background:white;
        color: #555;
        box-shadow: -4px 0 4px rgba(7,17,27,.1),
        4px 0 4px rgba(7,17,27,.1), 
        0 -4px 4px rgba(7,17,27,.1),
        0 4px 4px rgba(7,17,27,.1);
        transition: 0.75s;

        .article-pic{
            padding: 15px 15px 0px 40px;
            height:200px;
            background-position: 50% 50%;
            background-repeat: repeat;
            background-size: cover;

            h3,h5{
                color: white;
                text-shadow: 1px 1px 8px #444;
            }

            .title{
                font-weight:bold;
            }

            .intro{
                margin-top: 25px;
                overflow: hidden;
                max-height: 14px;
            }
        
        }

        .article-content{
            padding: 15px 15px 0px 40px;

        .title{
            font-weight:bold;
        }

        .intro{
            margin-top: 25px;
            overflow: hidden;
            max-height: 14px;
        }

        }

        .type{
            position: absolute;
            top: 0;
            right: 0;
            color: #999;
            padding: 3px 10px;
            background: #f1f1f1;
            font-size: 14px;
        }

        .article-info{
        padding: 0px 15px 0px 25px;

        p{
            color:#8492A6;
            text-align: right;
        }

        .read{
            font-size: 13px;
        } 
        }

    }
    .article-box:hover{
        transform:scale(1.01,1.01) ;
    }
    
}

.temp-bg{
  background:url('http://oz1y7s5ij.bkt.clouddn.com/images/common/memory.JPG')
}

</style>