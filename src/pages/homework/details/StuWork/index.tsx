import { Button, Form, Image, Input, Radio, Space, Table } from 'antd'
import styled from 'styled-components'
const QImage = require('../../../../assets/images/题目1.jpeg')
const Info = styled.div``

const QuestionTitle = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #c5c5c5;
`

export default () => {
  const [form] = Form.useForm()
  const onChange1 = ({ target: { value } }: { target: { value: string } }) => {
    console.log('radio1 checked', value)
    // setValue1(value)
  }
  const dataSource = [
    {
      key: '1',
      name: 'John',
      age: 32,
      address: 'New York'
    }
  ]

  const columns = [
    {
      title: '单选',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '判断',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '简答题',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '总分',
      dataIndex: 'address',
      key: 'address'
    }
  ]
  const selectOption = [
    {
      id: 1,
      title: '第一题',
      isSingle: true,
      option: [
        { label: 'Apple', value: '1' },
        { label: 'Pear', value: '2' },
        { label: 'Orange', value: '3' }
      ]
    },
    {
      id: 2,
      title: '第二题',
      isSingle: true,
      option: [
        { label: 'Apple', value: '1' },
        { label: 'Pear', value: '2' },
        { label: 'Orange', value: '3' }
      ]
    },
    {
      id: 3,
      title: '第三题',
      isSingle: true,
      option: [
        { label: 'Apple', value: '1' },
        { label: 'Pear', value: '2' },
        { label: 'Orange', value: '3' }
      ]
    }
  ]

  const shortQ = [
    {
      id: 1,
      title: '阅读案例内容，结合所学竞争战略知识，分析宜家低成本战略是如何实现的。'
    },
    {
      id: 1,
      title: '阅读案例内容，结合所学竞争战略知识，分析宜家低成本战略是如何实现的。'
    }
  ]

  const onFinish = (values: any) => {
    console.log(values)
  }
  return (
    <>
      <Info>姓名：王怡阳 班级：20信管1 成绩：100</Info>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Form form={form} name='control-hooks' onFinish={onFinish} style={{ padding: '0 20px', backgroundColor: '#fff' }}>
        {/* 选择题 */}
        <div>
          <QuestionTitle>一、选择题(共3题,30.0分)</QuestionTitle>
          {selectOption.map((item) => {
            return (
              <div key={item.id}>
                <div>
                  {item.id}.{item.title}
                </div>
                <Form.Item name='radio1'>
                  <Radio.Group options={item.option} onChange={(e) => onChange1(e.target.value)} />
                </Form.Item>
              </div>
            )
          })}
        </div>

        {/* 简答题 */}
        <div>
          <QuestionTitle>二、简答题(共2题,70.0分)</QuestionTitle>
          <div>
            {shortQ.map((item, index) => (
              <div key={index}>
                <div>第{index + 1}题</div>
                <Image preview={false} src={QImage} />
                <div>{item.title}</div>
                <Form.Item name='radio2'>
                  <Input.TextArea />
                </Form.Item>
              </div>
            ))}
          </div>
        </div>

        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
            <Button type='primary'>提交</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
