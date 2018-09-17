<template>

    <div class="tool-bar form-group">
        <template v-for="(item, index) in config.list">

            <template v-if="item.type == 'button'">
                <button class="btn btn-success" @click="eventsTransfer('onClick', item, item)" :key="index">
                    <i class="glyphicon glyphicon-refresh"></i>{{ item.text }}
                </button>
            </template>

            <template v-else-if="item.type == 'dropdown'">
                <li class="btn btn-primary" style="background:black;" :key="index">
                    <a class="dropdown-toggle" data-toggle="dropdown" style="color:white">
                        {{ item.text }}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li v-for="(li, i) in item.list" :key="i">
                            <a @click="eventsTransfer('onClick', li , li)">
                                {{ li.text }}
                            </a>
                        </li>
                    </ul>
                </li>
            </template>
        </template>
    </div>

</template>

<script>

export default {
    name: 'superOperate',
    props: {
        config: {
            type: Object,
            required: true,
            default : {
                colOption : [],
                data : []
            }
        }
    },
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
        
    }
}
</script>

<style lang="scss" scoped>
    .form-group:nth-child( n+1 ){
        .btn{
            margin-right:10px; 
        }
    }
    .btn-primary .dropdown-menu{
        top:100px;
        left:inherit;
    }
</style>