<template>
    <div id="shop-product">
        <div class="product-selector">
            <check-button :is-checked="product.checked" @checkClick="checkChange"></check-button>
        </div>
        <div class="product-img">
            <img :src="product.image">
        </div>
        <div class="product-info">
            <div class="product-title">{{product.title}}</div>
            <div class="product-desc">{{product.desc}}</div>
            <div class="info-bottom">
                <div class="product-price">{{'¥' + product.price}}</div>
                <div class="product-count">{{'×' + product.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name: 'CartListItem',
    components: {
        CheckButton
    },
    props: {
        product: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        checkChange() {
            this.product.checked = !this.product.checked
        }
    }
}
</script>

<style scoped>
#shop-product {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.product-selector {
    display: flex;
    /* 分别在flex容器的当前行的横轴和纵轴方向上居中放置 */
    justify-content: center;
    align-items: center; 
}
.product-title, .product-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.product-img {
    padding: 5px;
}
.product-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
.product-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
    position: relative;
}
.product-info .product-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}
.info-bottom .product-price {
    float: left;
    color: orangered;
  }
.info-bottom .product-count {
    float: right;
}
</style>