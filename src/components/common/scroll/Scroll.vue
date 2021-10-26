<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null
        }
    }, 
    mounted() {
        //ref绑定在普通元素中，可通过this.$refs.xxx获取元素对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            //div默认不能被点击，所以要设置为true
            click: true,
            //0和1都是不侦测实时位置，2是手指滚动时侦测，3是滚动都侦测
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        //监听滚动的位置
        if(this.probeType == 2 || this.probeType == 3) {
            this.scroll.on('scroll',(position) => {
            //发送自定义事件
            this.$emit('scroll',position)
        })
        }

        //监听scroll滚动到底部
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        }
    },
    methods: {
        //封装一个回到顶部的方法
        scrollTo(x,y,time=300) {
            //判断scroll是否有值
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        } 
    }
}
</script>

<style scoped>
  .wrapper {
      overflow: hidden;
  }
</style>