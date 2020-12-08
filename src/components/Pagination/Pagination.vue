<template>
  <div class="Pagination">
      <div class="total">共{{total}}条</div>
      <div class="page">
          <div class="prev iconfont iconzuo" :class="currentPage==1?'stop':''" @click="prev"></div>
          <div class="first item" v-if="firstEllipsis" @click="goPage(1)">1</div>
          <div class="ellipsis iconfont iconshenglvehao" v-if="firstEllipsis"></div>
          <div class="item" :class="currentPage==item?'on':''" v-for="(item,index) in pages" :key="index" @click="goPage(item)">{{item}}</div>
          <div class="ellipsis iconfont iconshenglvehao" v-if="nextEllipsis"></div>
          <div class="last item" v-if="nextEllipsis" @click="goPage(totalPages)">{{totalPages}}</div>
          <div class="next iconfont iconyou" :class="currentPage==totalPages?'stop':''" @click="next"></div>
      </div>
      <div class="jump">
          前往<input :value="goValue" @input="pageNumber">页
          <div class="go" :class="goValue<1 || goValue > totalPages?'stop':''" @click="goPage(goValue)">确定</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        //第几页
        pageIndex:{
            type:Number,
            default:1,
        },
        //每页条数
        pageSize:{
            type:Number,
            default:10,
        },
        //总条数
        total:{
            type:Number,
            default:60
        },
    },
    data(){
        return{
            currentPage:1,
            goValue:'',
        }
    },
    computed:{
        //前面省略号显示状态
        firstEllipsis(){
            let first = this.pages[0];
            return first!=1?true:false;
        },
        //后面省略号显示状态
        nextEllipsis(){
            let last = this.pages[this.pages.length-1];
            return last!=this.totalPages?true:false;
        },
        //总共页数
        totalPages(){
            return Math.ceil(this.total/this.pageSize);
        },
        pages(){
            let ct = this.currentPage;
            let tp = this.totalPages;
            // 中间五个数
            // 当ct > 3 && ct < tp - 3时，发现每次加减页码，中间的五个数都会变，而当ct < 3|| ct >= tp - 3时，中间的五个数都是稳定的
            if(tp>=5){
                if (ct > 3 && ct < tp - 3) {
                    return [ct - 2, ct - 1, ct, ct + 1, ct + 2];
                } else if (ct <= 3) {
                    return [1, 2, 3, 4, 5];
                } else {
                    return [tp - 4, tp - 3, tp - 2, tp - 1 , tp];
                }
            }else{
                return [1,2,3,4,5].filter(item => item <= tp);
            }
        }
    },
    created(){
        this.currentPage = this.pageIndex;
    },
    methods:{
        //限制输入框只能输入数字
        pageNumber(e){
            e.target.value = e.target.value.replace(/[^\d]/g,'');
            this.goValue = e.target.value;
        },
        //页数跳转
        goPage(page){
            if(page<1 || page>this.totalPages){
                return;
            }
            this.currentPage = page;
            //返回页数给父组件
            this.$emit('page',this.currentPage);
        },
        //上一页
        prev(){
            if(this.currentPage>1){
                this.currentPage--;
                //返回页数给父组件
                this.$emit('page',this.currentPage);
            }
        },
        //下一页
        next(){
            if(this.currentPage<this.totalPages){
                this.currentPage++;
                //返回页数给父组件
                this.$emit('page',this.currentPage);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.Pagination{
    display: flex;
    align-items: center;
    >.total{
        min-width: 100px;
    }
    >.page{
        flex: 1;
        @extend .Pagination;
        >div{
            width: 38px;
            height: 38px;
            text-align: center;
            line-height: 38px;
            margin-left: 8px;
            &:first-child{
                margin-left: 0;
            }
            &.item{
                border: 1px solid #ddd;
                border-radius: 3px;
                &.on{
                    background-color: #409eff;
                    color: #fff;
                    border-color: #409eff;
                }
            }
            &.item,&.prev,&.next{
                cursor: pointer;
            }
            &.stop{
                cursor: not-allowed;
                color: #ddd; 
            }
        }
    }
    >.jump{
        @extend .Pagination;
        min-width: 200px;
        >input{
            width: 80px;
            height: 38px;
            padding: 0;
            border: 1px solid #ddd;
            outline: none;
            margin-left: 8px;
            margin-right: 8px;
            text-align: center;
        }
        >.go{
            width: 48px;
            height: 38px;
            text-align: center;
            line-height: 38px;
            background-color: #409eff;
            color: #fff;
            border:1px solid #409eff;
            border-radius: 3px;
            margin-left: 8px;
            cursor: pointer;
        }
        >.stop{
            cursor: not-allowed;
        }
    }
}
</style>