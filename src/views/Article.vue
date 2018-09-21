<template>
  
  <div class="article">
    
    <header class="article-bg" :style="{ 'background-image' : 'url('+ article.bgUrl +')' }">
        <div class="container">
            <div>
                <h1>{{ article.title }}</h1>
                <h2>{{ article.intro }}</h2>
            </div>
        </div>
    </header>

    <div class="article-body container">

        <div class="row content">
            <header v-if="!isEdit" class="col-sm-12">
                <div v-if="token" class="form-group text-right">
                    <button class="btn btn-success" @click="editArticle()">编辑内容</button>
                </div>
                <h5 class="text-right">{{article.createdAt}}</h5>
                <h5 class="text-right"># {{ fliterTypeName(article.type) }}</h5>
            </header>
            <header v-if="isEdit" class="col-sm-12">
                <h2 class="text-center">
                    <input class="form-control text-center" v-model="article.title" placeholder="标题"/>
                </h2>
                <div class="form-group text-right">
                    <button class="btn btn-success" @click="editArticle()">取消编辑</button>
                </div>
                <h5>
                    <input class="form-control text-right" v-model="article.createdAt" placeholder="时间"/>
                </h5>
                <h5>
                    <input class="form-control text-right" v-model="article.type" placeholder="类型"/>
                </h5>
            </header>
            <!-- 顶部标题，及时间等信息 -->
            <!-- 正文开始 -->
            <article v-if="!isEdit" class="col-sm-12" v-html="article.content">
            </article>
            <div v-if="isEdit" class="form-group edit">
                <tinymceEdit v-model="article.content"></tinymceEdit>
            </div>
            <!-- 正文结束 -->
            <div v-if="isEdit" class="form-group text-center">
                <button class="btn btn-success" @click="updateArticle()">保存</button>
            </div>  
            <!-- 点赞区域开始 -->
            <div class="like-and-share col-sm-12 text-center">
                <button class="like-btn btn btn-lg btn-default" title="我觉得可以" @click="newLike()">
                    <p class="like-icon">&nbsp;&nbsp;👍&nbsp;&nbsp;</p>
                    <p>{{article.like}}</p>
                </button>
            </div>
            <!-- 点赞区域结束 -->
            <!-- 发表回复 -->
            <div class="reply col-sm-12">
                <div class="reply-avatar col-sm-1 col-xs-2">
                    <div>
                        <img alt="目前只有这个头像啦" :src="replyObj.avatar" />
                    </div>
                    <button class="btn btn-primary btn-xs hide" @click="changeAvatar()">更换头像</button>
                </div>
                <div class="reply-reply-box clearfix">
                    <div class="form col-sm-11 col-xs-10">
                        <div class="form-group clearfix">
                            <div class="col-sm-4">
                                <input type="text" class="form-control" placeholder="您的名称" v-model="replyObj.name">
                            </div>
                        </div>
                        <div class="form-group clearfix">
                            <div class="col-sm-4">
                                <input type="text" class="form-control" placeholder="您的邮箱（不会告诉别人）" v-model="replyObj.email">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <textarea class="form-control" placeholder="发表回复" rows="3" v-model="replyObj.content">

                            </textarea>
                        </div>
                    </div>
                    <div class="form col-sm-12 clearfix">
                        <div class="submit-warp col-sm-6 text-right pull-right">
                            <button class="btn btn-success" @click="replySubmit()">提交</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <h4>评论  {{ paginationConfig.count }}条</h4>
                </div>
                <hr>
            </div>
            <!-- 回复列表 -->
            <div class="reply-list col-sm-12">
                <div class="reply-box" v-for="(item,index) in replyList" :key="index">
                    <!-- 回复人信息 -->
                    <div class="user-info">
                        <div class="user-avatar col-sm-1 col-xs-2">
                            <img alt="用户头像" :src="item.avatar" />
                        </div>
                        <div class="user-floor col-sm-11 col-xs-10">
                            <p class="name">{{item.floor}}楼&nbsp;&nbsp;&nbsp;{{item.name}}</p>
                            <p class="date">{{item.createdAt}}</p>
                        </div>
                    </div>
                    <!-- 回复人信息 -->
                    <!-- 对文章的评论内容 -->
                    <div class="reply-content col-sm-11 col-sm-offset-1" v-html="item.content"></div>
                    <!-- 对文章的评论内容 -->
                    <!-- 点赞或评论此楼 -->
                    <div class="like-and-reply col-sm-12">
                        <div class="like" @click="replyNewLike(item, index)">
                            <template v-if="item.like == 0">
                                <span class="glyphicon glyphicon-thumbs-up"></span> 点赞
                            </template>
                            <template v-else>
                                <span class="glyphicon glyphicon-thumbs-up"></span> {{item.like}}个人赞
                            </template>
                        </div>
                        <div class="reply" @click="toggleReplytBox(item)">
                            <span class="glyphicon glyphicon-comment"></span><font>评论</font>
                        </div>
                    </div>
                    <!-- 点赞或评论此楼 -->
                    <!-- 评论此楼 -->
                    <transition name="fade">
                        <div class="col-sm-12" v-if="item.boxShow">
                            <div class="row">
                                <div class="form-group clearfix">
                                    <div class="col-sm-4">
                                        <h5>正在评论 {{item.name}}</h5>
                                        <input type="text" class="form-control" placeholder="您的名称" v-model="item.replyObj.name">
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" placeholder="您的邮箱" v-model="item.replyObj.email">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <textarea class="form-control" placeholder="发表回复" rows="3" v-model="item.replyObj.content"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-6 text-right" style="padding:10px 15px;">
                                    <button class="btn btn-success" @click="insideReplySubmit(item.floor, item)">提交</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- 评论此楼 -->
                    <!-- 展开评论列表 -->
                    <div class="col-sm-12 form-group clearfix" v-if="item.subList">
                        <button class="btn btn-success btn-xs" @click="toggleReplyList(item)">
                            {{ item.listShow ? '隐藏评论列表' : '展开评论列表' }}
                        </button>
                    </div>
                    <!-- 展开评论列表 -->
                    <!-- 点赞或评论此楼 -->
                    <!-- 楼中楼评论列表 -->
                    <template v-if="item.subList">
                        
                        <transition name="fade">
                            <div v-if="item.listShow" class="inside-reply-list col-xs-12">
                                <!-- 楼中楼评论 -->
                                <div class="clearfix" v-for="(inside,i) in item.subList" :key="i">

                                    <template v-if="item.name == inside.replyName">
                                        <p>{{inside.name}} 说：{{inside.content}}</p>
                                    </template>

                                    <template v-else>
                                        <p>{{inside.name}} 对 {{inside.replyName}} 说：{{inside.content}}</p>
                                    </template>

                                    <div class="form-group clearfix">
                                        <div class="date">
                                            <p>{{inside.createdAt}}</p>
                                        </div>
                                        <div class="reply" @click="toggleInsideReplytBox(inside)">
                                            <span class="glyphicon glyphicon-comment"></span><font>回复</font>
                                        </div>
                                        <div v-if="token" class="trash" @click="deleteInsideReply(inside, item.subList)">
                                            <span class="glyphicon glyphicon-trash"></span><font>删除</font>
                                        </div>
                                    </div>

                                    <transition name="fade">
                                        <div v-if="inside.boxShow" class="row">
                                            <div class="form-group clearfix">
                                                <div class="col-sm-4">
                                                    <h5>正在回复{{inside.name}}</h5>
                                                    <input type="text" class="form-control" placeholder="您的名称" v-model="inside.replyObj.name" />
                                                </div>
                                            </div>
                                            <div class="form-group clearfix">
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control" placeholder="您的邮箱" v-model="inside.replyObj.email" />
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <textarea class="form-control" placeholder="发表回复" rows="3" v-model="inside.replyObj.content"></textarea>
                                            </div>
                                            <div class="col-sm-6 col-sm-offset-6 text-right" style="padding:10px 15px;">
                                                <button class="btn btn-success" @click="insideReplyClick(item.floor, inside)">提交</button>
                                            </div>
                                        </div>
                                    </transition>

                                </div>
                                <!-- 楼中楼评论 -->
                                <!--底部分页按钮-->
                                <pagination :config="item.pagination" @pageChange="renderInsideReplyList(item)"></pagination>
                                <!--底部分页按钮-->
                            </div>
                        </transition>

                    </template>
                    <!-- 楼中楼评论列表 -->
                    <hr>

                </div>
                <!--底部分页按钮-->
                <pagination :config="paginationConfig" @pageChange="pageChange"></pagination>
                <!--底部分页按钮-->
            </div>
        </div>

    </div>
  </div>

