<template>
    <footer class="container-fluid">
        <div class="row">
            <p>
                <span class="glyphicon glyphicon-piggy-bank" @click="newWorld()"></span>
            </p>
            <h4>© 2018 onaug6th. All rights reserved.</h4>
        </div>
    </footer>
</template>

<script>


export default {
    name: 'superFooter',
    components: {
        
    },
    mounted(){
    },
    data(){
        return {
            
        }
    },
    computed:{

    },
    methods : {
        /**
         * 进入新世界
         */
        newWorld(){
            this.$swal("你好，没事多点点我");
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
}
</style>