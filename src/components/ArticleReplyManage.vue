<template>
    <div>
        <p class="alert top-alert">管理你的文章回复，蠢货<br />
            <font size="1">货蠢，回复文章的你理管</font>
        </p>
        <div class="row">
            <div class="col-sm-12">
                <div class="portlet">
                    <div class="portlet-title">
                        <div class="caption" style="color:#32c5d2;">
                            <i class="glyphicon glyphicon-user"></i>
                            <span> 文章回复管理 </span>
                        </div>
                    </div>
                    <div>
                        <superOperate :config="operateConfig"></superOperate>
                        <superTable ref="superTable" :config="tableConfig" @pageChange="getReplyList"></superTable>
                    </div>
                </div>
            </div>
        </div>
        <superModal :config="modalConfig"></superModal>
    </div>
</template>

<script>
import superOperate from "../components/common-component/superOperate.vue";
import superTable from "../components/common-component/superTable.vue";
import superModal from "../components/common-component/superModal.vue";
import { articleTypeList } from "../api/articleType.js";

export default {
    name: 'articleReplyManage',
    components: {
        superOperate,
        superTable,
        superModal
    },
    data(){
        return {
            tableConfig : {},
            operateConfig : {},
            modalConfig : {}
        }
    },
    mounted(){
        this.setTableConfig();
        this.setOperateConfig();
        this.setModalConfig();
        this.getReplyList();
    },
    computed:{

    },
    methods : {
        //  设置超级表格组件配置
        setTableConfig(){
            this.tableConfig = {
                checkbox : true,
                clickToSelect : true,
                colOption : [
                    {
                        field : "id",
                        label : "文章回复ID"
                    },
                    {
                        field : "floor",
                        label : "所属楼层"
                    },
                    {
                        field : "articleId",
                        label : "回复的文章的ID"
                    },
                    {
                        field : "ip",
                        label : "回复人IP"
                    },
                    {
                        field : "name",
                        label : "回复人名称"
                    },
                    {
                        field : "avatar",
                        label : "回复人头像"
                    },
                    {
                        field : "content",
                        label : "回复内容"
                    },
                    {
                        field : "reply",
                        label : "回复次数"
                    },
                    {
                        field : "like",
                        label : "点赞"
                    },
                    {
                        field : "show",
                        label : "是否显示"
                    },
                    {
                        field : "operate",
                        label : "操作",
                        jsxRender: (h, params) =>{
                            return (
                                <div>
                                    <button 
                                        class="btn btn-primary" 
                                        onClick={() => {
                                            this.openModal(params.row);
                                        }}
                                        >编辑</button>
                                </div>
                            )
                        }
                    }
                ],
                data : [],
                pagination : {
                    prevText : "前页",
                    nextText : "后页",
                    currentPage : 1,
                    pageSize : 10,
                    totalPages : 0
                }
            }
        },
        //  设置操作区域组件配置
        setOperateConfig(){
            this.operateConfig = {
                list : [
                    {
                        type : "dropdown",
                        text : "删除操作",
                        list : [
                            {
                                text : "删除文章回复",
                                events : {
                                    onClick : {
                                        fn : this.deleteArticleReply,
                                        params : [this.tableConfig]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        //  设置超级模态框组件配置
        setModalConfig(){
            this.modalConfig = {
                title : "编辑文章回复",
                backdrop : "static",
                form : {
                    config : [
                        {
                            labelText : "所属楼层",
                            field : "floor",
                            type : "text"
                        },
                        {
                            labelText : "回复的文章的ID",
                            field : "articleId",
                            type : "text"
                        },
                        {
                            labelText : "回复人IP",
                            field : "ip",
                            type : "text"
                        },
                        {
                            labelText : "回复人名称",
                            field : "name",
                            type : "text"
                        },
                        {
                            labelText : "回复人头像",
                            field : "avatar",
                            type : "text"
                        },
                        {
                            labelText : "回复内容",
                            field : "content",
                            type : "text"
                        },
                        {
                            labelText : "回复次数",
                            field : "reply",
                            type : "text"
                        },
                        {
                            labelText : "点赞",
                            field : "like",
                            type : "text"
                        },
                        {
                            labelText : "是否显示",
                            field : "show",
                            type : "text"
                        }
                    ],
                    data : {
                        floor : "",
                        articleId : "",
                        ip : "",
                        name : "",
                        avatar : "",
                        content : "",
                        reply : "",
                        like : "",
                        show : ""
                    }
                },
                footer: {
                    textalign : "center",
                    btnList : [
                        {
                            id : "edit",
                            show : true,
                            type : "primary",
                            text : "修改",
                            events : {
                                onClick : {
                                    fn : this.commonHandle,
                                    params : ["edit"]
                                }
                            }
                        }
                    ]
                },
                show : false
            }
        },
        /**
         * 打开编辑页面
         * @param {object} item 行对象
         */
        openModal(item){

            const modal = this.modalConfig;

            for(let i in item){
                (modal.form.data[i] = item[i]);
            }

            modal.show = true;
        },
        /**
         * 通用操作，处理模态框新增和编辑动作
         * @param {object} modalConfig 模态框配置
         * @param {string} type 类型
         */
        commonHandle(modalConfig, type){
            const that = this;
            const formData = modalConfig.form.data;
            let method = "post"
            let url = "reply";

            type == "edit" && (method = "put", url += `/${formData.id}`);

            that.$http[method](url, formData)
                .then( (result) =>{
                    that.$swal(result.detailMsg, "", "success");
                    modalConfig.show = false;
                    that.getReplyList();
                });

        },
        //  获取文章类型列表
        getReplyList(){

            this.$http({
                url: 'reply/list',
                method: 'post',
                data : {
                    page : this.tableConfig.pagination.currentPage,
                    pageSize : this.tableConfig.pagination.pageSize,
                    type : "admin"
                }
            }).then((result) =>{
                    this.tableConfig.data = result.data.rows;
                    this.tableConfig.pagination.totalPages = result.data.totalPages
                });

        },
        /**
         * 删除文章回复
         * @param {object} item 组件传回来的我也忘了是啥
         */
        deleteArticleReply(item){
            const checkedData = this.$refs.superTable.checkedData.map((item, index)=>{
                return item["id"]
            });

            this.$http.delete("article", {
                    data : {
                        arr : checkedData
                    }
                })
                .then( (result) =>{
                    that.$swal("删除文章成功", "", "success");
                    this.getReplyList();
                });
                
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-alert {
        background: #f5f8fd;
        color: #010407;
        border-left: 5px solid #8bb4e7;
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