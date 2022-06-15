import store from './@/store/store.js'

const islogin=()=>{
		console.log(store.state)
		if(store.state.user_id!==null&&store.state.user_id!==undefined){
			return 'yes'
		}
		return 'no'
	}
export default {
	islogin
}