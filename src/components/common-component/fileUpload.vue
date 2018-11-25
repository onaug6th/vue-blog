<template>
    <div v-bind:data-upload="src">
        <div class="imgBox">
            <img :src="src" />
        </div>
        <div class="upload">
            <i>选择图片</i>
            <input type="file" name="file" ref="file" @change="changeImg" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src : ""
        };
    },
    created() {

    },
    methods: {
        //  返回图片文件流对象
        getImg() {
            return this.$refs["file"].files[0];
        },
        //  改变图片
        changeImg() {
            var oFile = this.$refs["file"];
            this.src = this.getObjectURL(oFile.files[0]);
        },
        //  设置图片链接
        setImgUrl(val) {
            this.src = val;
        },
        //  获取图片地址
        getObjectURL(file) {
            const convertFn = window.URL.createObjectURL || window.createObjectURL || window.webkitURL.createObjectURL;
            return convertFn(file);
        }
    }
};
</script>

<style lang="scss" scoped>
.imgBox {
    float: left;
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    margin-right: 20px;

    img{
        width: 100%;
    }
}
.upload {
    position: relative;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    background-color: #fbfdff;
    overflow: hidden;

    &> input {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 99;
    }
}
</style>