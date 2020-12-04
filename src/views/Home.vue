<template>
  <div class="home">
    <div class="item">
      <div class="left">ls-ui loading</div>
      <div class="right">
        <button @click="showLoading">loading</button>
      </div>
    </div>
    <div class="item">
      <div class="left">ls-ui MessageBox</div>
      <div class="right">
        <button @click="showMessageBox">MessageBox</button>
      </div>
    </div>
    <div class="item">
      <div class="left">ls-ui Dispicker</div>
      <div class="right">
        <Dispicker 
        @select="selectPicker" 
        :codes="[{name:'广东省',code:'44'},
        {name:'深圳市',code:'4403'},
        {name:'罗湖区',code:'440303'}]"></Dispicker>
      </div>
    </div>
    <div class="item">
      <div class="left">ls-ui Upload</div>
      <div class="right">
        <Upload formKey="img" @upload="getForm"></Upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods:{
    showLoading(){
      this.$Loading.open();
      setTimeout(() =>{
          this.$Loading.hide();
      },2000)
    },
    showMessageBox(){
      this.$MessageBox.open({
        title:'标题',
        text:'测试一下',
      }).then(e=>{
        console.log(e,'------MessageBox')
      }).catch(e=>{
        console.log(e,'------MessageBox')
      })
    },
    selectPicker(e){
      console.log(e,'-------Dispicker')
    },
    getForm(e){
      console.log(e,'-------Upload')
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  padding: 0 30px;
  >.item{
    display: flex;
    margin-bottom: 25px;
    >.left{
      width: 200px;
    }
    >.right{
      flex: 1;
    }
  }
}
</style>