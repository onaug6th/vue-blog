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
                <div
                    class="article-type"
                    v-for="(articleType, index) in typeList"
                    :key="index"
                    :class="{'active': params.articleType == articleType.id}"
                    @click="switchParams('articleType', articleType)"
                >
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
                        :class="{'active': params.tag.includes(tag.id)}"
                        @click.stop="switchParams('tag', tag)"
                    >
                        {{tag.name}}
                    </a>
                </div>

                <div class="article-list" v-for="(item, attr, index) in articleList" :key="index">
                    <h3 class="year">
                        {{ item.year }}
                    </h3>
                    <div class="articles" v-for="(article, i) in item.list" :key="i">
                        <h4>
                            <a @click="readDetail(article.id)">{{ article.title }}</a>
                        </h4>
                        <h5 class="clearfix">
                            {{ article.intro }}
                            <span class="pull-right">
                                {{ dateFormat(article.createdAt) }}
                            </span>
                        </h5>
                    </div>
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
                tag: []
            },
            //  分页配置
            paginationConfig: {},
            //  当前文章列表
            articleList: {}
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
                this.initArticleList();
            });
        }else{
            this.initArticleList();
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
        /**
         * 查看文章
         * @param {string} id id
         */
        readDetail(id){

            this.$router.push({
                path : `/article/${id}`
            });

        },
        //  获取全部文章数据
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
         * 切换查询条件
         * @param {string} type 切换的类型
         * @param {string} obj
         */
        switchParams(type, obj){
            const params = this.params;
            const articleType = params["articleType"];

            if(type == "articleType"){
                
                //  如果没有选择或不一样，赋值
                if(!articleType || articleType !== obj.id){
                    params["articleType"] = obj.id;
                    this.$set(this.params, "tag", []);
                }
                //  如果相同
                else if(articleType == obj.id){
                    params["articleType"] = "";
                    this.$set(this.params, "tag", []);
                }

            }else{
                const id = obj.id;
                //  如果文章类型不相同
                if(articleType != obj.articleType){
                    params["articleType"] = obj.articleType;
                    this.$set(this.params, "tag", []);
                }

                if(!this.params["tag"].includes(id)){
                    this.params["tag"].push(id);
                }else{
                    this.params["tag"].forEach((item, index) =>{
                        item === id && (
                            this.params["tag"].splice(index, 1)
                        );
                    });
                }

            }
            
            this.initArticleList();
        },
        /**
         * 我在那个数组中吗？
         * @param {array} arr1
         * @param {array} arr2
         */
        Array2isInArray1(arr1, arr2){
            return arr2.filter(item =>{
                if(arr1.includes(item)){
                    return item;
                }
            }).length == arr2.length ? true : false;
        },
        //  参数筛选文章列表
        paramsInitArticleList(){
            const params = this.params;

            return this.$store.state.allArticleList.filter(item =>{
                const typeCorrect = (!params.articleType ? true : item.type == params.articleType);
                const tagInclude = (!params.tag.length ? true : this.Array2isInArray1(item.tag, params.tag));
                if(typeCorrect && tagInclude){
                    return item;
                }
            });
        },
        //  分页切割文章数据
        paginationArticleList(list){
            const {currentPage, pageSize} = this.paginationConfig;

            this.paginationConfig.totalPages = Math.ceil(list.length / pageSize);
            
            return list.slice((pageSize * (currentPage - 1)), (currentPage * pageSize));
            
        },
        /**
         * 根据年份排序文章列表
         */
        sortArticleListByYear(list){
            const obj = {};

            list.forEach((item) =>{
                const year = item.createdAt.split("-")[0];
                obj[year] ? obj[year].push(item) : obj[year] = [item];
            });

            return Object.keys(obj).reverse().map((item) =>{
                return {
                    year: item,
                    list: obj[item]
                }
            });
        },
        //  生成展示的文章列表
        initArticleList(){
            return new Promise(resolve =>{

                const params = this.paramsInitArticleList();
                
                const pagination = this.paginationArticleList(params);

                this.articleList = this.sortArticleListByYear(pagination);

                this.$nextTick(() =>{
                    resolve(true);
                });
            });
        },
        /**
         * 页码改变事件
         * @param {number} page 页码
         */
        pageChange(page){
            const paginationConfig = this.paginationConfig;

            paginationConfig.page = page;

            // let hash = `#/archive?page=${page}`;
            
            // this.articleType && (hash += `&type=${this.articleType}`);

            // window.location.hash = hash;

            this.initArticleList().then(() =>{
                this.srcollToListHead();
            });
        },
        //  滚动到列表顶部
        srcollToListHead(){

            //  当前滚动滚动高度
            let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
            //  封面高度
            let headerHeight = document.querySelector(".home-bg").clientHeight - 50;
            //  每次滚动的距离
            let step = scrollHeight / 50;

            ;(function jump(){
                if(scrollHeight > headerHeight){
                    scrollHeight-=step;
                    window.scrollTo(0, scrollHeight);
                    setTimeout(jump, 10);
                }
            })();

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
            cursor: pointer;
            
            & > .type-name{
                font-weight: bold;
            }

            &:hover{
                color: #2c84cc;
                box-shadow: -4px 0 4px rgba(7,17,27,.1),
                    4px 0 4px rgba(7,17,27,.1), 
                    0 -4px 4px rgba(7,17,27,.1),
                    0 4px 4px rgba(7,17,27,.1);
                background: white;
            }

            &.active{
                color: rgb(51, 51, 51) !important;
                box-shadow: -4px 0 4px rgba(7,17,27,.1),
                    4px 0 4px rgba(7,17,27,.1), 
                    0 -4px 4px rgba(7,17,27,.1),
                    0 4px 4px rgba(7,17,27,.1);
                background: white;
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

                &:hover{
                    color: #2c84cc;
                    border: 1px solid #2c84cc;
                    background: white;
                }

                &.active{
                    color: #2c84cc;
                    border: 1px solid #2c84cc;
                    background: white;
                }
            }
        }

        .article-list{
            margin-top: 40px;
            padding: 0px 30px;

            h3.year{
                margin-bottom: 20px;
            }

            .articles{
                padding: 10px 0px;
                border-bottom: 1px solid #eee;
                
                a{
                    cursor: pointer;
                    text-decoration: unset;
                }
            }
        }
    }
 
}

</style>