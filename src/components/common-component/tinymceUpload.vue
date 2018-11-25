<template>
    <div class="upload-container">
        <button type="button" class="btn btn-xs btn-primary" @click="toggleModal()">
            上传图片
        </button>
        <superModal :config="modalConfig">
            <form class="form-horizontal">
                <div class="form-group col-sm-12">
                    <fileUpload ref="file"></fileUpload>
                </div>
            </form>
            <template slot="footer">
                <button type="button" class="btn btn-primary" @click="uploadPicture()">确定</button>
            </template>
        </superModal>
    </div>
</template>

<script>
//  超级模态框
import superModal from './superModal';
//  文件上传
import fileUpload from "../../components/common-component/fileUpload";

export default {
    name: 'tinymceUpload',
    components: {
        superModal,
        fileUpload
    },
    mounted(){
    },
    data(){
        return {
            modalConfig : {}
        }
    },
    computed:{

    },
    methods : {
        toggleModal(){
            this.$set(this.modalConfig, "show" , !this.modalConfig.show);
        },
        uploadPicture(){
            const that = this;
            const formData = new FormData();

            formData.append("articleImg", that.$refs["file"].getImg());

            that.$http.post("upload/articleImg", formData).then(result =>{
                that.$emit("uploadSuccess", result.data);
                that.toggleModal();
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>