<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="detailImageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'


export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll,
    },
    mixins: [backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0
        }
    },
    created() {
        //保存传入的iid
        this.iid = this.$route.params.iid

        //根据iid请求详情数据
        getDetail(this.iid).then(res => {
            //获取顶部的图片轮播数据
            const data = res.result
            this.topImages = data.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //保存商品的详情数据
            this.detailInfo = data.detailInfo

            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //获取评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })

        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

        //给getThemeTopY赋值,同时进行防抖
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            //获取详情页四个标题对应的内容位置
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE) //添加了一个最大值
        },100)
    },
    mounted() {
        //监听图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('detailItemImageLoad', () => {
            refresh()
        })
    },
    methods: {
        detailImageLoad() {
            this.$refs.scroll.refresh()
            //在图片加载完成后再去调用，可以保证获取到正确的位置
            this.getThemeTopY()
        },
        titleClick(index) {
            //点击详情页顶层标题到达其对应内容
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },

        //滚动到相应内容可对应其顶层的标题
        contentScroll(position) {
            const positionY = -position.y  //获取y值
            //给themeTops最后添加一个最大值, 用于和最后一个主题的top进行比较.
            let length = this.themeTopYs.length
            for(let i = 0;i < length - 1;i++) {
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }

            //判断backTop是否显示
            this.isShowBackTop = -position.y > 1000
        },
        addToCart() {
            //获取购物车需要展示的信息
            const product = {}
            product.iid = this.iid;
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;

            //将商品添加到购物车里
            this.$store.dispatch('addCart',product).then(res => {
                this.$toast.show(res, 2000)   //插件式封装直接调用对象
            })
        }
    }
}
</script>

<style scoped>
  #detail {
      position: relative;
      z-index: 9;
      background-color: #fff;
      height: 100vh
  }
  .detail-nav {
      position: relative;
      z-index: 9;
      background-color: #fff;
  }
  .content {
      background-color: #fff;
      height: calc(100% - 44px);
  }
</style>