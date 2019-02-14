<template>
    <footer class="container-fluid">
        <div class="row">
            <p>
                <span class="glyphicon glyphicon-piggy-bank" title="你好啊" @click="newWorld()"></span>
            </p>
            <h5>2017-{{new Date().getFullYear()}} onaug6th.com</h5>
        </div>
    </footer>
</template>

<script>


export default {
    name: 'superFooter',
    components: {
        
    },
    mounted() {
    },
    data() {
        return {
            
        }
    },
    computed: {

    },
    methods: {
        /**
         * 进入新世界
         */
        newWorld(){
            this.$swal("你好，没事多点点其他地方");
        }
    }
}
</script>

<style lang="scss" scoped>
    footer{
        color: #555;
        height:120px;
        box-shadow: 0 0 25px #ccc;
        text-align: center;
        padding-top: 2rem;

        h5{
            font-size: 16px;
        }
    }
</style>