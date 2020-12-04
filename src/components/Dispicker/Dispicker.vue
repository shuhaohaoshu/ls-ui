<template>
  <div class="Dispicker">
      <select name="Dispicker" class="item" :value="codes[i]?codes[i].code:''" v-for="(val,i) in 3" :key="i" @change="changePicker($event,i)">
          <option value="">请选择</option>
          <option :value="item.code" v-for="(item,index) in options[i]" :key="index">{{item.name}}</option>
      </select>
  </div>
</template>

<script>
import date from './date.json';
export default {
    name:'Dispicker',
    props:{
        //省市区编码
        codes:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    data(){
        return {
            options:[date],//省市区数据
        }
    },
    created(){
        //默认选中
        for(let i = 0; i<this.codes.length; i++){
            let item = this.codes[i].code;
            let children = this.recursion(date,item).children;
            if(children && children.length>0){
                this.options.push(children)
            }
        }
    },
    methods:{
        //切换选项
        changePicker(e,index){
            let value = e.target.value;
            let options = e.target.children;
            let codeItem = '';
            //获取选中项name和code
            for(let i = 0;i<options.length;i++){
                if(value && options[i].value == value){
                    codeItem = {
                        name:options[i].innerText,
                        code:options[i].value,
                    }
                }
            }
            this.codes[index] = value?codeItem:'';
            this.codes.splice(index+1,2-index);
            let el = document.querySelectorAll('.item');
            //清空被选中的select后面select的value值
            el.forEach((e,idx)=>{
                if(idx>index){
                    e.value='';
                }
            });
            //根据上一个select联动后面的select
            this.$nextTick(()=>{
                this.options.splice(index+1,2-index);
                let children = value?this.recursion(date,value).children:[];
                if(children && children.length>0){
                    this.$set(this.options,index+1,children)
                }
                this.$emit('select',this.codes);
            });
        },
        //按id查询某项
        recursion(data, current){
            let result = null;
            if(!data){
                return;
            }
            for(let i in data){
                if(result!=null){
                    break
                }
                let item = data[i];
                if(item.code == current){
                    result = item;
                    break;
                }else if(item.children && item.children.length > 0){
                    result = this.recursion(item.children, current);
                }
            }
            return result;
        }
    }
}
</script>

<style lang='scss' scoped>
.Dispicker{
    >.item{
        width: 150px;
        &:first-child{
            margin-left: 0;
        }
        margin-left: 10px;
    }
}
</style>