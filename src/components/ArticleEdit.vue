<template>

    <div class="edit-container container-fluid">
        <form>

            <div class="form-group">
                <label>title</label>
                <input type="text" class="form-control" placeholder="title" v-model="formData.title">
            </div>
            
            <div class="form-group">
                <label>intro</label>
                <input type="text" class="form-control" placeholder="intro" v-model="formData.intro">
            </div>

            <div class="form-group">
                <label>type</label>
                <select name="" class="form-control" v-model="formData.type">
                    <option v-for="(option,index ) in typeList" :key="index" :value="option.id">{{ option.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label>background-image</label>
                <fileUpload ref="file"></fileUpload>
            </div>

            <div class="form-group">
                <label>content</label>
                <tinymceEdit ref="tinymceEdit" v-model="formData.content"></tinymceEdit>
            </div>

            <div class="form-group">
                <label>show</label>
                <select class="form-control">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label>read</label>
                <input type="text" class="form-control" placeholder="read" v-model="formData.read">
            </div>

            <div class="form-group">
                <label>like</label>
                <input type="text" class="form-control" placeholder="like" v-model="formData.like">
            </div>

        </form>
        <div class="form-group">

            <button class="btn btn-primary" @click="add()" v-if="type == 'add'">新增</button>
            <button class="btn btn-primary" @click="save()" v-if="type == 'edit'">保存</button>

        </div>
    </div>
</template>

<script>
//  富文本编辑器
import tinymceEdit from "../components/common-component/tinymceEdit";
//  文件上传
import fileUpload from "../components/common-component/fileUpload";
//  接口
import { articleTypeList } from "../api/articleType.js";

export default {
    name: "articleEdit",
    components: {
        tinymceEdit,
        fileUpload
    },
    mounted(){
        //  判断是否通过编辑页面进入
        const query = this.$route.query;
        if( query.article ){
            this.type = "edit";
            this.getArticle(query.article.id);
        }else{
            this.type = "add";
        }

        //  获取文章类型列表
        articleTypeList().then( (result) =>{
            this.typeList = result.data.rows;
        });
    },
    data() {
        return {
            //  页面类型
            type: "edit",
            //  文章类型列表
            typeList: [],
            //  表单绑定数据
            formData: {
                title: "",
                intro: "",
                type: "",
                bgUrl: "",
                content: "",
                show: "",
                read: "",
                like: ""
            }
        };
    },
    methods: {
        /**
         * 获取文章信息
         * @param {string} id id
         */
        getArticle(id){
            
            this.$http.get(`article/${id}`).then((result) =>{
                if(result.code == 0 ){
                    for(let i in result.data){
                        this.formData[i] = result.data[i];
                    }
                    this.$refs["file"].setImgUrl(result.data.bgUrl);
                }
            });

        },
        /**
         * 新增文章
         * 表单数据与图片需要分开保存
         */
        add() {
            const that = this;

            //  先保存文章，获取文章id
            that.$http.post("article", that.formData).then((res)=>{
                
                //  如果上传了照片
                if(that.$refs["file"].getImg()){
                    that.saveBackGroundImg(res).then((result)=>{
                        
                        that.$swal("新建文章成功", "", "success");

                    });
                }
                
                const picArr = that.$refs["tinymceEdit"].picArr;
                //  说明在新增文章时，已经上传过照片
                if(picArr.length > 0){
                    const picIdArr = picArr.map((item, index)=>{
                        return item.id;
                    });
                    const param = {
                        id : picIdArr,
                        articleId : res.data.id
                    }
                    that.updateArticlePictureId(param);
                    that.$swal("文章的内容图片也上传成功了", result.detailMsg, "success");
                }
            });

        },
        /**
         * @method 更新文章图片的ID
         * @param { object } param 对象
         */
        updateArticlePictureId(param){

            this.$http.put(`articlePicture/id`, param).then((result) =>{
                if( result ){
                    console.info("新增文章时，更新文章图片的文章id索引成功");
                }
            });
        },
        /**
         * 保存背景图片
         * @param { object } res 图片归属的文章信息
         */
        saveBackGroundImg(res){
            const formData = new FormData();

            formData.append("articleId", res.data.id);
            formData.append("bgImg", this.$refs["file"].getImg());

            return this.$http.post("upload/bgImg", formData);
        },
        //  清空表单数据
        emptyFormData(){
            for(let i in this.formData){
                this.formData[i] = "";
            }
        },
        //  编辑文章保存
        save() {
            const params = {
                ...this.formData,
                exclude : []
            };
            
            this.$http.put(`article/${this.formData.id}`, params).then((result) =>{
                this.$swal("保存编辑文章成功", result.detailMsg, "success");
                if(result.code == 0){
                    this.isEdit = false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .edit-container {
        padding-top: 4em;
    }
</style>
