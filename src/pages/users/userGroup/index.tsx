import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getTableColumns } from './tableConfig'
import { getUserList } from '@/api/user'

var jsonData = require('./temp.json')
const StuData = {
  "data": [
      {
          "stuId": 1111111,
          "name": "学生2",
          "class": "19信管1",
          "password": "7777",
          "classId": 151,
          "depertId": 11
      },
      {
          "stuId": 11152001,
          "name": "王怡阳",
          "class": "20信管1",
          "password": "123456",
          "classId": 15,
          "depertId": 11
      }
  ],
  "message": true,
  "total": 2
}
export default () => {
  const ref = useRef()
  const [isTeacher, setIsTeacher] = useState('false')
  const [page, setPage] = useState(1)
  const columns = getTableColumns(ref)

  const requestUserList = () => {
    console.log(1111, isTeacher);
    const res = getUserList({ isTeacher })
    const params = { pageSize: 10, current: 1 }
    return jsonData
    // const msg = await myQuery({
    //   page: params.current,
    //   pageSize: params.pageSize,
    // });
    // return {
    //   data: msg.result,
    //   // success 请返回 true，
    //   // 不然 table 会停止解析数据，即使有数据
    //   success: boolean,
    //   // 不传会使用 data 的长度，如果是分页一定要传
    //   total: number,
    // };
  }
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        request={requestUserList}
        rowKey={(record) => record.Id}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => [
            <Button
              type='primary'
              onClick={() => {
                console.log(formProps.form.getFieldsValue());
                const { isTeacher } = formProps.form.getFieldsValue()
                setIsTeacher(isTeacher)
                formProps?.form?.submit()
              }}
            >
              搜索
            </Button>
          ]
        }}
        pagination={{
          pageSize: 10,
          total: 12,
          current: page,
          onChange: page => setPage(page),
        }}
        columns={columns}
        options={false}
        scroll={{
          x: 120
        }}
      />
    </PageContainer>
  )
}