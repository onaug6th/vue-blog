<template>
    <div ref="wallContainer" class="wall-container container-fluid">
        <div class="container">
            <div>
                <button class="btn btn-default" @click="newStickyNote()" style="color:#555">
                    <span class="glyphicon glyphicon-pencil"></span> 贴纸条
                </button>
            </div>

            <template v-for="(item,index) in stickNoteList">
                <div :key="index" class="sticky-note col-sm-3" @click="openStickyNote(item)">
                    <h4 style="height:10%">{{ item.title }}</h4>
                    <h5 style="height:10%">{{ item.name }}</h5>
                    <h5 style="height:60%">{{ item.intro }}</h5>
                    <h5 class="text-right">{{ item.createdAt }}</h5>
                </div>
                <li v-if="token" class="btn btn-primary" style="background:black;" :key="index">
                    <a class="dropdown-toggle" data-toggle="dropdown" style="color:white">
                        操作
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a @click="commonHandle(item, 'delete')">
                                删除
                            </a>
                            <a @click="commonHandle(item, 'hide')">
                                隐藏
                            </a>
                        </li>
                    </ul>
                </li>
            </template>

        </div>

        <div ref="stickModal" id="new-stickyNote" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button class="close" data-dismiss="modal">&times;</button>
                        <div class="stickyNote-content-top">
                            <div class="form-group">
                                <input type="text" class="hidden-input" title="标题" style="font-size:30px;"
                                    :placeholder="isReadOnly ? '' : '请输入你的标题'" v-model="stickyNote.title" data-field="标题" :readonly="isReadOnly" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="hidden-input" title="名称"
                                    :placeholder="isReadOnly ? '' : '作者'" v-model="stickyNote.name" data-field="作者" :readonly="isReadOnly" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="hidden-input" title="介绍"
                                    :placeholder="isReadOnly ? '' : '简单介绍'" v-model="stickyNote.intro" data-field="简单介绍" :readonly="isReadOnly" />
                            </div>
                        </div>
                        <div class="stickyNote-content-mid">
                            <div class="form-group">
                                <textarea type="text" class="hidden-input require-input" title="正文"
                                    :placeholder="isReadOnly ? '' : '正文'" style="width:100%;" rows="10" v-model="stickyNote.content"
                                    data-field="正文" :readonly="isReadOnly"></textarea>
                            </div>
                        </div>
                        <div class="stickyNote-content-bottom">
                            <div class="form-group text-center">
                                <h5 class="text-right" style="font-weight:100;font-family:'微软雅黑';">{{stickyNote.createdAt}}</h5>
                                <button v-if="!isReadOnly" class="btn btn-success" style="font-weight: 100;" @click="submitStickyNote()">贴上墙</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--底部分页按钮-->
        <pagination :config="paginationConfig" @pageChange="pageChange"></pagination>
        <!--底部分页按钮-->
    </div>
</template>

<script>
import pagination from "../components/common-component/pagination";

