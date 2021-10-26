import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {    //混入
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0,0)
        }
    }
}