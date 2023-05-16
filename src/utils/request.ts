import service from './index'


export function getexception() {
    return service.request({
        method: "get",
        url: "/exception"
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
        method: "delete",
        url: "/exception",
        data
    })
}