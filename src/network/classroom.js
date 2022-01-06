import {request} from "@/network/fetch";

export function getClassroom(page, size){
    return request({
        url: "classrooms/",
        params:{
            "page": page,
            "size": size
        },
        method: "get"
    })
}

export function getMultiplicationClassname(){
    return request({
        url: "classrooms/",
        method: "put"
    })
}

export function addClassroom(form){
    return request({
        url: "classrooms/",
        data: {
            form
        },
        method: "post"
    })
}

export function getOne(id, op){
    return request({
        url: "classrooms/",
        params: {
            id,
            op
        },
        method: "delete"
    })
}
export function getSorting(){
    return request({
        url: "ManagerSorting/"
    })
}