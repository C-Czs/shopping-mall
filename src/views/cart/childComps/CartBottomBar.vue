<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-all" :is-checked="isCheckedAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">合计：{{'¥' + totalPrice}}</div>
        <div class="calculate" @click="calcClick">结算</div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return this.$store.state.cartList.filter(item => {   //过滤出购物车里被选中的商品
                return item.checked
            }).reduce((preValue,item) => {   //计算最终价格
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        isCheckedAll() {  //用every方法(每个元素都符合才返回true)判断是否全选
            if(this.$store.state.cartList == 0) {return false}
            return (this.$store.state.cartList.every(item => {return item.checked}))
        }
    },
    methods: {
        checkClick() {  //点击全选后的效果
            if(this.isCheckedAll) { 
                this.$store.state.cartList.forEach(item => {item.checked = false})
            }else {
                this.$store.state.cartList.forEach(item => {item.checked = true})
            }
        },
        calcClick() {
            if(!this.isCheckedAll) {
                this.$toast.show('请选择购买的商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
  .bottom-bar {
      width: 100%;
      height: 40px;
      background-color: #eee;
      position: relative;
      display: flex;
      align-items: center;
      box-shadow: 0 -2px 3px rgba(0, 0, 0, .2)
  }
  .check-content {
      display: flex;
      align-items: center;
      margin-left: 10px;
  }
  .check-all {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
  }
  .price {
      margin-left: 30px;
      flex: 1;
  }
  .calculate {
      width: 80px;
      line-height: 40px;
      text-align: center;
      background-color: red;
      color: #fff;
  }
</style>