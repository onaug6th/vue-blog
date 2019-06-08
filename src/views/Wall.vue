<template>
    <div ref="wallContainer" class="wall-container container-fluid">
        <div class="container">
            <div>
                <button class="btn btn-default" @click="newStickyNote()" style="color:#555">
                    <span class="glyphicon glyphicon-pencil"></span> 贴纸条
                </button>
            </div>

            <template v-for="(item,index) in stickNoteList">
                <div :key="index" class="sticky-note col-sm-6 col-md-3" @click="openStickyNote(item)" :title="item.title">
                    <h4 class="title">{{ item.title }}</h4>
                    <h5 class="name">{{ item.name }}</h5>
                    <h5 class="intro">{{ item.intro }}</h5>
                    <h5 class="reply text-right">
                        <span v-if="item.reply"><img class="emoji" alt="star2" height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/speech_balloon.png"></span>
                    </h5>
                    <h5 class="text-right">{{ item.createdAt }}</h5>
                </div>
            </template>

        </div>

        <transition name="fadefast">
            <div v-if="showModal" id="new-stickyNote" class="modal" role="dialog" style="display: block;" @click="closeModal($event)">
                <div class="modal-dialog" role="document">

                    <div class="modal-content">
                        <div class="modal-body">
                            <button class="close" @click="closeModal()">&times;</button>
                            <div class="stickyNote-content-top">
                                <div class="form-group" title="标题">
                                    <input v-if="isEdit" type="text" class="hidden-input require-input" style="font-size:30px;"
                                        placeholder="标题" v-model="stickyNote.title" />
                                    <span v-else class="hidden-input" style="font-size: 30px;">
                                        {{ stickyNote.title }}
                                    </span>
                                </div>
                                <div class="form-group" title="作者">
                                    <input v-if="isEdit" type="text" class="hidden-input require-input"
                                        placeholder="作者" v-model="stickyNote.name" />
                                    <span v-else class="hidden-input">
                                        {{ stickyNote.name }}
                                    </span>
                                </div>
                                <div class="form-group" title="介绍">
                                    <input v-if="isEdit" type="text" class="hidden-input" title="介绍"
                                        placeholder="介绍" v-model="stickyNote.intro" />
                                </div>
                            </div>
                            <div class="stickyNote-content-mid">
                                <div class="form-group">

                                    <textarea v-if="isEdit" type="text" class="hidden-input require-input" title="正文"
                                        style="width:100%;" rows="10" v-model="stickyNote.content"
                                        placeholder="正文">
                                    </textarea>
                                    <template v-else>
                                        <p style="min-height: 240px;" class="hidden-input">
                                            {{ stickyNote.content }}
                                        </p>
                                    </template>
                                    
                                    <template v-if="stickyNote.reply">
                                        <h4>回复：</h4>
                                        <p>
                                            {{stickyNote.reply}}
                                        </p>
                                    </template>
                                </div>
                            </div>
                            <div class="stickyNote-content-bottom">
                                <div class="form-group text-center">
                                    <h5 class="text-right" style="font-weight:100;">{{stickyNote.createdAt}}</h5>
                                    <button v-if="isEdit" class="btn btn-success" style="font-weight: 100;" @click="submitStickyNote()">贴上墙</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </transition>

        <transition name="fadefast">
            <div class="modal-backdrop in" v-if="showModal"></div>
        </transition>

        <!--底部分页按钮-->
        <pagination class="clearfix" :config="paginationConfig" @pageChange="pageChange"></pagination>
        <!--底部分页按钮-->
    </div>
</template>

<script>
import pagination from "../components/pagination";

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
                pageSize : 8,
                prevText : "前页",
                nextText : "后页",
                totalPages : 0
            },
            //  外边区域索引
            wallContainerRef : {},
            //  展示模态框
            showModal : false,
            //  是否编辑
            isEdit : false,
            //  纸条内容
            stickyNote : {
                title : "",
                name : "",
                intro : "",
                content : "",
                createdAt : ""
            },
            //  纸条列表
            stickNoteList: []
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
    beforeDestroy(){
        //  取消监听滚动事件
        window.removeEventListener('resize', this.countWindowHeight);
    },
    methods: {
        /**
         * 计算窗口高度并设置页面高度
         */
        countWindowHeight(){
            const windowHeight = document.documentElement.clientHeight;
            this.wallContainerRef.style.minHeight = windowHeight + "px";
        },
        /**
         * 打开纸条
         * @param {object} item 那张纸条
         */
        openStickyNote(item){
            this.stickyNote = item;
            this.isEdit = false;
            this.showModal = true;
        },
        closeModal(event){
            (!event || event.target.id == "new-stickyNote") && (this.showModal = false);
        },
        //  写新纸条
        newStickyNote(){
            this.stickyNote = {};
            this.isEdit = true;
            this.showModal = true;
        },
        //  发布新贴纸
        submitStickyNote(){
            const that = this;
            let isPass = true;
            const stickyNote = this.stickyNote;

            (!stickyNote.title || !stickyNote.name || !stickyNote.content) && (isPass = false, this.$swal("标题，作者，内容都是必填的。"));

            if(isPass){

                const params = {
                    name : stickyNote.name,
                    title : stickyNote.title,
                    intro : stickyNote.intro,
                    content : stickyNote.content
                }

                this.$http.post("wall", params).then((result) =>{
                    this.$swal(result.detailMsg, "", "success");
                
                    if(result.code == 0){
                        this.$set(this.paginationConfig, "page" , this.paginationConfig.totalPages);
                        that.showModal = false;
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
        background-image:url('https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/wall/tiebgbg.jpg');
        background-size: 100% 100%; 
        padding-top:4em;

        //  纸片样式
        .sticky-note{
            height:400px;
            background:url('https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/wall/tiebg.png') no-repeat;
            padding: 6em 3em;
            background-size:100% 85%;
            background-position: center;
            cursor: pointer;

            .title{
                height: 10%; 
                white-space: nowrap; 
                text-overflow: ellipsis; 
                overflow: hidden;
            }
            .name{
                height: 10%;
                white-space: nowrap;
                text-overflow: ellipsis; 
                overflow: hidden;
            }
            .intro{
                height: 50%;
                overflow: hidden;
            }
            .reply{
                height: 10%;
            }
        }

        //  模态框，内容区域
        #new-stickyNote {
            .modal-content{
                background: url('https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/wall/tieeditbg.png') no-repeat;
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
            font-size: 16px;
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
    }
</style>