</template>

<script>
import tinymceEdit from "../components/common-component/tinymceEdit";

import pagination from "../components/common-component/pagination";

export default {
    name: 'article',
    components: {
        tinymceEdit,
        pagination
    },
    mounted(){
        const that = this;
        const params = this.$route.params;
        
        if( params.id ){
            //  获取文章信息
            that.$http.put(`article/read/${params.id}`).then(()=>{
                
                that.getArticle(params.id).then((result) =>{
                    that.article = result.data;
                    //  获取url上可能存在的hash
                    that.getUrlQuery();
                    //  设置分页组件属性
                    that.setPagination();

                    //  获取评论列表并渲染
                    that.rendeReplyList();
                }).catch((result) =>{
                    that.$swal("找不到这篇文章", "", "success").then(()=>{
                        that.$router.push({
                            path : "/"
                        });
                    });
                });

            });
        }else{
            that.$swal("找不到这篇文章", "", "success").then(()=>{
                that.$router.push({
                    path : "/"
                });
            });
        }
    },
    updated(){
        if(!this.isEdit){
            //  代码高亮
            this.$nextTick(()=>{
                window["Prism"].highlightAll();
            });
        }
    },
    data(){
        return {
            //  查询条件
            params : {
                page : 1,
                pageSize : 10
            },
            //  分页配置
            paginationConfig : {},
            //  文章信息
            article : {
                id : "",
                type : "",
                title : "",
                content : "",
                bgUrl : "",
                read : "",
                like : ""
            },
            //  是否编辑
            isEdit : false,
            //  评论信息
            replyObj : {
                content : "",
                name : "",
                email:"",
                avatar : this.defaultAvatar
            },
            //  评论列表
            replyList:[]
        }
    },
    computed:{
        token(){
            return this.$store.state.token;
        }
    },
    methods : {
        /**
         * 文章类型中文名称转义
         * @param {string} id id
         */
        fliterTypeName(id){

            try{

                return this.$store.state.articleTypeList.filter((item) =>{
                
                    if(item.id == id){
                        return item.name;
                    }

                })[0]["name"];

            }catch(e){

            }
            
        },
        /**
         * 获取文章信息
         * @param {string} id id
         */
        getArticle(id){
            return new Promise((resolve, reject)=>{
                this.$http.get(`article/${id}`).then((result) =>{
                    
                    if(result.code == 0 ){
                        resolve(result);
                    }else{
                        reject(result);
                    }
                });
            });
        },
        /**
         * 切换编辑
         */
        editArticle(){
            this.isEdit = !this.isEdit;
        },
        /**
         * 更新文章
         */
        updateArticle(){
            const params = {
                ...this.article,
                exclude : ["bgUrl", "read", "like", "show"]
            };
            this.$http.put(`article/${this.article.id}`, params).then((result) =>{
                this.$swal(result.detailMsg, "", "success");
                if(result.code == 0){
                    this.isEdit = false;
                }
            });
        },
        changeAvatar(){
            const random = parseInt(Math.random() * 2);
            this.replyObj.avatar = this.avatarArr[random];
        },
        /**
         * 切换显示评论列表
         * @param {object} item 行对象
         */
        toggleReplyList(item){
            this.$set(item, "listShow", !item.listShow);
            this.$forceUpdate();
        },
        /**
         * 评论提交
         */
        replySubmit(){

            const that = this;

            if(!that.replyObj.content || !that.replyObj.name){
                return that.$swal("名称和内容是必须的", "", "warning");
            }

            const params = {
                articleId : that.article.id,
                ...that.replyObj
            }

            that.$http.post("reply", params).then((result)=>{
                that.$swal(result.detailMsg, "", "success");
                
                if(result.code == 0){
                    that.emptyReplyObj();
                    that.rendeReplyList();
                    //  自动跳转到最后一页。
                    that.$set(that.paginationConfig, "currentPage" , that.paginationConfig.totalPages);
                }
            });
        },
        /**
         * 清空留言表单信息
         */
        emptyReplyObj(){
            for(let i in this.replyObj){
                if(i == "avatar"){
                   continue; 
                }
                this.replyObj[i] = "";
            }
        },
        /**
         * 评论计时
         */
        replyCountTime(){

        },
        /**
         * 新赞！
         */
        newLike(){
            const that = this;

            that.$http.put("article/like/" + that.article.id)
                .then( (result) =>{
                    
                    that.$swal(result.detailMsg, "", "success");
                    if(result.data.id){
                        that.article.like ++ ;
                    }
                });
        },
        /**
         * 获取url上可能存在的hash，进行分页查询
         */
        getUrlQuery(){
            const query = this.$route.query;
            const params = this.params;
            
            query.page && (params.page = +query.page);
            query.pageSize && (params.pageSize = +query.pageSize);
        },
        /**
         * 设置分页组件属性
         */
        setPagination(){
            this.paginationConfig = {
                prevText : "前页",
                nextText : "后页",
                currentPage : this.params.page,
                count : 0,
                totalPages : 0
            }
        },
        /**
         * 获取回复列表
         */
        getReplyList(){
            const that = this;
            const params = {
                ...that.params,
                articleId : this.$route.params.id
            };
            return new Promise((resolve, reject)=>{

                that.$http.post("reply/list", params)
                    .then( (result) =>{
                        if(result.code == 0){
                            that.paginationConfig.count = result.data.count;
                            that.paginationConfig.totalPages = result.data.totalPages;
                            resolve(result);
                        }
                    });

            });

        },
        /**
         * 渲染回复列表数据
         */
        rendeReplyList(){
            this.getReplyList().then((result)=>{
                //  当获取评论列表成功时，尝试获取内部楼中楼回复，并且赋予每个对象都保存分页属性。
                result.data.rows.forEach((item, index) =>{
                    item.pagination = {
                        currentPage : 1,
                        pageSize : 5,
                        currentPage : 1,
                        totalPages : 0,
                        prevText : "前页",
                        nextText : "后页"
                    };
                    item.replyObj = {
                        name:"",
                        email:"",
                        content:""
                    };

                    //  根据对象属性来渲染某个楼中楼评论列表
                    this.renderInsideReplyList(item, "");

                });

                this.replyList = result.data.rows;
            });
        },
        /**
         * 回复的新赞！
         */
        replyNewLike(item, index){
            const that = this;

            that.$http.put("reply/like/" + item.id)
                .then( (result) =>{
                    that.$swal(result.detailMsg, "", "success");
                    if(result.data.id){
                        that.replyList[index].like ++ ;
                    }
                });
        },
        /**
         * 切换显示回复盒子
         * @param {any} index 行号
         */
        toggleReplytBox(item){
            this.$set(item, "boxShow", !item.boxShow);
            this.$forceUpdate();
        },
        /**
         * 楼中楼回复提交
         * @param {number} floorId 楼号
         * @param {object} item 行对象
         */
        insideReplyClick(floor, item){
            this.insideReplySubmit(floor, item).then(()=>{
                //  隐藏留言盒子
                this.toggleInsideReplytBox(item);

                const obj =  this.replyList.filter((floorObj, index)=>{
                    if(floorObj.id == floor){
                        return floorObj;
                    }
                })[0];
                
                obj && obj.pagination && (this.$set(obj.pagination, "currentPage", obj.pagination.totalPages));
            });
        },
        /**
         * 内部评论回复
         * @param {number} floorId 楼号
         * @param {object} item 行对象
         */
        insideReplySubmit(floorId, item){

            if(!item.replyObj.content || !item.replyObj.name){
                return this.$swal("名称和内容是必须的", "", "warning");
            }

            const params = {
                articleId : this.article.id,
                floorId : floorId,
                replyId : item.id,
                replyName : item.name,
                ...item.replyObj
            };

            return new Promise((resolve, reject)=>{
                this.$http.post("insideReply", params).then( (result)=>{
                    this.$swal(result.detailMsg, "", "success");
                    
                    if(result.code == 0){
                        this.emptyInsideReplyObj(item);
                        this.renderInsideReplyList(false, floorId);
                        resolve(result);
                    }

                });
            });
        },
        /**
         * 清空内部评论表单信息
         */
        emptyInsideReplyObj(item){
            for(let i in item.replyObj){
                item.replyObj[i] = "";
            }
        },
        /**
         * 根据对象属性来渲染某个楼的楼中楼评论列表
         * @param {object} item 行对象
         * @param {object} floor 行号
         */
        renderInsideReplyList(item, floor){
            
            //  寻找item，如果不存在，根据floor号码进行寻找。
            item = item || this.replyList.filter((item,index)=>{
                if(item.id == floor){
                    return item;
                }
            })[0];

            //  获取内部回复列表，并且对列表数据进行初始化。
            this.getInsideReplyList(item).then( (data)=>{
                
                //  赋值分页总页数
                item.pagination.totalPages = data.totalPages;
                //  列表是否展示
                item.listShow = true;
                
                //  遍历内部属性，赋值留言区域绑定数据
                data.rows.forEach( (inside, i)=>{
                    inside.replyObj = {
                        name : "",
                        email : "",
                        content : ""
                    };
                });
                
                this.$set(item, "subList", data.rows);
            });
        },
        /**
         * 获取楼中楼回复列表
         * @param {object} item 行对象
         */
        getInsideReplyList(item){
            const that = this;
            const params = {
                articleId : that.article.id,
                page : item.pagination.currentPage,
                pageSize : item.pagination.pageSize,
                floorId : item.floor || item.floorId
            };

            return new Promise((resolve, reject) =>{
                that.$http.post("insideReply/list", params)
                    .then((result) =>{
                        if(result.code == 0){
                            resolve(result.data);
                        }
                    });
            });
        },
        /**
         * 删除楼中楼回复
         * @param {object} item 行对象
         * @param {Array} subList 楼中楼回复数组
         */
        deleteInsideReply(item, subList){
            const that = this;

            that.$http.delete("insideReply/" + item.id)
                .then((result) =>{
                    that.$swal(result.detailMsg, "", "success");
                    if(result.code == 0){
                        that.findObjectInArrayAndDelete(item.id, "id", subList);
                    }
                });
        },
        /**
         * 切换显示楼中楼回复盒子
         * @param {any} index 行对象
         */
        toggleInsideReplytBox(item){
            this.$set(item, "boxShow", !item.boxShow);
            this.$forceUpdate();
        },
        /**
         * 页码改变事件
         * @param {number} page 页码
         */
        pageChange(page){
            const params = this.params;

            params.page = page;
            
            this.$router.push({
                query : {
                    page : page,
                    pageSize : params.pageSize
                }
            });
            this.rendeReplyList();
        }
    }
}
</script>

