import Vue from 'vue';
import Loading from './Loading';
import MessageBox from './MessageBox';

Vue.use(Loading);
Vue.use(MessageBox);

//引入同目录下的全部组件
const requireCom = require.context('./',true,/\.vue$/);

//依次进行注册
requireCom.keys().forEach(key => {
    
	//获取单个组件内容
    const _component = requireCom(key);
    
    //获取组件名称
    const _componentName = _component.default.name;
    
	//注册在vue上
	Vue.component(_componentName,_component.default || _component);
})