import { useState } from 'react'
import { useModel } from 'umi'
import { Button, Form, Input, Modal, message } from 'antd'
import UploadImage from '@/components/UploadImage'
import { newDiscuss } from '@/api/discuss'
import { storage } from '@/utils'
import { TITLE, CONTENT, MATERIAL } from '@/constants'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const courseId = storage.getItem('courseId')
const user = storage.getItem('userInfo1')
export default () => {
  const { teacherMapList, studentMapList } = useModel('course')

  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setOpen(true)
  }

  const onFinish = async (values: any) => {
    let fileName
    if (form.getFieldValue(MATERIAL)) {
      const url = form.getFieldValue(MATERIAL)?.file?.response?.res?.requestUrls?.[0]
      const parsedUrl = new URL(url);
      fileName = parsedUrl.origin + parsedUrl.pathname;
    }
    const idDiscussion = Date.now() % 100000
    const belongId = idDiscussion
    const DisName = user?.teaId ? teacherMapList.get(parseInt(user.teaId)) : studentMapList.get(parseInt(user.stuId))
    const data = {
      ...values,
      material: fileName,
      data:new Date(),
      idDiscussion,
      belongId,
      idCourse: courseId,
      replayId: 0,
      DisName, 
      nameId: user?.teaId || user?.stuId
    }
    const res = await newDiscuss(data)
    if (res.status === 200) {
      message.success('新建成功');
      setTimeout(() => {
        location.reload();
      }, 1300)
    } else {
      message.error('新建失败');
    }

    setOpen(false)
  }

  const onReset = () => {
    form.resetFields()
    setOpen(false)
  }

  return (
    <>
      <Button type='link' style={{ marginRight: '30px' }} onClick={showModal}>
        新建话题
      </Button>
      <Modal title='新建话题' closable={false} open={open} footer={null}>
        <Form form={form} {...layout} onFinish={onFinish}>
          <Form.Item name={TITLE} label='话题名称' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={CONTENT} label='描述'>
            <Input.TextArea />
          </Form.Item>
          <UploadImage fileName={'discuss'} labelName={'添加图片'} />
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button htmlType='button' onClick={onReset} style={{ marginRight: '10px' }}>
              取消
            </Button>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
