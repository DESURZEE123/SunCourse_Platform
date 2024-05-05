import { useState } from 'react'
import UploadImage from '@/components/UploadImage'
import { Button, Form, Input, Modal, message } from 'antd'
import { newDiscuss } from '@/api/discuss'
import { TITLE, CONTENT, MATERIAL } from '@/constants'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

export default () => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setOpen(true)
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    const idDiscussion = Date.now()
    const belongId = idDiscussion
    const data = { ...values, idDiscussion, belongId, idCourse: 1, replayId: 0, DisName: 'wyy' }
    const res = await newDiscuss(data)
    message.success('新建成功')

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
          <UploadImage />
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
