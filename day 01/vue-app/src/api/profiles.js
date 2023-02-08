import http from '@/utils/request'

// 获取所有数据 GET
export function getProfiles(){
    return http({
        url:"/profiles",
        method:"GET"
    })
}
// 删除数据
export function deleteProfile(data){
    return http({
        url:"/profiles/delete/" + data,
        method:"DELETE",
    })
}
// 添加数据
export function addProfile(data){
    return http({
        url:"/profiles/add/",
        method:"POST",
        data
    })
}
// 修改数据
export function editProfile(data){
    return http({
        url:"/profiles/edit/" + data._id,
        method:"POST",
        data
    })
}