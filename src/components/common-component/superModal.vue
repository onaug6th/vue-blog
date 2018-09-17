<template>

    <div ref="superModal" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" @click="closeModal()">&times;</button>
                    <h4 class="text-center"> {{config.title}} </h4>
                </div>
                <div class="modal-body clearfix">
                    <slot>

                    </slot>
                    <template v-if="config.form">
                        <form class="form-horizontal">
                            <template v-for="(item, index) in config.form.config">
                                <label class="col-sm-2" :key="index">
                                    {{ item.labelText }}
                                </label>
                                <template v-if="item.type == 'text'">
                                    <div class="col-sm-4" :key="index">
                                        <input class="form-control" v-model="config.form.data[item.field]">
                                    </div>
                                </template>
                            </template>
                        </form>
                    </template>

                </div>
                <div class="modal-footer">
                    <slot name="footer">

                    </slot>
                    <template v-if="config.footer">
                        <div :class="'text-' + config.footer.textalign">
                            <template v-for="(btn, index) in config.footer.btnList">
                                <button :key="index"
                                        class="btn btn-primary"
                                        @click="eventsTransfer('onClick', btn , config)"
                                        v-show="btn.show"
                                        >
                                    {{ btn.text }}
                                </button>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

export default {
    name: 'superModal',
    props: {
        config: {
            type: Object,
            required: true,
            default : {
                title : "",
                form : {},
                footer : {}
            }
        }
    },
    computed:{
        show(){
            return this.config.show;
        }
    },
    watch: {
        /**
         * 监听计算属性show的改变
         * @param {boolean} show show本人
         */
        show(show){
            const modal = this.$refs.superModal;
            const backdrop = this.config.backdrop;
            if(show){
                $(modal).modal({
                    backdrop : backdrop || 'static'
                });
            }else{
                $(modal).modal('hide');
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
    methods : {
        closeModal() {
            this.config.show = false;
            this.$emit("modalClose");
        }
    }
}
</script>

<style lang="scss" scoped>
    .form-group:nth-child( n+1 ){
        .btn{
            margin-right:10px; 
        }
    }
</style>