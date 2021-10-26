<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="left"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="right"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            counter: 0,  //加载图片的次数
        }
    },
    methods: {
        imgLoad() {
            //当加载图片次数等于获取图片的长度时，就证明已经加载完毕,最后只需做一次回调
            this.counter += 1
            if(this.counter === this.detailInfo.detailImage[0].list.length) {
                this.$emit('imageLoad');
            }
        }
    }
}
</script>

<style scoped>
  .goods-info {
      padding: 20px 0;
      border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
      padding: 0 15px;
  }
  .info-desc .desc {
      padding: 15px 0;
      font-size: 14px;
  }
  .info-desc .left, .info-desc .right {
      width: 90px;
      height: 3px;
      background-color: #a3a3a5;
      position: relative;
  }
  .info-desc .left {
      float: left;
  }
  .info-desc .right {
      float: right;
  }
  /* 创建两个伪元素(也就是那两个点) */
  .info-desc .left::before, .info-desc .right::after {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #333;
      bottom: 0;
  }
  .info-desc .right::after {
      right: 0;
  }
  .info-key {
      margin: 10px 0 10px 15px;
      color: #333;
      font-size: 15px;
  }
  .info-list img {
      width: 100%;
  }
</style>