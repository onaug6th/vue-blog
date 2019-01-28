<template>

    <div class="switch"
        :class="otherSize(config.size)"
        >
        <div class="switch-animate"
            :class="{
                'switch-on': config.isChecked,
                'switch-off': !config.isChecked
            }"
            @click="toggleSwitch()">
            <span class="switch-left">{{ config.onText }}</span>
            <label>&nbsp;</label>
            <span class="switch-right">{{ config.offText }}</span>
        </div>
    </div>

</template>

<script>

export default {
    name: "superSwitch",
    props: {
        config: {
            type: Object,
            default(){
                return {
                    onText: "on",
                    offText: "off"
                }
            }
        }
    },
    methods:{
        toggleSwitch(){
            this.$emit("switchChange", !this.config.isChecked);
        },
        otherSize(size){
            return ['sm','xs'].includes(size) ? size : '';
        }
    }
}
</script>


<style lang="scss" scoped>

    .switch{
        display: inline-block;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
        position: relative;
        text-align: left;
        overflow: hidden;
        line-height: 8px;
        user-select: none;
        min-width: 90px;

        // 小尺寸
        &.sm{
            min-width: 70px;

            >div{

                span,label{
                    padding-top: 2px;
                    padding-bottom: 2px;
                }

            }
        }

        & > div {
            display: inline-block;
            width: 150%;
            position: relative;
            top: 0;

            &.switch-on {
                left: 0%;
            }

            &.switch-off {
                left: -50%;
            }

            &.switch-animate {
                transition: left 0.5s;
            }

            label {
                text-align: center;
                margin-top: -1px;
                margin-bottom: -1px;
                z-index: 100;
                width: 34%;
                color: #ffffff;
                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
                background-color: #f5f5f5;
                background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
                background-repeat: repeat-x;
                border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                display: inline-block;
                height: 100%;
                padding-bottom: 4px;
                padding-top: 4px;
                font-size: 14px;
                line-height: 20px;
            }

            span {
                text-align: center;
                z-index: 1;
                width: 33%;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                display: inline-block;
                height: 100%;
                padding-bottom: 3px;
                padding-top: 3px;
                font-size: 14px;
                line-height: 20px;

                &.switch-left {
                    border-bottom-left-radius: 4px;
                    border-top-left-radius: 4px;
                    color: #ffffff;
                    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
                    background-color: #409eff;
                    background-repeat: repeat-x;
                    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
                }

                &.switch-right {
                    color: #333333;
                    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
                    background-color: #f0f0f0;
                    background-image: linear-gradient(to bottom, #e6e6e6, #ffffff);
                    background-repeat: repeat-x;
                    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
                }
            }
        }

    }
    
</style>
