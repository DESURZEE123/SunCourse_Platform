import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Radio, Flex, Watermark, message } from 'antd'
import { PageContainer } from '@ant-design/pro-components'
import { useModel, history } from 'umi'
import { storage } from '@/utils'
import { getHomeworkDetailStudent, submitHomework } from '@/api/homework'

import styled from 'styled-components'

const QImage = require('../../../../assets/images/题目1.jpeg')

const QuestionTitle = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #c5c5c5;
`

const user = storage.getItem('userInfo1')
const courseId = storage.getItem('courseId')
export default () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [select, setSelect] = useState([])
  const [short, setShort] = useState([])
  const homework_id = history.location.search.split('=')[1] as unknown as number

  const getHomeworkQuestion = async () => {
    const res = await getHomeworkDetailStudent({ homework_id })
    const { data, select, short } = res
    const dataSources = [{
      select: data.select_score * select.length,
      short: data.short_score * short.length,
      total: data.select_score * select.length + data.short_score * short.length
    }]
    console.log(res);
    setDataSource(dataSources)
    setSelect(select)
    setShort(short)
  }

  useEffect(() => {
    getHomeworkQuestion()
  }, [])

  const onFinish = async (values: any) => {
    console.log(values)
    const selectAnswer = select.map((item) => ({ id: item.id, answer: values[`select${item.id}`] }))
    const shortAnswer = short.map((item) => ({ id: item.id, answer: values[`short${item.id}`] }))
    const params = {
      homework_id,
      stuId: user.stuId,
      courseId,
      select: JSON.stringify(selectAnswer),
      short: JSON.stringify(shortAnswer),
      isFinish: 1,
      isMark: 0 // 0 未批改 1 已批改
    }
    const res = await submitHomework(params)
    if (res.status === 200) {
      message.success('提交成功')
      history.push('/homework/my')
    }
  }
  return (
    <PageContainer>
      <Watermark content={user.stuId} font={{ fontSize: '10' }} gap={[110, 100]}>
        {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
        <Form form={form} name='control-hooks' onFinish={onFinish} style={{ padding: '0 20px', backgroundColor: '#fff' }}>
          {/* 选择题 */}
          <div>
            <QuestionTitle>一、单选题(共{select?.length}题，每题{dataSource[0]?.select / select?.length}分)</QuestionTitle>
            {select.map((item) => (
              <div key={item.id}>
                {item.id}.{item.question}
                <Form.Item name={`select${item.id}`}>
                  <Radio.Group>
                    <Radio value={item.option_A}>{item.option_A}</Radio>
                    <Radio value={item.option_B}>{item.option_B}</Radio>
                    <Radio value={item.option_C}>{item.option_C}</Radio>
                    <Radio value={item.option_D}>{item.option_D}</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            ))}
          </div>
          {/* 简答题 */}
          <div>
            <QuestionTitle>二、简答题(共{short?.length}题，每题{dataSource[0]?.short / short?.length}分)</QuestionTitle>
            <div>
              {short.map((item) => (
                <div key={item.id}>
                  <div>第{item.id}题.{item.question}</div>
                  {/* <Image preview={false} src={QImage} /> */}
                  <Form.Item name={`short${item.id}`}>
                    <Input.TextArea />
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>
          <Form.Item>
            <Flex justify="center" style={{ margin: '10px 0' }}>
              <Button type='primary' onClick={() => form.resetFields()} style={{ marginRight: '20px' }}>
                重置
              </Button>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Watermark >
    </PageContainer>
  )
}
