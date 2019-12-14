<template>

    <div class="home">
        
        <!-- 顶部背景图开始 -->
        <header class="home-bg" :style="{'background-image' : `url(${homeBgUrl})`}">
            <div class="container">
                <div class="content">
                    <h1 class="title">趁我还记得</h1>
                    <h2 class="description">其实我一直都记得</h2>
                </div>
            </div>
        </header>
        <!-- 顶部背景图结束 -->

        <!-- 内容开始 -->
        <main class="container">

            <div class="row main-content">

                <div class="card-box">
                    <a class="card-image">
                        <div style="background: url('https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/common/92249761857029110.jpg') no-repeat;" class="dont-delete-me"></div>
                    </a>
                    <div class="card-content">
                        <div class="content">
                            <span>奇思妙想</span>
                            <h3>onaug6th</h3>
                            <p>趁我还记得</p>
                        </div>
                        <div class="footer">
                            <button class="btn btn-default" @click="readDetail(27)">Read Detail</button>
                            <span class="date">2017.10.30</span>
                        </div>
                    </div>
                </div>

                <div class="card-box" v-for="(item, index) in articleList" :key="index">
                    <a class="card-image">
                        <div
                            :style="{
                                'background-image' : `url(${item.bgUrl})`
                            }"
                            class="dont-delete-me"></div>
                    </a>
                    <div class="card-content">
                        <div class="content">
                            <span>{{ fliterTypeName(item.type) }}</span>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.intro }}</p>
                        </div>
                        <div class="footer">
                            <button class="btn btn-default" @click="readDetail(item.id)">Read Detail</button>
                            <span class="date">{{ dateFormat(item.createdAt) }}</span>
                        </div>
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
    name: 'home',
    components: {
        pagination
    },
    data() {
        return {
            //  分页配置
            paginationConfig: {
                page : 1,
                pageSize : 10,
                prevText : "前页",
                nextText : "后页",
                totalPages : 0
            },
            //  背景图片地址
            homeBgUrl: "",
            //  当前文章列表
            articleList: []
        }
    },
    computed: {
        //  文章类型列表
        typeList(){
            return this.$store.state.articleTypeList;
        }
    },
    created() {
        const nowHour = new Date().getHours();
        if(nowHour <= 18){
            this.homeBgUrl = this.imgCdnUrl + `common/hope.png`;
        }else{
            this.homeBgUrl = this.imgCdnUrl + `common/hope1.png`;
        }
        //  获取url上可能存在的hash
        this.getUrlQuery();
    },
    mounted() {
        //  获取文章列表
        this.getArticleList();
    },
    methods: {
        /**
         * 文章类型中文名称转义
         * @param {string} id id
         */
        fliterTypeName(id){
            
            try{
                return this.typeList.filter((item) =>{
                    if(item.id == id){
                        return item.name;
                    }
                })[0]["name"];
            }catch(e){
                return "你自己想想为什么会看到我";
            }
            
        },
        /**
         * 获取url上可能存在的hash，进行分页查询
         */
        getUrlQuery(){
            const query = this.$route.query;
            const paginationConfig = this.paginationConfig;
            
            query.notRecord && (localStorage.setItem("notRecord", true));
            query.page && (paginationConfig.page = +query.page);
            query.pageSize && (paginationConfig.pageSize = +query.pageSize);
        },
        /**
         * 获取文章列表
         * 添加排除的内容，来减少数据拉取量
         */
        getArticleList(){
            const { page, pageSize } = this.paginationConfig;
            
            const params = {
                page,
                pageSize,
                exclude: ["content"],
                where: {
                    homeShow: 1
                }
            };

            this.$http.post("article/list", params)
                .then((result) =>{
                    if(result.code == 0){
                        this.paginationConfig.totalPages = result.data.totalPages;
                        this.articleList = result.data.rows;

                        this.$nextTick(() =>{
                            if(sessionStorage.getItem("scrollLastPage") == "home"){
                                sessionStorage.removeItem("scrollLastPage");
                                window.scrollTo(0, this.$store.state.lastPageScrollY);
                            }else{
                                window.scrollTo(0, 0);
                            }
                        });
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

        },
        /**
         * 页码改变事件
         * @param {number} page 页码
         */
        pageChange(page){
            const paginationConfig = this.paginationConfig;

            paginationConfig.page = page;

            let hash = `#/?page=${page}`;

            window.location.hash = hash;

            this.getArticleList();
            this.srcollToListHead();
        }
    }
}
</script>
<style lang="scss" scoped>

@media (min-width: 1200px){
    .container {
        width: 1040px;
    }
}

//  屏幕尺寸小于998时，去掉背景图片上偏移
@media screen and (max-width:998px) {

}

//  屏幕尺寸再小到手机这么大时
@media screen and (max-width:695px) {

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
                min-height: 24em;
                max-height: 450px;
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
                margin-top: -70px;
                padding-top: 0;
                position: relative;
                z-index: 1;
            }
        }

        .main-content{
            padding-top: 10px;
        }

        @media (min-width: 795px){
            .card-box{
                flex: 1 1 100% !important;
                flex-direction: row !important;

                .card-image{
                    flex: 1 1 auto;

                    & > div{
                        position: absolute;
                        width: 100% !important;
                        height: 100% !important;
                    }
                }
                .card-content{
                    flex: 0 1 357px;

                    .content{
                        padding: 30px 40px 0;
                    }

                    .footer{
                        padding: 0 40px 30px;
                    }
                }
            }
        }

        .card-box{
            flex: 1 1 300px;
            flex-direction: column;
            overflow: hidden;
            margin: 0 20px 40px;
            min-height: 300px;
            background: #fff 50%;
            background-size: cover;
            border-radius: 5px;
            box-shadow: 
                        8px 14px 38px rgba(39,44,49,.06),
                        1px 3px 8px rgba(39,44,49,.03);
            transition: all .5s ease;
            display: flex;

            &:hover {
                box-shadow: 8px 28px 50px rgba(39,44,49,.07), 1px 6px 12px rgba(39,44,49,.04);
                transition: all .4s ease;
                transform: scale(1.02);
            }


            .card-image{
                position: relative;
                overflow: hidden;

                & > div{
                    width: auto;
                    height: 200px;
                    background: #c5d2d9 no-repeat 50%;
                    background-size: cover;
                }
            }

            .card-content{
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .content{
                    padding: 25px 25px 0;
                    flex-grow: 1;

                    h3{
                        margin-top: 10px;
                    }

                    span{
                        display: block;
                        margin-bottom: 4px;
                        color: #738a94;
                        font-size: 1.2rem;
                        line-height: 1.15em;
                        font-weight: 500;
                        letter-spacing: .5px;
                        text-transform: uppercase;
                    }
                }

                .footer{
                    padding: 0px 25px 25px 25px;

                    .date{
                        float: right;
                        position: relative;
                        bottom: -10px;
                        color: #738a94;
                    }
                }
            }
        }
        
    }
    
}

</style>