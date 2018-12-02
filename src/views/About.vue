<template>

    <div class="container">

        <div class="row">
            <h2 class="about">关于</h2>
            <hr>
            <div class="col-sm-12 clearfix" style="margin-bottom:25px;">
                <div class="pull-left">
                    <img class="img-circle" src="https://avatars1.githubusercontent.com/u/24285577?s=460&v=4" style="max-width: 44px;">
                </div>
                <div class="col-xs-8">
                    <p style="color: #616161;font-weight:bold">onaug6th</p>
                    <span>2018-08-06</span>
                </div>
            </div>
            <div class="content col-sm-12">
                <div class="gray">
                    
                    <h2>
                        <span>关于我</span>
                    </h2>

                    <p>
                        <span>onaug6th</span>
                    </p>

                    <p>
                        <span>意思是在八月的六号</span>
                    </p>

                    <hr>

                    <p>
                        <span>
                            喜欢javascript，喜欢node，<br>
                            喜欢运动，喜欢玩游戏<br>
                        </span>
                    </p>

                    <p>一个很纯粹的人</p>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

export default {
    name : "about",
    data(){
        return {
            
        }
    },
    components:{
        
    },
    mounted() {
        

    },
    methods:{
    }
}
</script>


<style lang="scss" scoped>

    .container{
        margin-top: 3em;
    }

    .container > .row{
        background:white;
        margin: 30px 0px;
        box-shadow: 5px 5px 25px #dadada;
        padding:15px;
    }

    h2.about{
        color: #616161;
        font-weight:bold;
        margin:10px 0px 20px 10px;
    }

    .content .gray{
        color:#555555
    }

    @media screen and (min-width:1200px) , (min-width:992px){
        .container{
            width: 960px;
        }
    }
    @media screen and (max-width:600px) {
        .container {
            padding: 0px;
        }
        .header{
            padding: 0px 25px !important;
        }
        .article{
            padding: 0px 25px !important;
        }
    }

</style>
