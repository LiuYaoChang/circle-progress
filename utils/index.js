// export const http = fucntion () {

//     return new Promise((reslove, reject) => {
//         wx.request({

//         })
//     })
// }
// import Fly from 'flyio/index';
var Fly = require("flyio/index") 
export const DOMAIN = 'http://127.0.0.1:7001';
const fly = new Fly();

fly.config.timeout = 6000;
fly.config.baseURL = DOMAIN;


export const http = function (config) {
    return new Promise((resolve, reject) => {
        const basePath = DOMAIN;
        let { url, method = 'GET', header = { 'content-type': 'application/json' }, data = {} } = config;
        url = url.startsWith('/') ? url : '/' + url;
        wx.request({
            timeout: 60000,
            method: method,
            header,
            data,
            url: basePath + url,
            success: (res) => resolve(res),
            fail: (res) => reject(res)
        })
    })
}


fly.interceptors.request.use((config) => {
    config.headers['XXS-token'] = 'Flyio';

    return config;
})


fly.interceptors.response.use((response) => {
    return response;
})

export { fly }

