<template>
    <div class="account">
        <div class="account-item">
            <div class="num">
                <span>0.00</span>元
            </div>
            <div class="account-info">我的余额</div>
        </div>
        <div class="account-item">
            <div class="num">
                <span>0</span>个
            </div>
            <div class="account-info">我的优惠</div>
        </div>
        <div class="account-item">
            <div class="num">
                <span>0</span>分
            </div>
            <div class="account-info">我的积分</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Account'
}
</script>

<style scoped>
  .account {
      display: flex;
      background-color: #fff;
  }
  .account-item {
      width: 100%;
      padding: 10px 4px;
      text-align: center;
      border-left: 2px solid #f2f2f2;
  }
  .account-item span {
      font-size: 24px;
      font-weight: 700;
      color: #ff5f3e;
  }
  .account-info {
      margin-top: 5px;
  }
</style>