import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCount(state, playload) {
            playload.count++
        },
        addToCart(state, playload) {
            playload.checked = true //刚添加进购物车里的商品默认是选中的
            state.cartList.push(playload)
        }
    },
    actions: {
        addCart(context,playload) {
            return new Promise((reslove,reject) => {
                //若发现传过来的playload的iid与item中的相同便以item作为返回值
                let oldProduct = context.state.cartList.find(item => {
                    return item.iid === playload.iid
                })

                //判断购物车的里商品是否有值，本来在购物车的就加1，不在的就添加进去使其数量等于1
                if(oldProduct) {   
                    context.commit('addCount', oldProduct)
                    reslove('当前商品数量+1')
                } else {  
                    playload.count = 1
                    context.commit('addToCart', playload)
                    reslove('添加了新的商品')
                }
            })
        }
    }
})

export default store