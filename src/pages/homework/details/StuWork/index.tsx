import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Radio, Flex, Watermark, message, Table, InputNumber } from 'antd'
import { PageContainer } from '@ant-design/pro-components'
import { useModel, history } from 'umi'
import { storage } from '@/utils'
import { getHomeworkDetail, getHomeworkDetailStudent, submitHomework, getHomeworStudentFinish, markHomework } from '@/api/homework'

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
  const [MarkHomeworkDetail, setMarkHomeworkDetail] = useState([])
  const [select, setSelect] = useState([])
  const [selectAnswerOption, setSelectAnswerOption] = useState([])
  const [short, setShort] = useState([])
  const [title, setTitle] = useState('')
  const params = history.location.search.split('?');
  const homework_id = Number(params?.[1].split('=')[1]);
  const isMark = Number(params?.[2].split('=')[1]);
  const markStuId = Number(params?.[3].split('=')[1]);

  const getHomeworkQuestion = async () => {
    const res = await getHomeworkDetailStudent({ homework_id })
    const { data, select, short } = res
    const dataSources = [{
      select: data.select_score * select.length,
      short: data.short_score * short.length,
      total: data.select_score * select.length + data.short_score * short.length
    }]
    setTitle(data.title)
    // console.log(res);
    setDataSource(dataSources)
    setSelect(select)
    setShort(short)
  }

  const MarkHomework = async () => {
    const res = await getHomeworStudentFinish({ courseId, isMark, isFinish: 1, stuId: markStuId })
    const data = res.data.filter((item) => item.stuId === markStuId)
    setMarkHomeworkDetail(data)
  }

  const getHomeworkAnswer = async () => {
    const res = await getHomeworkDetail({ homework_id })
    const { select } = res
    setSelectAnswerOption(select.map((item) => ({ answer: item.answer })))
  }

  useEffect(() => {
    getHomeworkAnswer()
    MarkHomework()
  }, [isMark])

  useEffect(() => {
    getHomeworkQuestion()
  }, [])

  // 学生答案回显 && 选择自动批改
  useEffect(() => {
    if ((isMark === 1 || isMark === 0) && MarkHomeworkDetail.length !== 0) {
      const Markslected = MarkHomeworkDetail.filter((item) => item.homework_id === homework_id);
      
      const selectAnswer = JSON.parse(Markslected[0].selectAnswer);
      const shortAnswer = JSON.parse(Markslected[0].shortAnswer);

      const formValues = {};

      selectAnswer.forEach(item => {
        formValues[`select${item.id}`] = item.answer;
        const selectedOption = selectAnswerOption;
        select.map((_item) => {
          const answerOption = `option_${_item.answer}`;
          const answerValue = _item[answerOption];

          if (_item.id === item.id) {
            if (answerValue === item.answer) {
              formValues[`mark_select${item.id}`] = dataSource[0]?.select / select?.length;
            } else {
              formValues[`mark_select${item.id}`] = 0;
            }
          }
        })
      });

      shortAnswer.forEach(item => {
        formValues[`short${item.id}`] = item.answer;
      });

      if (isMark === 1) {
        const markShort = JSON.parse(Markslected[0].markShort);
        markShort.forEach(item => {
          formValues[`mark_short${item.id}`] = item.value;
        });
      }

      form.setFieldsValue(formValues);
    }

  }, [MarkHomeworkDetail, dataSource, select, selectAnswerOption]);

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
      isMark: 0, // 0 未批改 1 已批改
      finishDate: new Date(),
      title
    }
    const res = await submitHomework(params)
    if (res.status === 200) {
      message.success('提交成功')
      history.push('/homework/my')
    }
  }

  const finishMark = async () => {
    const allValues = form.getFieldsValue();

    const markShortValues = Object.keys(allValues)
      .filter(key => key.startsWith('mark_short'))
      .map(key => ({
        id: key.replace('mark_short', ''),
        value: allValues[key]
      }));

    const markSelectValues = Object.keys(allValues)
      .filter(key => key.startsWith('mark_select'))
      .map(key => ({
        id: key.replace('mark_select', ''),
        value: allValues[key]
      }));

    const markShortTotal = markShortValues.reduce((total, item) => total + item.value, 0);
    const markSelectTotal = markSelectValues.reduce((total, item) => total + item.value, 0);
    const scoretotal = markShortTotal + markSelectTotal;

    const params = {
      homework_id,
      stuId: markStuId,
      markSelect: JSON.stringify(markSelectValues),
      markShort: JSON.stringify(markShortValues),
      scoretotal,
      courseId,
      isFinish: 1,
      isMark: 1 // 0 未批改 1 已批改
    }
    const res = await markHomework(params)

    if (res.status === 200) {
      message.success('批改完成')
      history.push('/homework/my')
    } else {
      message.error('批改失败')
    }
  }

  const columns = [
    {
      title: '单选题',
      dataIndex: 'select',
    },
    {
      title: '简答题',
      dataIndex: 'short',
    },
    {
      title: '总分',
      dataIndex: 'total',
    }
  ]

  return (
    <PageContainer>
      <Watermark content={user.stuId} font={{ fontSize: '10' }} gap={[110, 100]}>
        {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
        <Form form={form} name='control-hooks' onFinish={onFinish} style={{ padding: '0 20px', backgroundColor: '#fff' }}>
          <h2>{title}</h2>
          {/* 选择题 */}
          <div>
            <QuestionTitle>一、单选题(共{select?.length}题，每题{dataSource[0]?.select / select?.length}分)</QuestionTitle>
            {select.map((item, index) => (
              <div key={item.id}>
                {index + 1}.{item.question}
                <Form.Item name={`select${item.id}`}>
                  <Radio.Group>
                    <Radio value={item.option_A}>{item.option_A}</Radio>
                    <Radio value={item.option_B}>{item.option_B}</Radio>
                    <Radio value={item.option_C}>{item.option_C}</Radio>
                    <Radio value={item.option_D}>{item.option_D}</Radio>
                  </Radio.Group>
                </Form.Item>
                {isMark !== 3 &&
                  <Form.Item name={`mark_select${item.id}`} label={'分数：'}>
                    <InputNumber min={0} max={dataSource[0]?.select / select?.length} />
                  </Form.Item>}
              </div>
            ))}
          </div>
          {/* 简答题 */}
          <div>
            <QuestionTitle>二、简答题(共{short?.length}题，每题{dataSource[0]?.short / short?.length}分)</QuestionTitle>
            <div>
              {short.map((item, index) => (
                <div key={item.id}>
                  <div>第{index + 1}题.{item.question}</div>
                  {item?.file && <Image preview={false} src={item?.file} />}
                  <Form.Item name={`short${item.id}`}>
                    <Input.TextArea />
                  </Form.Item>
                  {isMark !== 3 &&
                    <Form.Item name={`mark_short${item.id}`} label={'分数：'}>
                      <InputNumber min={0} max={dataSource[0]?.short / short?.length} />
                    </Form.Item>}
                  {/* <Form.Item name={`mark_short${item.id}`} label={'分数：'}>
                    <InputNumber />
                  </Form.Item> */}
                </div>
              ))}
            </div>
          </div>
          <Form.Item>
            <Flex justify="center" style={{ margin: '10px 0' }}>
              {isMark === 0 && <Button type='primary' onClick={() => finishMark()} style={{marginRight:'10px'}}>批改完成</Button>}
              {isMark === 3 && (<>
                <Button type='primary' onClick={() => form.resetFields()} style={{ marginRight: '20px' }}>
                  重置
                </Button>
                <Button type='primary' htmlType='submit'>提交</Button>
              </>
              )}
              {isMark !== 3 && <Button type='primary' onClick={() => history.push('/homework/my')}>返回</Button>}
            </Flex>
          </Form.Item>
        </Form>
      </Watermark >
    </PageContainer >
  )
}
