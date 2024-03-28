import { Table } from 'antd'
import styled from 'styled-components'

const Info = styled.div``

const QuestionTitle = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #c5c5c5;
`

export default () => {
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
  return (
    <>
      <Info>学生：20信管1王怡阳</Info>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <QuestionTitle>一、简答题(共一题,100.0分)</QuestionTitle>
    </>
  )
}
