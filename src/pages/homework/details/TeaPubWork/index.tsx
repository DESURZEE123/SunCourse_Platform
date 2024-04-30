import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Radio, Space, Table, Card } from 'antd'
import { PageContainer } from '@ant-design/pro-components'
import { useModel, history } from 'umi'
import { getHomeworkDetail } from '@/api/homework'
import { storage } from '@/utils'

import styled from 'styled-components'

const Info = styled.div``

const QuestionTitle = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #c5c5c5;
`
const user = storage.getItem('userInfo1')
export default () => {
  const homework_id = history.location.search.split('=')[1] as unknown as number
  const { teacherMapList } = useModel('course')
  const [dataSource, setDataSource] = useState([])
  const [select, setSelect] = useState([])
  const [short, setShort] = useState([])

  const getHomeworkAnswer = async () => {
    const res = await getHomeworkDetail({ homework_id })
    const { data, select, short } = res
    const dataSources = [{
      select: data.select_score * select.length,
      short: data.short_score * short.length,
      total: data.select_score * select.length + data.short_score * short.length
    }]
    setDataSource(dataSources)
    setSelect(select)
    setShort(short)
  }
  useEffect(() => {
    getHomeworkAnswer()
  }, [])

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

  const initialState = select.reduce((acc, item) => ({ ...acc, [item.id]: item.answer }), {});
  const [selectedValues, setSelectedValues] = useState(initialState);
  const onChange = (id) => (e) => {
    console.log(e.target.value);

    setSelectedValues(prevValues => ({
      ...prevValues,
      [id]: e.target.value,
    }));
  };
  console.log(short);

  // const onChange = (selectId, e) => {
  //   form.setFieldsValue({ [`radio${selectId}`]: e.target.value });
  // };

  return (
    <PageContainer>
      <Info>出题人：{teacherMapList.get(parseInt(user.teaId))}</Info>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <QuestionTitle>一、单选题(共{select?.length}题，每题{dataSource[0]?.select / select?.length}分)</QuestionTitle>
      <Card>
        {select.map((item, index) => (
          <>
            {index + 1}.{item.question}
            {/* <Form.Item key={item.id} name={`radio${index + 1}`}> */}
            {/* <Radio.Group onChange={(e) => onChange(index + 1, e)} value={form.getFieldValue(`radio${index + 1}`)}> */}
            {/* <Radio.Group onChange={onChange(item.id)} value={selectedValues[item.id]}> */}
            <div>
              <Radio.Group value={item.answer}>
                <Radio value={item.option_A}>{item.option_A}</Radio>
                <Radio value={item.option_B}>{item.option_B}</Radio>
                <Radio value={item.option_C}>{item.option_C}</Radio>
                <Radio value={item.option_D}>{item.option_D}</Radio>
              </Radio.Group>
            </div>
            {/* </Form.Item> */}
          </>
        ))}
      </Card>
      <QuestionTitle>二、简答题(共{short?.length}题，每题{dataSource[0]?.short / short?.length}分)</QuestionTitle>
      <Card>
        {short.map((item) => (
          <>
            {item.id}.{item.question}
            {/* <Form.Item key={item.id} name={`short${item.id}`}> */}
              <Input.TextArea value={item.answer}/>
            {/* </Form.Item> */}
          </>
        ))}
      </Card>
    </PageContainer>
  )
}
