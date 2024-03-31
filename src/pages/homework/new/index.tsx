import React, { useState } from 'react';
import { Button, message, Steps, Form, Input, DatePicker } from 'antd';
import { PageContainer } from '@ant-design/pro-components'
import { FORM_TITLE, FORM_DATE, FORM_DESCRIPTION } from '../../../constants'
import styled from 'styled-components'

const StepContent = styled.div`
  height: 260px;
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
    title: '作业内容',
    content: 'Second-content',
  },
  {
    title: '作业发布',
    content: 'Last-content',
  },
];

export default () => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const items = steps.map((item) => ({ key: item.title, title: item.title }));


  // 需要加上发布状态、发布人
  return (
    <PageContainer>
      <Steps current={current} items={items} />
      <StepContent>
        <Form>
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
            <div>

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
