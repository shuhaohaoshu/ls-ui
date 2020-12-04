import MessageBox from './MessageBox.vue';

export default {
    install(Vue) {
        const messageBox = Vue.extend(MessageBox);
        const Profile = new messageBox({
            el: document.createElement('div')
        });
        document.body.appendChild(Profile.$el);
		
        const MessageBoxMethod = {
            open(config) {
                let p = Profile.showMessageBox();
                if(config){
                    const options = ['title','text','confirmBtn','cancelBtn','confirmText','cancelText'];
                    for(let key in config){
                        if(options.indexOf(key)!=-1){
                            Profile[key] = config[key];
                        }
                    }
                }
                return p;
            }
        };
        
        Vue.prototype.$MessageBox = MessageBoxMethod;
    }
}
