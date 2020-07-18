interface RequestConfig {
    url: string,
    method: "post" | "get",
    data: any,
    header: object,
}
let request = (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(config.method, config.url);
        Object.keys(config.header).forEach((key) => {
            xhr.setRequestHeader(key, config.header[key])
        })
        xhr.send(config.data);
        xhr.onload = e => {
            resolve({
                data: e.target.response
            })
        }
    })
}
export default request



