<template>
    <div>
        <p class="alert top-alert">管理你的文章，蠢货<br />
            <font size="1">货蠢，类分章文的你理管</font>
        </p>
        <div class="row">
            <div class="col-sm-12">
                <div class="portlet">
                    <div class="portlet-title">
                        <div class="caption" style="color:#32c5d2;">
                            <i class="glyphicon glyphicon-user"></i>
                            <span> 文章管理 </span>
                        </div>
                    </div>
                    <div>
                        <superOperate :config="operateConfig"></superOperate>
                        <superTable ref="superTable" :config="tableConfig" @pageChange="getArticleList"></superTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import superOperate from "../components/common-component/superOperate.vue";
import superTable from "../components/common-component/superTable.vue";
import { articleTypeList } from "../api/articleType.js";

export default {
    name: 'articleManage',
    components: {
        superOperate,
        superTable
    },
    data(){
        return {
            tableConfig : {},
            operateConfig : {}
        }
    },
    mounted(){
        this.setTableConfig();
        this.setOperateConfig();
        this.getArticleList();
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
                        label : "文章ID"
                    },
                    {
                        field : "type",
                        label : "文章所属类型"
                    },
                    {
                        field : "title",
                        label : "文章标题"
                    },
                    {
                        field : "bgUrl",
                        label : "背景图片"
                    },
                    {
                        field : "read",
                        label : "阅读量"
                    },
                    {
                        field : "like",
                        label : "点赞"
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
                                            this.openEdit(params.row, "edit");
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
                                text : "删除文章",
                                events : {
                                    onClick : {
                                        fn : this.deleteArticle,
                                        params : [this.tableConfig]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        /**
         * 打开编辑页面
         * @param {object} item 行对象
         */
        openEdit(item){
            this.$router.push({
                path : `/articleEdit`,
                query : {
                    article : item
                }
            });
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
            let url = "articleType";

            type == "edit" && (method = "put", url += `/${formData.id}`);

            that.$http[method](url, formData)
                .then( (result) =>{
                    that.$swal("不知道什么操作成功", result.detailMsg, "success");
                    modalConfig.show = false;
                    that.getArticleList();
                });

        },
        //  获取文章类型列表
        getArticleList(){
            
            this.$http({
                url: 'article/list',
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
         * 删除文章
         * @param {object} item 组件传回来的我也忘了是啥
         */
        deleteArticle(item){
            const checkedData = this.$refs.superTable.checkedData.map((item, index)=>{
                return item["id"]
            });

            this.$http.delete("article", {
                    data : {
                        arr : checkedData
                    }
                })
                .then( (result) =>{
                    this.$swal("删除文章成功", result.detailMsg, "success");
                    this.getArticleList();
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