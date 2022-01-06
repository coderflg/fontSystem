import {request} from "@/network/fetch";
export function getStudent(page, size){
    return request({
        url: "students/",
        params:{
            "page": page,
            "size": size
        }
        // headers:{
        //   "Authorization": "JWT " + token
        // }
    })
}
export function getStudentMessage(id){
    return request({
        url: "students/",
        params:{
            "studentId": id
        },
        method: "put"
    })
}
export function deleteStudent(id){
    return request({
        url: "students/",
        params:{
            "id": id
        },
        method: "delete"
    })
}
export function modifyStudent(form){
    return request({
        url: "students/",
        data:{
            form
        },
        method: "post"
    })
}
export function getDeleteStudent(){
    return request({
        url: "deletemanager/"
    })
}
export function ThoroughlyDelete(id){
    return request({
        url: "deletemanager/",
        params:{
            id
        },
        method: "put"
    })
}

export function deleteSelection(list){
    return request({
        url: "deletemanager/",
        data:{
            list
        },
        method: "post"
    })
}

export function BackStudent(id){
    return request({
        url: "deletemanager/",
        params:{
            id
        },
        method: "delete"
    })
}