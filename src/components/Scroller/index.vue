<template>
    <div class="wrapper" ref="wrapper">
<!--        插槽-->
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "Scroller",
        props : {
            handleToScroll: {
                type: Function,
                default: function () {}
            },
            handleToTouchEnd: {
                type: Function,
                default: function () {}
            }
        },
        mounted() {
            var scroll = new BScroll(this.$refs.wrapper, {
                tap: true,
                probeType: 1
            });

            this.scroll = scroll;

            scroll.on('scroll', (pos) => {
                // console.log('scroll');
                // 这个是在滚动过程中触发的事件 pos坐标
                // 调用父组件的handleToScroll方法
                this.handleToScroll(pos);
            });

            scroll.on('touchEnd', (pos)=>{
                // console.log('end');
                // 鼠标/手指离开
                // 调用父组件的handleToTouchEnd方法
                this.handleToTouchEnd(pos);
            });
        },
        methods: {
            // 提供给父组件调用的toScrollTop方法
            toScrollTop(y){
                // scrollTo 作用：滚动到指定的位置
                this.scroll.scrollTo(0,y);
            }
        }
    }
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>