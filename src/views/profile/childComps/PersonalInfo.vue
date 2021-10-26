<template>
    <div class="personal-info">
        <div class="info-list">
            <div class="icon">
                <img src="~assets/img/profile/message.svg">
            </div>
            <div class="info">
                <span>我的消息</span>
            </div>
        </div>
        <div class="info-list">
            <div class="icon">
                <img src="~assets/img/profile/pointer.svg">
            </div>
            <div class="info">
                <span>积分商城</span>
            </div>
        </div>
        <div class="info-list">
            <div class="icon">
                <img src="~assets/img/profile/vip.svg">
            </div>
            <div class="info">
                <span>会员卡</span>
            </div>
        </div>
        <div class="info-list">
            <div class="icon">
                <img src="~assets/img/profile/cart.svg">
            </div>
            <div class="info">
                <span>我的购物车</span>
            </div>
        </div>
        <div class="info-list">
            <div class="icon">
                <img src="~assets/img/profile/shopping.svg">
            </div>
            <div class="info">
                <span>下载购物APP</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalInfo'
}
</script>

<style scoped>
  .personal-info {
      margin-top: 20px;
  }
  .info-list {
      height: 44px;
      line-height: 44px;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid rgba(100, 100, 100, .1);
  }
  .icon {
      position: absolute;
  }
  .icon img{
      width: 20px;
      height: 20px;
  }
  .info {
      margin-left: 30px;
  }
</style>