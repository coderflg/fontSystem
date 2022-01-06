import {request} from "@/network/fetch";
export function getCoursera(page, size){
    return request({
        url: "coursera/",
        params:{
            "page": page,
            "size": size
        }
    })
}
export function addCoursera(form){
    return request({
        url: "coursera/",
        data:{
            form
        },
        method: "post"
    })
}

export function getCourseraName(){
    return request({
        url: "coursera/",
        method: "delete"
    })
}

export function getOne(id){
    return request({
        url: "coursera/",
        params:{
          id
        },
        method: "put"
    })
}
export function courseraManagerGetAllType(){
    return request({
        url: "courseramanager/"
    })
}
export function DeleteCoursera(id){
    return request({
        url: "courseramanager/",
        params:{
            id
        },
        method: "delete"
    })
}