import { Button, Form } from 'antd'
import EditTree from './EditTree'

export default () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  const onReset = () => {
    // form.resetFields()
  }

  return (
    <Form onFinish={onFinish}>
      <Form.Item name={'editDirectory'}>
        <EditTree />
      </Form.Item>
      <Form.Item>
        <Button htmlType='button' onClick={onReset} style={{ marginRight: '10px' }}>
          取消
        </Button>
        <Button type='primary' htmlType='submit'>
          确定
        </Button>
      </Form.Item>
    </Form>
  )
}