export default {
    name: 'wall',
    computed:{
        token(){
            return this.$store.state.token;
        }
    },
    components : {
        pagination
    },
    data () {
        return {
            //  分页配置
            paginationConfig : {
                page : 1,
                pageSize : 10,
                prevText : "前页",
                nextText : "后页",
                currentPage : 1,
                totalPages : 0
            },
            //  外边区域索引
            wallContainerRef : {},
            //  是否只读
            isReadOnly : false,
            //  纸条内容
            stickyNote : {
                title : "",
                name : "",
                anonymous : "",
                intro : "",
                content : "",
                createdAt : ""
            },
            //  纸条列表
            stickNoteList:[]
        };
    },
    mounted () {
        this.wallContainerRef = this.$refs.wallContainer;
        //  监听页面窗口改变事件
        window.addEventListener('resize', this.countWindowHeight);
        //  获取纸片列表
        this.getStickyNoteList();
        //  计算高度
        this.countWindowHeight();
    },
    methods: {
        /**
         * 计算窗口高度并设置页面高度
         */
        countWindowHeight(){
            const windowHeight = document.documentElement.clientHeight;
            this.wallContainerRef.style.height = windowHeight + "px";
        },
        /**
         * 打开纸条
         * @param {object} item 那张纸条
         */
        openStickyNote(item){
            this.stickyNote = item;
            this.isReadOnly = true;
            $("#new-stickyNote").modal('show');
        },
        //  写新纸条
        newStickyNote(){
            $("#new-stickyNote").modal('show');
            this.stickyNote = {};
            this.isReadOnly = false;
        },
        //  发布新贴纸
        submitStickyNote(){
            const that = this;
            let isPass = true;

            $(".require-input").each((index, item) => {
                if (item.content === "") {
                    that.$swal(item.attributes['data-field'].value + "不能为空", "", "info");
                    isPass = false;
                    //  return false退出循环
                    return false;
                }
            });

            if(isPass){
                const stickyNote = this.stickyNote;

                const params = {
                    name : stickyNote.name,
                    title : stickyNote.title,
                    intro : stickyNote.intro,
                    content : stickyNote.content
                }

                this.$http.post("wall", params).then((result) =>{
                    this.$swal(result.detailMsg, "", "success");
                
                    if(result.code == 0){
                        this.$set(this.paginationConfig, "currentPage" , this.paginationConfig.totalPages);
                        $("#new-stickyNote").modal('hide');
                        this.stickyNote = {};
                        this.getStickyNoteList();
                    }
                });
            }
        },
        //  获取贴纸列表  
        getStickyNoteList(){
            const that = this;

            that.$http.post("wall/list", {
                page : that.paginationConfig.page,
                pageSize : that.paginationConfig.pageSize,
            }).then((result) =>{

                if(result.code == 0){
                    that.paginationConfig.totalPages = result.data.totalPages;
                    that.stickNoteList = result.data.rows;
                }

            });

        },
        /**
         * 通用操作
         * @param {object} item 行对象
         * @param {string} type 类型    
         */
        commonHandle(item, type){
            const that = this;
            let method = "delete";
            let url = `wall/${item.id}`;
            let params = {
                ...item
            }
            
            if(type == "delete"){
                method = "delete";
            }else{
                method = "put";
                params.show = "0";
                params.include = ["show"];
            }

            that.$http[method](url, params)
                .then( (result) =>{
                    that.$swal(result.detailMsg, "", "success");
                    that.getStickyNoteList();
                });
        },
        /**
         * 页码改变事件
         * @param {number} page 野马
         */
        pageChange(page){
            const paginationConfig = this.paginationConfig;

            paginationConfig.page = page;
            
            this.$router.push({
                query : {
                    page : page,
                    pageSize : paginationConfig.pageSize
                }
            });
            this.getStickyNoteList();
        }
    }
};
</script>

<style lang="scss">
    .wall-container{
        background-image:url(http://oz1y7s5ij.bkt.clouddn.com/images/common/tiebgbg.jpg);
        background-size: 100% 100%; 
        padding-top:4em;

        //  纸片样式
        .sticky-note{
            height:400px;
            background:url('http://oz1y7s5ij.bkt.clouddn.com/images/common/tiebg.png') no-repeat;
            padding: 6em 3em;
            background-size:100% 85%;
            background-position: center;
            cursor: pointer;
        }

        //  模态框，内容区域
        #new-stickyNote {
            .modal-content{
                background: url('http://oz1y7s5ij.bkt.clouddn.com/images/common/tieeditbg.png') no-repeat;
                background-position: center;
                box-shadow: none;
                border: none;
            }

            .modal-body {
                padding: 4em 7em;
            }
        }
        
        //  媒体查询啦
        @media screen and (max-width:768px) {
            #new-stickyNote .modal-body {
                padding: 4em 12em;
            }
        }
        //  媒体查询啦
        @media screen and (max-width:600px) {
            #new-stickyNote .modal-body {
                padding: 6em 3em;
            }
            .container-fuild{
                height: auto !important;
                background-size: 100% 100% !important;
            }
        }
        //  隐藏控件
        .hidden-input{
            background: none; 
            border: none;
            font-weight: 100; 
            font-size: 18px;
        }
        //  纸片类型
        .sticky-note-type{
            position: absolute; 
            top: 0; 
            right: 0; 
            color: #999; 
            padding: 3px 10px; 
            background: #f1f1f1; 
            font-size: 14px;
        }
        
        .btn-primary .dropdown-menu{
            top:100px;
            left:inherit;
        }
    }
</style>
