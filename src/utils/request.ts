import service from './index'


export function getexception(data: any) {
    return service.request({
        method: "post",
        url: "/exception/list",
        data
    })
}

export function updateexception(data: any) {
    return service.request({
        method: "post",
        url: "/exception",
        data
    })
}

export function delexception(data: any) {
    return service.request({
        method: "post",
        url: "/exception/delete",
        data
    })
}