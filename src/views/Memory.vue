<template>
    <div class="memory-container container">
        <div class="memory-box col-sm-12 clearfix temp-bg">
            <div class="photo">

            </div>
            <div class="detail">
                <h3>纪念，毕业生</h3>
                <h5>像做了一场梦</h5>
                <hr>
                <button class="btn btn-default" @click="watchMemory()">Read Detail</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'memory',
    computed: {
    },
    components : {
        
    },
    data () {
        return {
        };
    },
    mounted () {
    },
    methods: {
        watchMemory(){
            this.$swal("印象还没准备好");
        }
    }
};
</script>

<style lang="scss" scoped>

    .memory-container{
        padding-top : 5em;
    }

    @media screen and (min-width:1200px) , (min-width:992px){
        .container{
            width: 960px;
        }
    }

    .memory-box{
        padding: 0px;
        background-size: cover !important;
        height:400px;
        transition: 0.75s;
        box-shadow: -4px 0 4px rgba(7,17,27,.1),
                    4px 0 4px rgba(7,17,27,.1), 
                    0 -4px 4px rgba(7,17,27,.1),
                    0 4px 4px rgba(7,17,27,.1);

        &:hover{
            transform:scale(1.02,1.02) ;
        }

        .photo{
            height:60%;
            background-size:cover !important; 
        }

        .detail{
            height: 40%;
            padding: 10px 15px 0px 15px;
            background: rgba(255, 255, 255, 0.7);
            
            hr{
                margin-bottom: 5px;
            }

            .icon{
                padding: 10px;
                font-size: 20px;
            }

        }
    }

    .temp-bg{
        background:url('https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/memory/memory.JPG')
    }
    
</style>
