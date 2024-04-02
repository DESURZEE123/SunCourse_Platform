import React, { useState, useMemo } from 'react';
import { InputNumber, Space, Tooltip, Button, message, Steps, Form, Input, DatePicker, Divider, Flex, Select } from 'antd';
import { PlusSquareOutlined, EyeOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import {
  FORM_SELECT_SCORE,
  FORM_ANSWER_SCORE,
  FORM_STATUS,
  FORM_AUTHOR,
  FORM_TITLE,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_SHORT,
  FORM_SHORTANSWER,
  FORM_SHORTQUESTION,
  FORM_SELECT,
  FORM_SELECTOPTION,
  FORM_SELECTQUSITION,
  FORM_SELECTANSWER,
  FORM_TRUEFALSE
} from '../../../constants'
import styled from 'styled-components'

const StepContent = styled.div`
  min-height: 260px;
  margin-top: 16px;
  padding: 15px;
  background-color: #ffffff;
  border: 8px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.45);
`

const steps = [
  {
    title: '作业信息',
    content: 'First-content',
  },
  {
    title: '作业内容—客观题',
    content: 'Second-content',
  },
  {
    title: '作业内容—主观题',
    content: 'Second-content',
  },
  {
    title: '作业发布',
    content: 'Last-content',
  },
];

export default () => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(3)
  const [formContext, setFormContext] = useState({})
  const [selectNumber, setSelectNumber] = useState(1)
  const [answerNumber, setAnswerNumber] = useState(1)
  const [answerScore, setAnswerScore] = useState(0)
  const [selectScore, setSelectScore] = useState(0)

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const FormSelect = ({ index: number }) => {
    const options = [
      { label: '选项一', value: 'A' },
      { label: '选项二', value: 'B' },
      { label: '选项三', value: 'C' },
      { label: '选项四', value: 'D' }
    ]
    return (
      <>
        <Form.Item name={[FORM_SELECT, `${number}`, FORM_SELECTQUSITION]} label={`单选${number}`} >
          <Input />
        </Form.Item>
        <Flex>
          {options.map((item, index) => (
            <Form.Item
              name={[FORM_SELECT, `${number}`, FORM_SELECTOPTION, item.value]}
              label={item.label}
              style={{ marginRight: index < options.length - 1 ? '10px' : undefined }}
            >
              <Input />
            </Form.Item>
          ))}
        </Flex>
        <Form.Item name={[FORM_SELECT, `${number}`, FORM_SELECTANSWER]} label='答案'>
          <Select options={options} style={{ width: '200px' }} />
        </Form.Item>
      </>
    )
  }

  const next = () => {
    setCurrent(current + 1)
    setFormContext((prevCount) => {
      return { ...prevCount, ...form.getFieldsValue() }
    })
  }

  const onFinish = () => {
    setFormContext((prevCount) => {
      return { ...prevCount, ...form.getFieldsValue(), author: 'wyy' }
    })
    // message.success('Processing complete!')
  }

  console.log(formContext)

  return (
    <PageContainer>
      <Steps current={current} items={items} />
      <StepContent>
        <Form form={form}>
          {current === 0 &&
            <>
              <Form.Item name={FORM_TITLE} label="作业名称">
                <Input />
              </Form.Item>
              <Form.Item name={FORM_DATE} label="作业期限">
                <DatePicker.RangePicker size='large' allowClear={false} />
              </Form.Item>
              <Form.Item name={FORM_DESCRIPTION} label="作业描述">
                <Input.TextArea style={{ minHeight: '100px' }} />
              </Form.Item>
            </>}
          {current === 1 &&
            <>
              <Flex justify={'space-between'} style={{ marginBottom: '10px' }}>
                <Space>
                  <h3 style={{ fontWeight: 'bold' }}>设置简答题</h3>
                  <Tooltip title="选项数为2时，题型为判断题">
                    <EyeOutlined />
                  </Tooltip>
                </Space>
                <Button shape='circle' icon={<PlusSquareOutlined />} onClick={() => { setSelectNumber(selectNumber + 1) }} />
              </Flex>
              {Array.from({ length: selectNumber }, (_, index) => (
                <>
                  <FormSelect index={index + 1} />
                  <Divider />
                </>
              ))}
            </>}
          {current === 2 &&
            <>
              <Flex justify={'space-between'} style={{ marginBottom: '10px' }}>
                <h3 style={{ marginRight: '20px', fontWeight: 'bold' }}>设置简答题</h3>
                <Button shape='circle' icon={<PlusSquareOutlined />} onClick={() => { setAnswerNumber(answerNumber + 1) }} />
              </Flex>
              {Array.from({ length: answerNumber }, (_, index) => (
                <>
                  <Form.Item name={[FORM_SHORT, `${index + 1}`,FORM_SHORTQUESTION]} label={`简答题${index + 1}`}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={[FORM_SHORT, `${index + 1}`, FORM_SHORTANSWER]} label={`答案${index + 1}`}>
                    <Input />
                  </Form.Item>
                  <Divider />
                </>
              ))}
            </>}
          {current === 3 &&
            <>
              <h3 style={{ fontWeight: 'bold' }}>作业发布</h3>
              <Form.Item name={FORM_STATUS} label='发布状态'>
                <Select options={[{ label: '已发布', value: 1 }, { label: '未发布', value: 0 }]} />
              </Form.Item>
              <Form.Item name={FORM_AUTHOR} label='发布人'>
                <div>{'wyy'}</div>
              </Form.Item>
              <Form.Item name={FORM_SELECT_SCORE} label='客观题分数'>
                {selectNumber} × <Form.Item name={FORM_SELECT_SCORE} noStyle><InputNumber onChange={(value) => { setSelectScore(value) }} /></Form.Item> = {selectNumber * selectScore}分
              </Form.Item>
              <Form.Item name={FORM_ANSWER_SCORE} label='主观题分数'>
                {answerNumber} × <Form.Item name={FORM_ANSWER_SCORE} noStyle><InputNumber onChange={(value) => { setAnswerScore(value) }} /> </Form.Item> = {answerNumber * answerScore}分
              </Form.Item>
              总分：{selectNumber * selectScore + answerNumber * answerScore}分
            </>}
        </Form>

      </StepContent>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>下一步</Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinish}>
            完成
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
            上一步
          </Button>
        )}
      </div>
    </PageContainer>
  );
};
