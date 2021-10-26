import {request} from './request'

//详情页的数据
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

//详情页的推荐数据
export function getRecommend() {
    return request({
        url: '/recommend',
    })
}

//ES6写法：将三种数据封装到这个类里，创建这个类的对象，用对象把数据传入组件中
export class Goods {
    constructor(itemInfo,columns,services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        //判断images是否有值（某些商品有）
        this.images = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}