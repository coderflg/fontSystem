import {request} from "@/network/fetch";
export function checkMobile(phone, type){
    return request({
        url: "check/" + type,
        params:{
            "check": phone
        }
    })
}