<style lang="scss" scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

    hr{
        width: 95%;
    }

    @media screen and (min-width:1200px) , (min-width:992px){
        .container{
            width: 960px;
        }
    }

    //  针对小屏幕特殊样式
    @media screen and (max-width:600px) {
        .container {
            padding: 0px;
        }
        .header{
            padding: 0px 25px !important;
        }
        // .article{
        //     padding: 0px 25px !important;
        // }
        .reply,.form,.reply-list{
            padding: 0px;
        }
        .inside-reply-list{
            margin: 10px;
        }
    }

    .article{

        header.article-bg{
            height: 24em;
            background: gray;
            background-size: cover !important;
            background-position: bottom !important;
            background-image: url("../assets/home/s75142.jpg");
            background-attachment: fixed;

            &>div.container > div{
                padding-top: 7em;
            }

            h1,h2{
                color: white; 
                left: 0; 
                right: 0;
                text-align: center;
                text-shadow: 1px 1px 8px #444;
            } 
        }

        div.content{
            background:white;
            margin: 30px 0px;
            box-shadow: 5px 5px 25px #dadada;

            &>header{
                padding:0px 50px;
                
                &>h2{
                   color: #555;
                    font-weight:bold;
                }

                &>h5{
                    color: #999;
                }
            }

            &>div.edit{
                float: left;
                width: 100%;
            }

            &>article{
                padding:0px 50px;
            }

            &>.like-and-share{

                padding:20px;

                .like-btn{
                    padding:3px 35px;
                    border-radius: 35px;
                }


                .like-icon{
                    margin:0px;
                    position: relative;
                }

                p:last-child{
                    margin:0px
                }
            }

            &>.reply{

                .reply-avatar{
                    padding: 5px;
                    text-align: center;

                    >div{
                        width: 40px;
                        height: 40px;
                        margin: 0px auto;
                        overflow: hidden;
                        >img{
                            width: inherit;
                        }
                    }
                    >button{
                        margin: 10px 0px;
                    }
                }

                .reply-reply-box{
                    .submit-warp{
                        padding:10px 15px 0px 0px;
                    }
                }
            }

            .reply-box{
                .user-info{
                    .user-avatar{
                        padding: 5px;
                        text-align: center;
                        >img{
                            width: 40px;
                            float:right;
                        }
                    }

                    .user-floor{
                        p{
                            &.name{
                                font-size:16px;
                            }
                            &.date{
                                color:#8492A6;
                            }
                        }
                    }
                }

                .reply-content{
                    padding: 25px;
                }

                .like-and-reply{
                    padding:20px;
                    color: #969696;
                    .like{
                        padding-right:0px;
                        cursor:pointer;
                        float:left;
                    }
                    .reply{
                        cursor:pointer;
                        padding-left:0px;
                        margin-left:10px;
                        float:left;
                    }
                }

                .inside-reply-list{
                    margin: 0px 0px 20px 20px;
                    color: #969696;
                    border-left: 2px solid #ccc;

                    &>div{
                        margin: 0px 0px 0px 20px;
                        
                        .date{
                            float:left;
                        }

                        div.reply{
                            cursor:pointer;
                            padding-left:0px;
                            margin-left:10px;
                            float:left;
                        }

                        div.trash{
                            cursor:pointer;
                            float: right;
                        }
                    }

                }
            }
        }

    }

</style>