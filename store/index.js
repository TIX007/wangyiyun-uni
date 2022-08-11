import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topListIds:[],
		musicData:{},
		netId:''
	},
	mutations:{
		INIT_TOPLISTIDS(state,payload){
			state.topListIds = payload
		},
		// 获取下一个歌曲id
		NEXT_ID(state , payload){
			for(var i=0; i<state.topListIds.length;i++){
				if( state.topListIds[i].id == payload){
					state.nextId = state.topListIds[i+1].id
				}
			}
		},
		MUSIC_DATA(state , data ){
			state.musicData = data
		}
	}
})