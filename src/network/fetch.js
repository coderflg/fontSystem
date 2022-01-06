import axios from 'axios'
// let serverBase = 'http://192.168.1.102:8000/'
let serverBase = 'http://127.0.0.1:8000/'
import { Loading } from 'element-ui';
export function request(config){
    var loadingInstance
    const instance = axios.create({
        baseURL:serverBase,
        timeout:20000
    })
    instance.interceptors.request.use(config => {

        loadingInstance = Loading.service({
            text:"我在很努力的加载啦小主人!!",
            background: 'rgba(255, 255, 255, 0.7)'
        });
        return config
    },error => {
        console.log(error)
        return error
    })

    instance.interceptors.response.use(response => {
        loadingInstance.close()
        return response.data
    }, error => {
        console.log(error)
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权的访问'
                    break
            }
        }
        loadingInstance.close()
        return error
    })


    return instance(config)
}