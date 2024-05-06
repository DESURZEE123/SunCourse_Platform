import OSS from 'ali-oss';
import { PlusOutlined } from '@ant-design/icons'
import { Upload, message, Form } from 'antd'

const client = new OSS({
  region: 'oss-cn-beijing',
  bucket: 'desu-yun-test',
  accessKeyId: '',
  accessKeySecret: '',
});

export default ({ fileName, labelName, name }) => {
  const checkFileSize = (file) => {
    // const maxSize = 10 * 1024 * 1024;
    // if (file.size > maxSize) {
    //   message.error('文件大小超过限制（10MB）');
    //   return false; 
    // }
    // return true; 
  };

  const uploadPath = (path, file) => {
    // return `${path}/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}`;
    return `${path}/${file.name.split(".")[0]}.${file.type.split("/")[1]}`;
  };

  const OssUpload = async (option) => {
    const { file, onSuccess, onProgress, onError } = option;
    const folder = fileName
    const url = uploadPath(folder, file);
    let data = null;
    try {
      data = await client.multipartUpload(url, file, {
        progress: function (p) {
          console.log("获取进度条的值==>", (p * 100).toFixed(2));
          onProgress({ percent: (p * 100).toFixed(2) }, file);
        },
      });
      onSuccess(
        data,
        file,
      );
    } catch (e) {
      // message.error(e.message);
      onError(e);
    }
  };
  const uploadProps = {
    showUploadList: true,
    customRequest: OssUpload,
    listType: "picture-card",
    onChange(info: any) {
      console.log("onChange😊===》", info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log(`${info.file.name} 文件上传成功`);
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === "error") {
        info.fileList = info.fileList.filter(
          (item) => item.uid !== info.file.uid,
        );
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <Form.Item name={name || 'material'} label={labelName}>
      <Upload {...uploadProps}>
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      </Upload>
    </Form.Item>

  )
}