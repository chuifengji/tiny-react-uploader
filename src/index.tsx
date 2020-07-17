
import React, { useState, useEffect } from 'react';
let Uploader = function (props) {
    const [upload_progress, setUpload_progress] = useState(0);//upload progress
    useEffect(() => {
        console.log('use effect!')
    });
    return <div>上传进度: {upload_progress}%</div>;
}

export default Uploader