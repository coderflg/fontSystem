import {request} from "@/network/fetch";
export function getCurrentClass(name){
    return request({
        url: "analysis/",
        params: {
            name
        },
        method: "get"
    })
}
export function saveData(flag){
    return request({
        url: "analysis/",
        data: {
            flag
        },
        method: "post"
    })
}
export function search(name){
    return request({
        url: "analysis/",
        params:{
            name
        },
        method: "put"
    })
}