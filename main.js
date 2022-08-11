import App from './App'
import store from 'store/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 万亿过滤器
Vue.filter('formatCount',function(value){
	
	if( value >= 10000 && value <= 100000000){
		value /= 1000;
		return value.toFixed(1) + '万'
	}else if(value > 100000000){
		value /= 100000000
		return value.toFixed(1) + '亿'
	}else{
		return value
	}
})

// 日期过滤器
Vue.filter('formatTime',function(value){
	var data = new Date(value)
	return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDay() + '日'
})

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif