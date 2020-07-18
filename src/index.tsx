import React, { useState, useEffect } from 'react';
const styles = require('./index.scss');
let Uploader = function (props) {
    const [upload_progress, setUpload_progress] = useState(0);//upload progress
    useEffect(() => {
        console.log('use effect!')
    });
    return (
        <div>

            <div className={styles.uploader_container}>
                <input className={styles.uploader_clear_style_of_input} type="file"></input>
                <div className={styles.uploader_text_hint}></div>

                <div className={styles.uploader_input_file}></div>

                <div className={styles.uploader_icon_outBox}>
                    <i className={`${styles.uploader_icon} iconfont iconshangchuanwenjian`}></i>
                </div>
                <p className={styles.uploader_text_hint}>{props.hint}</p>

                <div className={styles.uploader_progress_outBox}>
                    <p>上传进度: </p>
                    <div className={styles.uploader_progress_container}>
                        <div className={styles.uploader_progress_color}></div>
                    </div>
                    <p className={styles.uploader_progress_number}>{upload_progress}%</p>
                </div>
            </div >

        </div>
    );
}

export default Uploader

