import React, { useState, useEffect } from 'react';
const styles = require('./index.scss');
const { createChunkList, uploadAllChunks } = require("./chunkHandler")

interface PropsConfig {
    hint: string,//提示文字
    chunk_size: number,//切片的分块大小
    requestConfigUpload: object,//url,method,header
    requestConfigMerge: object,//合并切片请求配置项
    chunk_threshold_size: number//当文件大于 xx 时就切片处理。
}
let file_name: string = '',
    chunk_list = null,
    worker = null,
    hashPercentage: number = 0;
let Uploader = function (props: PropsConfig) {
    const [upload_progress, setupload_progress] = useState(0);//upload progress
    useEffect(() => {
        console.log('use effect!')
    });
    //fileChange 点击上传
    const fileChange = function (e) {
        const [file] = e.target.files;//解构赋值的写法，相当于将e.target.files的第一个元素 array[0] 赋值给file
        if (!file) return;
        //console.log(file)
        let file_name = file.name;
        chunk_list = createChunkList(file, props.chunk_size, file_name);
    }
    //pauseUpload 暂停上传
    const pauseUpload = function (e) {
        console.log('暂停上传')
    }
    //uploadFile 上传文件至后端，node端。
    const uploadFile = function (e) {
        console.log('上传')
        uploadAllChunks(chunk_list, file_name, props.requestConfigUpload)
    }
    //calculateHash 根据切片计算得到文件内容的hash值
    const calculateHash = function (chunk_list) {
        return new Promise(resolve => {
            // 添加 worker 属性
            worker = new Worker("./hashWorker.js");
            worker.postMessage({ chunk_list });
            worker.onmessage = e => {
                const { percentage, hash } = e.data;
                hashPercentage = percentage;
                if (hash) {
                    resolve(hash);
                }
            };
        });
    }
    return (
        <div>
            <div className={styles.uploader_container}>
                <input className={styles.uploader_clear_style_of_input} type="file" onChange={fileChange}></input>
                <div className={styles.uploader_text_hint}></div>

                <div className={styles.uploader_input_file}></div>

                <div className={styles.uploader_icon_outBox}>
                    <i className={`${styles.uploader_icon} iconfont iconshangchuanwenjian`}></i>
                </div>
                <p className={styles.uploader_text_hint}>{props.hint}</p>
                <button onClick={uploadFile}>上传</button>
                <button onClick={pauseUpload}>暂停</button>
                <div className={styles.uploader_progress_outBox}>
                    <p>上传进度: </p>
                    <div className={styles.uploader_progress_container}>
                        <div className={styles.uploader_progress_color}></div>
                    </div>
                    <p className={styles.uploader_progress_number}>{upload_progress}%</p>
                </div>
                <div className={styles.uploader_progress_detail_container}>上传详情</div>
            </div >

        </div>
    );
}

export default Uploader

