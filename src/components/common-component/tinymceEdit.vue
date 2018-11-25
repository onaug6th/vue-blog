<template>
    <div class="tinymce-warp">
        <textarea id="tinymceEditer" class="tinymce-textarea"></textarea>
        <div class="editor-custom-btn-container">
            <tinymceUpload @uploadSuccess="uploadSuccess" color="#1890ff" class="editor-upload-btn" />
        </div>
    </div>
</template>

<script>
//  富文本编辑器
import tinymce from "tinymce";
//  自己写的上传插件
import tinymceUpload from "./tinymceUpload";

export default {
    name: "tinymceEdit",
    components: {
        tinymceUpload
    },
    mounted() {
        this.init();
    },
    beforeDestroy(){
        try{
            this.destroyedTinymce();
        }catch(e) {
            console.info("？？？富文本还没生成，拿什么来摧毁？")
        }
    },
    props: {
        value: {
            type : String,
            default : ""
        }
    },
    watch: {
        //  双向绑定，接收值
        value(val){
            if(val){
                try {
                    this.tinymceEditor
                        .setContent(val);
                } catch (error) {
                    console.info("？？？富文本还没生成，拿什么来绑定？")
                }
            }
        }
    },
    data() {
        return {
            tinymceEditor : {},
            //  图片数组，用于记录新建文章时上传的文件的信息
            picArr : []
        };
    },
    computed: {},
    methods: {
        init() {
            this.$nextTick(() => {
                const that = this;
                let height = document.body.offsetHeight - 300;
                window.tinymce.baseURL = '/example/dependence/tinymce';
                window.tinymce.suffix = '.min';
                
                tinymce.init({
                    selector: "#tinymceEditer",
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: "zh_CN.GB2312",
                    menubar: "edit insert view format table tools",
                    plugins: [
                        "advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools",
                        "searchreplace visualblocks visualchars code fullpage",
                        "insertdatetime media nonbreaking save table contextmenu directionality",
                        "emoticons paste textcolor colorpicker textpattern imagetools codesample"
                    ],
                    toolbar1:
                        " newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample",
                    autosave_interval: "20s",
                    image_advtab: true,
                    table_default_styles: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    setup: function(editor) {
                        that.tinymceEditor = editor;

                        editor.on("init", function(e) {
                            if(that.value){
                                editor.setContent(that.value);
                            }
                            else if (localStorage.editorContent) {
                                editor.setContent(localStorage.editorContent);
                            }
                        });

                        editor.on("change", function(e) {
                            const value = editor.getContent();
                            localStorage.editorContent = value;
                            //  双向绑定更新事件
                            that.$emit("input", value);
                        });
                    }
                });
            });
        },
        getTinymceContent(){
            return this.tinymceEditor.getContent();
        },
        destroyedTinymce() {
            this.tinymceEditor.destroy();
        },
        /**
         * 上传成功回调
         * @param { object } pic 文件信息
         */
        uploadSuccess(pic){
            this.picArr.push(pic);
            this.tinymceEditor.insertContent(`<img class="wscnph" src="${pic.url}" >`);
        }
    }
};
</script>

<style lang="scss" scoped>
    .tinymce-warp{
        position: relative;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
    }
    .editor-upload-btn {
        display: inline-block;
    }
</style>