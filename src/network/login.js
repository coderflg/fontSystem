import {request} from "@/network/fetch";
// The login request module encapsulation
export function login(form){
    return request({
        url: "authorizations/",
        data:{
            form
        },
        method: "post"
    })
}

// The register request module encapsulation
export function register(form){
    return request({
        url: "register/",
        data: {
            // token,
            form
        },
        method: "post"
    })
}

