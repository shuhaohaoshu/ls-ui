<template>
    <div class="MessageBox" v-if="show">
        <div class="MessageBox-mask"></div>
        <div class="MessageBox-box">
            <div class="header">
                <div class="title">{{title}}</div>
                <div class="close iconfont iconicon-" @click="close"></div>
            </div>
            <div class="content">{{text}}</div>
            <div class="btns">
                <div class="cancel" v-if="cancelBtn" @click="cancel('cancel')">{{cancelText}}</div>
                <div class="confirm" v-if="confirmBtn" @click="confirm('confirm')">{{confirmText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MessageBox',
    data(){
        return {
            show:false,
            title:'提示',
            text:'MessageBox',
            confirmBtn:true,
            cancelBtn:true,
            confirmText:'确定',
            cancelText:'取消',
            reselve:'',
            reject:'',
        }
    },
    methods:{
        showMessageBox(){
            this.show = true;
            return new Promise((reselve,reject)=>{
                this.reselve = reselve;
                this.reject = reject;
            });
        },
        cancel(){
            this.show = false;
            this.reject('cancel');
        },
        confirm(){
            this.show = false;
            this.reselve('confirm');
        },
        close(){
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.MessageBox{
    position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 9999999999;
	display: flex;
	justify-content: center;
    align-items: center;
    >.MessageBox-mask{
        position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.4);
    }
    >.MessageBox-box{
        position: relative;
		z-index: 100;
        background-color: #fff;
        width: 380px;
        padding: 20px;
        border-radius: 4px;
        >.header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            >.title{
                font-size: 18px;
            }
            >.close{
                cursor: pointer;
            }
        }
        >.content{
            margin: 9px 0;
        }
        >.btns{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            >div{
                width: 50px;
                margin-left: 10px;
                text-align: center;
                cursor: pointer;
                border-radius: 3px;
                padding: 9px;
                font-size: 14px;
                &:first-child{
                    margin-left: 0;
                }
            }
            >.cancel{
                border: 1px solid#dcdfe6;
                color:#333;
            }
            >.confirm{
                background-color: #409eff;
                border: 1px solid#409eff;
                color: #fff;
            }
        }
    }
}
</style>