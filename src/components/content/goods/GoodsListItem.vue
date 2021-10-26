<template>
    <div class="goods-item" @click="itemClick">
        <img :src="showImage" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        showImage() {
            //对于不同组件展示的图片做个条件判断
            return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imageLoad() {
            //判断对图片的监听是首页还是详情页，然后把事件发送给对应的页面
            if(this.$route.path.indexOf('/home')) {
            //往事件总线(用于管理事件)发射一个事件，让home可以监听
                this.$bus.$emit('homeItemImageLoad')
            }else if(this.$route.path.indexOf('/detail')) {
                this.$bus.$emit('detailItemImageLoad')
            }else {
                //监听分类页面的图片加载
                this.$bus.$emit('imgLoad')
            }
        },
        itemClick() {
            //动态路由传递参数
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
}
</script>

<style scoped>
  .goods-item {
      padding-bottom: 40px;
      position: relative;
      width: 48%;
  }
  .goods-item img {
      width: 100%;
      border-radius: 5px;
  }
  .goods-info {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
  }
  .goods-info p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
  }
  .goods-info .price {
      color: var(--color-high-text);
      margin-right: 20px;
  }
  .goods-info .collect {
      position: relative;
  }
  .goods-info .collect::before {
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>