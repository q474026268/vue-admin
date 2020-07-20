import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入 ElementUI
import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

/* 
  Elements ui 组件引入使用步骤
  1.安装依赖 npm i element-ui -S
  2.在main.js入口文件导入 
  import ElementUI from 'element-ui';
  3.可以按需引入 https://element.eleme.cn/#/zh-CN/component/quickstart
*/
