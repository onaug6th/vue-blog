<template>
    
    <div class="archive">

        <!-- 顶部背景图开始 -->
        <header class="home-bg" :style="{'background-image' : `url(${homeBgUrl})`}">
            <div class="container">
                <div class="content">
                    <h1 class="title">归档</h1>
                    <h2 class="description"></h2>
                </div>
            </div>
        </header>
        <!-- 顶部背景图结束 -->

        <!-- 内容开始 -->
        <main class="container">

            <div class="row main-content">
                <div class="article-type" v-for="(articleType, index) in typeList" :key="index">
                    <h5 class="type-name">
                        {{articleType.name}}
                    </h5>
                    <h5>
                        {{articleType.intro}}
                    </h5>
                    <a 
                        class="tag"
                        v-for="(tag, i) in tagFilter(articleType.id)"
                        :key="i"
                        @click="switchTag(tag)"
                    >
                        {{tag.name}}
                    </a>
                </div>

                <pagination :config="paginationConfig" @pageChange="pageChange"></pagination>
            </div>
        </main>
        <!-- 内容结束 -->

    </div>

</template>

<script>
// 分页组件
import pagination from "../components/pagination";

export default {
    name: "archive",
    components: {
        pagination
    },
    data(){
        return {
            homeBgUrl: `https://static.ghost.org/v2.0.0/images/app-integrations.jpg`,
            //  查询条件
            params: {
                articleType: "",
                tag: ""
            },
            //  分页配置
            paginationConfig: {},
            //  当前文章列表
            articleList: []
        }
    },
    computed: {
        //  文章分类列表
        typeList(){
            return this.$store.state.articleTypeList;
        },
        //  标签列表
        tagList(){
            return this.$store.state.tagList;
        }
    },
    mounted() {
        //  设置分页组件属性
        this.setPagination();

        if(!this.$store.state.allArticleList.length){
            //  获取全部文章列表
            this.getAllArticleList().then(() =>{
                //  获取url上可能存在的hash
                this.getUrlQuery();
            });
        }else{
            //  获取url上可能存在的hash
            this.getUrlQuery();
        }
        
    },
    methods:{
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
        getUrlQuery(){

        },
        getAllArticleList(){
            return new Promise(resolve =>{
                this.$http.post("article/list", {})
                    .then((result) =>{
                        if(result.code == 0){
                            this.$store.commit("updateAllArticleList", result.data.rows);
                            resolve(result);
                        }
                    });
            });
        },
        /**
         * 根据文章类型，过滤出对应标签
         * @param {string} articleType 文章类型
         */
        tagFilter(articleType){
            return this.tagList.filter(item =>{
                if(item.articleType == articleType){
                    return item;
                }
            });
        },
        switchTag(){
            this.$swal("等程序员写完");
        },
        /**
         * 页码改变事件
         * @param {number} page 页码
         */
        pageChange(page){
            const paginationConfig = this.paginationConfig;

            paginationConfig.page = page;

            let hash = `#/?page=${page}&pageSize=${paginationConfig.pageSize}&type=`;
            
            this.articleType && (hash += `&type=${this.articleType}`);

            window.location.hash = hash;

            this.getArticleList().then(() =>{
                this.srcollToListHead();
            });
        }
    }
}
</script>


<style lang="scss" scoped>

@media (min-width: 1200px),(min-width: 992px){
    .container {
        width: 970px;
    }
}

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
            text-align: center;

            .title{
                margin-top: 3em;
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

main.container{

    @media (min-width: 900px) {
        .main-content{
            padding-top: 0;
            position: relative;
            z-index: 1;
        }
    }

    .main-content{
        padding-top: 10px;

        .article-type{
            transition-property: all;
            transition-duration: .4s;
            transition-timing-function: ease;
            border: none;
            line-height: 28px;
            margin: 0 2px;
            margin-bottom: 8px;
            background: #f3f5f5;
            border-radius: 5px;
            padding: 5px 30px;
            
            & > .type-name{
                font-weight: bold;
            }

            a.tag{
                transition-property: all;
                transition-duration: .4s;
                transition-timing-function: ease;
                background-color: rgb(148, 176, 222);
                display: inline-block;
                border: 1px solid rgba(255,255,255,.8);
                border-radius: 999em;
                padding: 0 10px 0 10px;
                color: #fff;
                line-height: 24px;
                font-size: 12px;
                text-decoration: none;
                margin: 0 1px;
                margin-bottom: 6px;
                cursor: pointer;

                &:hover{
                    color: #2c84cc;
                    border: 1px solid #2c84cc;
                    background: white;
                }
            }
        }
    }
 
}

</style>