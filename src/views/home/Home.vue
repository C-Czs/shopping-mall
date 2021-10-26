<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick="tabClick"
                     ref="topTab"
                     class="top-tab"
                     v-show="isShowTopTab"/>
        
        <!-- ref绑定在组件中可通过this.$refs.xxx获取组件对象 -->
        <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pull-up-load="true" 
        @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']" 
                         @tabClick="tabClick"
                         ref="tabControl"/>
            <goods-list :goods="showGoods"/>
        </scroll>
        
        <!-- 监听原生组件的点击事件 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import RecommendView from './childComps/RecommendView'
import HomeSwiper from './childComps/HomeSwiper'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'


export default {
    name: 'Home',
    components: {
        NavBar,
        RecommendView,
        HomeSwiper,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            recommends: [],
            banners: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isShowTopTab: false,
            saveY: 0
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    created() {
        //请求多个数据
        this.getHomeMultidata()

        //请求首页商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        //监听item中图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh,50) //将refresh函数传入debounce函数中生成新的函数，新生成的函数不会频繁使用
        this.$bus.$on('homeItemImageLoad', () => {
            refresh()
        })
    },
    activated() {
        //用scrollTo方法回到离开前保存的位置，参数中的时间填0会有bug
        this.$refs.scroll.scrollTo(0 , this.saveY , 10) 
        this.$refs.scroll.refresh()
    },
    deactivated() {
        //离开首页时保存一下其位置
        this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
        //事件监听相关方法
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            //让两个tabControl的点击同步
            this.$refs.topTab.currentIndex = index;
            this.$refs.tabControl.currentIndex = index;
        },
        backClick() {
            //通过ref调用scroll里封装的方法,使其回到顶部
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position) {
            //监听首页的滚动位置，判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000;

            //决定tabControl是否吸顶
            this.isShowTopTab = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
            //上拉加载更多
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad() {
            //获取tabControl的offsetTop,方便制作吸顶效果
            //所有的组件都有一个属性$el：用于获取组件中的元素 
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        },

        //网络请求相关方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
              this.recommends = res.data.recommend.list;
              this.banners = res.data.banner.list;
            })
        },
        getHomeGoods(type) {
            //动态获取对应的page(一开始是0，给传递页码的参数+1)
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res => {
                //将res.data.list的数据解析出来逐个放进this.goods[type].list中
                this.goods[type].list.push(...res.data.list);
                //对真正的页码+1
                this.goods[type].page += 1;

              //完成上拉加载更多
              this.$refs.scroll.finishPullUp();
            })
        }
    }
}
</script>

<style scoped>
  #home {
      /* 视口，100%的视口 */
      height: 100vh; 
      position: relative;
  }
  .home-nav {
      background-color: var(--color-tint);
      color: #fff;
      position: relative;
      z-index: 9; 
  }
  .content {
      overflow: hidden;
      height: calc(100% - 44px);
  }
  .top-tab {
      position: relative;
      z-index: 9;
  }
</style>