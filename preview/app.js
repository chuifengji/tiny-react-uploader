import React from 'react'
import ReactDom from 'react-dom'
import FileUploader from '../src'
const props = {
    hint: '上传文件大小不要超过5M'
}
ReactDom.render(<div style={{ width: "50vw", height: "90vh", position: "relative" }}> <FileUploader {...props} /></div >, document.getElementById('app'))
