<template>

    <div class="home">

        <!-- 顶部背景图开始 -->
        <header class="home-bg" :style="{'background-image' : `url(${homeBgUrl})`}">
            <div class="container">
                <div class="content">
                    <h1 class="title">像我这样的人</h1>
                    <h2 class="description">其实也挺不错的</h2>
                </div>
            </div>
        </header>
        <!-- 顶部背景图结束 -->

        <!-- 内容开始 -->
        <main class="container">

            <div class="row main-content">

                <!-- 个人资料 -->
                <div class="card-box">
                    <a class="card-image">
                        <div class="dont-delete-me"></div>
                    </a>
                    <div class="card-content">
                        <section class="info">
                            <img src="https://avatars1.githubusercontent.com/u/24285577?s=460&v=4" alt="avatar" class="avatar img-rounded">
                            <span class="name">August Yang</span>
                            <span class="intro">自言自语工程师</span>
                            <span class="other">
                                <a href="https://github.com/onaug6th" target="_blank">
                                    <img class="emoji" alt="star2" height="20" width="20" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">onaug6th
                                </a>
                            </span>
                        </section>
                    </div>
                </div>
                <!-- 个人资料 -->
            </div>
        </main>
        <!-- 内容结束 -->
    
    </div>
  
</template>

<script>
// 分页组件
import pagination from "../components/pagination";

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
            //  背景图片地址
            homeBgUrl : "",
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
    created() {
        const nowHour = new Date().getHours();
        if(nowHour <= 18){
            this.homeBgUrl = `http://pjd5crrcu.bkt.clouddn.com/hope.png`;
        }else{
            this.homeBgUrl = `http://pjd5crrcu.bkt.clouddn.com/hope1.png`;
        }
    },
    mounted(){

        //  设置分页组件属性
        this.setPagination();
        //  获取url上可能存在的hash
        this.getUrlQuery();
        //  获取文章列表
        this.getArticleList();
        
    },
    beforeDestroy(){
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
            
            query.page && (paginationConfig.page = paginationConfig.currentPage = +query.page);
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

//  屏幕尺寸小于998时，去掉背景图片上偏移
@media screen and (max-width:998px) {

}

//  屏幕尺寸再小到手机这么大时
@media screen and (max-width:695px) {

    .article-pic{
        padding : 15px !important;
    }
    .article-content{
        padding: 15px !important;
    }
    //  文章信息框无内边距
    .article-info{
        padding: 0px !important;
    }
}

.home{

    hr{
        margin-top: 0px;
    }

    header.home-bg{
        position: relative;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #fff;
        background: #090a0b no-repeat 50%;
        background-size: cover;
        padding: 0 4vw;

        &::before{
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1;
            display: block;
            bottom: 0;
            background: rgba(0,0,0,.18);
        }
        
        .container{
            margin: 0 auto;
            max-width: 1040px;
            width: 100%;
            position: relative;
            z-index: 1;

            .content{
                align-items: center;
                padding: 10vw 4vw;
                min-height: 200px;
                max-height: 450px;
                text-align: center;

                .title{
                    margin: 0;
                    padding: 0;
                    font-size: 3.8rem;
                    font-weight: 100;
                    color: white;
                }

                .description{
                    margin-top: 20px;
                    padding: 5px 0;
                    font-size: 2.2rem;
                    font-weight: 300;
                    letter-spacing: .5px;
                    opacity: .8;
                    text-decoration: line-through;
                }
            }

            .img{
                width: 100%;
                position: relative;
                top: -133px;
            }
        }

    }

    .container{

        @media (min-width: 900px) {
            .main-content{
                margin-top: -70px;
                padding-top: 0;
                position: relative;
                z-index: 1;
            }
        }

        .card-box{
            flex: 1 1 100%;
            flex-direction: row;
            overflow: hidden;
            margin: 0 20px 40px;
            min-height: 300px;
            background: #fff 50%;
            background-size: cover;
            border-radius: 5px;
            box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);
            transition: all .5s ease;
            display: flex;

            &:hover {
                box-shadow: 8px 28px 50px rgba(39,44,49,.07), 1px 6px 12px rgba(39,44,49,.04);
                transition: all .4s ease;
                transform: translate3D(0,-1px,0) scale(1.02);
            }

            .card-image{
                flex: 1 1 auto;
                border-radius: 5px 0 0 5px;
                position: relative;
                overflow: hidden;

                & > div{
                    background-image: url(https://casper.ghost.org/v2.0.0/images/welcome-to-ghost.jpg);
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                }
            }

            .card-content{
                flex: 0 1 357px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .info{
                    text-align: center;
                    padding: 15px 15px 30px 30px;
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

                    .other{
                        display: block;
                        text-align: left;

                        a{
                            text-decoration: unset;
                        }
                    }

                }
            }
        }
        
    }
    
}

</style>