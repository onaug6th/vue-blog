<template>

    <div ref="notFoundContainer" class="container">
        <h1>
            <span style="font-size: 80px;">404</span> NOT FOUND
        </h1>
        <h3>
            你来到了一个未知的世界
        </h3>
        <h5>
            <router-link to="/">回到首页？</router-link>
        </h5>
    </div>

</template>

<script>

export default {
    name : "notFound",
    data(){
        return {
            
        }
    },
    components:{
        
    },
    mounted() {
        
        this.$refs.notFoundContainer.style.minHeight = document.documentElement.clientHeight + "px";

    },
    methods:{
    }
}
</script>


<style lang="scss" scoped>

    .container{
        padding-top:4em;
    }
</style>
