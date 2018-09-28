<template>
    <div ref="memoryContainer" class="container">
        <div class="memory-box col-sm-12 clearfix temp-bg">
            <div class="memory-box-photo">

            </div>
            <div class="memory-box-detail">
                <div class="form-group memory-box-icon">

                </div>
                <button class="btn btn-default">Read Detail</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'memory',
    computed: {
        token(){
            return this.$store.state.token;
        }
    },
    components : {
        
    },
    data () {
        return {
            memoryContainerRef : {}
        };
    },
    mounted () {
        this.memoryContainerRef = this.$refs.memoryContainer;
        //  计算高度
        this.countWindowHeight();
    },
    methods: {
        /**
         * 计算窗口高度并设置页面高度
         */
        countWindowHeight(){
            const windowHeight = document.documentElement.clientHeight;
            this.memoryContainerRef.style.minHeight = windowHeight + "px";
        }
    }
};
</script>

<style lang="scss" scoped>
    .memory{
        padding: 0px 10px 0px 10px;
        margin: 20px 0px 20px 0px;
        transition: 1s;
    }

    .memory:hover{
        transform:scale(1.02,1.02) ;
    }

    .memory-box{
        padding: 0px;
        background-size: cover !important;
        height:250px;
        box-shadow: -4px 0 4px rgba(7,17,27,.1),
                    4px 0 4px rgba(7,17,27,.1), 
                    0 -4px 4px rgba(7,17,27,.1),
                    0 4px 4px rgba(7,17,27,.1);
    }

    .memory-box-photo{
        height:60%;
        background-size:cover !important; 
    }

    .memory-box-detail{
        height: 40%;
        padding: 0px 15px 0px 15px;
        background: rgba(255, 255, 255, 0.7);
    }

    .memory-box-icon{
        padding: 10px;
        font-size: 20px;
    }

    .temp-bg{
        background:url('http://oz1y7s5ij.bkt.clouddn.com/images/common/memory.JPG')
    }
</style>
