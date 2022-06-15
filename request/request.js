const httpUrl='http://localhost:3000'
export default {
	request(options){
		return new Promise((resolve,reject)=>{//把调取的的接口给了一个Promise实例
			uni.request({//uni-app调接口
			...options,//所有的数据通过options传过来
			header: {Authorization:uni.getStorageSync('token')||'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6MTIzNDU2LCJpZCI6MSwiaWF0IjoxNjU0NDE1NDI2LCJleHAiOjE2NTQ0MTkwMjZ9.MG9ADIFjsMyOSyIaqRgiOBTmxkFBwycSNxrTeU3x1k8'},
			success:res=>{
				resolve(res.data)
				
			}
		})
		})
		
	},
	//get方法
	get(url,data={},options={}){
		options.url=httpUrl+url
		options.data=data
		options.method="get"
		return this.request(options)
	},
	//post方法
	post(url,data={},options={}){
		options.url=httpUrl+url
		options.data=data
		options.method="post"
		return this.request(options)
	}
}