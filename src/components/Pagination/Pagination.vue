<template>
  <div class="Pagination">
      <div class="total">共{{total}}条</div>
      <div class="page">
          <div class="prev iconfont iconzuo" @click="prev"></div>
          <div class="first item" v-if="firstEllipsis" @click="goPage(first)">{{first}}</div>
          <div class="ellipsis iconfont iconshenglvehao" v-if="firstEllipsis"></div>
          <div class="item" :class="currentPage==item?'on':''" v-for="(item,index) in pageArr" :key="index" @click="goPage(item)">{{item}}</div>
          <div class="ellipsis iconfont iconshenglvehao" v-if="nextEllipsis"></div>
          <div class="last item" v-if="nextEllipsis" @click="goPage(last)">{{last}}</div>
          <div class="next iconfont iconyou" @click="next"></div>
      </div>
      <div class="jump">
          前往<input type="text">页
          <div class="go">GO</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        page:{
            type:Number,
            default:2,
        },
        pageSize:{
            type:Number,
            default:10,
        },
        total:{
            type:Number,
            default:86
        }
    },
    data(){
        return{
            currentPage:1,
            pageArr:[],
        }
    },
    computed:{
        firstEllipsis:function(){
            return this.currentPage>=5?true:false;
        },
        nextEllipsis:function(){
            return this.pageArr.slice(-1)[0]!=this.last?true:false;
        },
        first:function(){
            return 1;
        },
        last:function(){
            return Math.ceil(this.total/this.pageSize);
        }
    },
    created(){
        this.currentPage = this.page;
        let pageData = [];
        let len = this.total<5?this.total:5;
        let num = this.currentPage<3?1:this.currentPage-2;
        for(let i = 0;i<len;i++){
            let item = num++;
            if(item>this.last){
                break;
            }
            pageData.push(item)
        }
        this.pageArr = pageData;
    },
    methods:{
        goPage(page){
            this.currentPage = page;
            if(page == this.first || page == this.last){
                return;
            }
            let pageData = [];
            let num;
            let first = this.pageArr.slice(0)[0];
            let last = this.pageArr.slice(-1)[0];
            if(page == first || page == last){
                num = page-2;
                for(let i = 0;i<5;i++){
                    let item = num++;
                    if(item>this.last){
                        break;
                    }
                    pageData.push(item)
                }
                this.pageArr = pageData;
            }
        },
        prev(){
            if(this.currentPage>1){
                this.goPage(this.currentPage-1);
            }
        },
        next(){
            if(this.currentPage<this.last){
                this.goPage(this.currentPage+1);
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
            width: 38px;
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
    }
}
</style>