<template>
    <div id="category">
        <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
        <div class="content">
            <tab-menu :categories="categories" @selectItem="selectItem"/>
            <scroll class="scroll-content" :data="[categoryData]" ref="scroll">
                <div>
                    <category-content :subcategories="showSubcategory"/>
                    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"/>
                    <goods-list :goods="showCategoryDetail"/>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import TabMenu from './childComps/TabMenu'
import CategoryContent from './childComps/CategoryContent'

import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'

export default {
    name: 'Category',
    components: {
        NavBar,
        TabMenu,
        CategoryContent,
        Scroll,
        TabControl,
        GoodsList
    },
    data() {
        return {
            categories: [],
            categoryData: {},
            currentIndex: -1,
            currentType: 'pop'
        }
    },
    created() {
        //请求多个分类数据
        this.getCategory()
        //监听图片加载完成
        this.$bus.$on('imgLoad', () => {
		    this.$refs.scroll.refresh()
	    })
    },
    computed: {
        showSubcategory() {
            if(this.currentIndex === -1) {
                return {}
            }else {
                return this.categoryData[this.currentIndex].subcategories
            }
        },
        showCategoryDetail() {
            if(this.currentIndex === -1) {
                return []
            }else {
                return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
            }
        }
    },
    methods: {
        //事件监听相关方法
        selectItem(index) {
            //点击展示对应分类数据
            this.getSubcategories(index)
        },
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2 :
                    this.currentType = 'sell'
                    break
            }
        },

        //网络请求相关方法
        getCategory() {
            getCategory().then(res => {
                // console.log(res)
                this.categories = res.data.category.list
                //初始化每个类别的子数据
                for(let i = 0; i < this.categories.length;i++) {
                    this.categoryData[i] = {
                        subcategories: {},
                        categoryDetail: {
                            'pop': [],
                            'new': [],
                            'sell': []
                        }
                    }
                }
                //请求第一个分类数据来展示
                this.getSubcategories(0)
            })
        },
        getSubcategories(index) {
            this.currentIndex = index
            const mailKey = this.categories[index].maitKey
            getSubcategory(mailKey).then(res => {
                this.categoryData[index].subcategories = res.data
                this.categoryData = {...this.categoryData}
                this.getCategoryDetail('pop')
                this.getCategoryDetail('new')
                this.getCategoryDetail('sell')
            })
        },
        getCategoryDetail(type) {
            const miniWallkey = this.categories[this.currentIndex].miniWallkey
            getCategoryDetail(miniWallkey,type).then(res => {
                this.categoryData[this.currentIndex].categoryDetail[type] = res
                this.categoryData = {...this.categoryData}
            })
        }
    }
}
</script>

<style>
  #category {
      height: 100vh;
  }
  .nav-bar {
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .scroll-content {
      height: 100%;
      flex: 1;
  }
</style>