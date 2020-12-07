<template>
  <div class="Upload">
      <label class="item">
          <i class="iconfont iconjia"></i>
          <input type="file" @input="Upload">
      </label>
      <div class="item" v-for="(item,index) in imgs" :key="index">
          <div class="close">
              <i class="iconfont iconicon-" @click="Delete(index)"></i>
          </div>
          <img :src="item" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:'Upload',
    props:{
        formKey:{
            type:String,
            default:'file'
        }
    },
    data(){
        return{
            imgs:[]
        }
    },
    methods:{
        //上传
        Upload(e){
            // 上传图片事件
            let self = e;
            let files = self.target.files;
            let that = this;
            let readAndPreview = (file)=>{
              if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    let result = e.target.result;
                    that.imgs.push(result);
                    self.target.value = '';
                };
                reader.readAsDataURL(file);
              }
            }
            readAndPreview(files[0]);
            let formData = new FormData();
            formData.append(this.formKey, files[0]);
            this.$emit('upload',formData);
        },
        //删除图片
        Delete(index){
            this.imgs.splice(index,1);
        }
    }
}
</script>

<style lang="scss" scoped>
.Upload{
    overflow: hidden;
    >.item{
        float: left;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 3px;
        position: relative;
        >.close{
            position: absolute;
            width: 100%;
            top: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 9;
            color: #fff;
            text-align: right;
            height: 30px;
            line-height: 30px;
            >.iconfont{
                margin-right: 10px;
                cursor: pointer;
            }
        }
        >.iconfont{
            font-size: 55px;
            color: #ddd;
            cursor: pointer;
        }
        >input{
            display: none;
        }
        >img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>