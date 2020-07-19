const { request } = require("./netHandler");
//createChunkList 生成切片列表
export function createChunkList(file_data, chunk_size, file_name) {
    let chunk_list = [],
        cur: number = 0,
        index = 0;
    while (cur < file_data.size) {
        chunk_list.push({ "chunk_data": file_data.slice(cur, cur + chunk_size), "hash": file_name + index })
        cur += chunk_size;
    }
}
//uploadChunk 上传切片数据
export async function uploadChunk(chunk_list, file_name, config_upload, config_merge) {
    const requestList = chunk_list.map((item, index) => {
        let form_data = new FormData();
        form_data.append('file_name', file_name);
        form_data.append('hash', item.hash);
        form_data.append('chunk_data', item.chunk_data);
        request({ ...config_upload, "data": item.chunk_data });
    })
    await Promise.all(requestList);
    await mergeRequest(file_name, config_merge);
}
//mergeRequest 合并切片请求
async function mergeRequest(file_name: string, config_merge) {
    await this.request({
        url: config_merge.url,
        headers: config_merge.header,
        method: config_merge.method,
        data: JSON.stringify({
            file_name,
        })
    });
}

