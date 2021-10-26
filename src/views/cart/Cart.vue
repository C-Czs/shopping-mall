<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>

        <!-- 商品列表 -->
        <cart-list/>

        <!-- 底部 -->
        <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        cartLength() {
            return this.$store.state.cartList.length
        }
    }
}
</script>

<style>
  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
  }
</style>