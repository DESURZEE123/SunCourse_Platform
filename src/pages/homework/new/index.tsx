import React, { useState } from 'react';
import { Space, Button, message, Steps, Form, Input, DatePicker, Divider, Flex } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { FORM_TITLE, FORM_DATE, FORM_DESCRIPTION, FORM_SHORTANSWER, FORM_SELECT, FORM_SELECTQUSITION, FORM_SELECTANSWER, FORM_TRUEFALSE } from '../../../constants'
import styled from 'styled-components'

const StepContent = styled.div`
  min-height: 260px;
  color: rgba(0, 0, 0, 0.45);
  background-color: #ffffff;
  border-radius: 8px;
  border: 8px;
  margin-top: 16px;
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
  const [current, setCurrent] = useState(1)
  const [selectNumber, setSelectNumber] = useState(1)

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const FormSelect = ({ index: number }) => {
    console.log(number);

    const options = ['A', 'B', 'C', 'D']
    return (
      <>
        <Form.Item name={[FORM_SELECT, `${number}`, FORM_SELECTQUSITION]} label={`单选${number}`} >
          <Input />
        </Form.Item>
        <Flex>
          {options.map((option, index) => (
            <Form.Item
              name={[FORM_SELECT, `${number}`, FORM_SELECTANSWER, option]}
              label={option}
              style={{ marginRight: index < options.length - 1 ? '10px' : undefined }}
            >
              <Input />
            </Form.Item>
          ))}
        </Flex>
      </>
    )
  }

  const onChange = (changedValues, allValues) => {
    console.log(allValues);

  }
  // 需要加上发布状态、发布人
  return (
    <PageContainer>
      <Steps current={current} items={items} />
      <StepContent>
        <Form onValuesChange={onChange}>
          {current === 0 &&
            <div style={{ padding: '20px' }}>
              <Form.Item name={FORM_TITLE} label="作业名称">
                <Input />
              </Form.Item>
              <Form.Item name={FORM_DATE} label="作业期限">
                <DatePicker.RangePicker size='large' allowClear={false} />
              </Form.Item>
              <Form.Item name={FORM_DESCRIPTION} label="作业描述">
                <Input.TextArea style={{ minHeight: '100px' }} />
              </Form.Item>
            </div>
          }
          {current === 1 &&
            <div style={{ padding: '15px' }}>
              <Flex justify={'space-between'} style={{ marginBottom: '10px' }}>
                <h3 style={{ marginRight: '20px', fontWeight: 'bold' }}>设置单选题</h3>
                <Button shape='circle' icon={<PlusSquareOutlined />} onClick={() => { setSelectNumber(selectNumber + 1) }} />
              </Flex>
              {Array.from({ length: selectNumber }, (_, index) => (
                <>
                  <FormSelect index={index + 1} />
                  <Divider />
                </>
              ))}
            </div>}
          {current === 2 && <div>2-content</div>}
        </Form>

      </StepContent>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
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
