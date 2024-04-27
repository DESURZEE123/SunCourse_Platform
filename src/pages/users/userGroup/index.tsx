import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getTableColumns } from './tableConfig'
import { getUserList } from '@/api/user'

export default () => {
  const ref = useRef()
  const [isTeacher, setIsTeacher] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const columns = getTableColumns({ ref, isTeacher })

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        request={async() => {
          const res = await getUserList({ isTeacher:false })
          const params = { pageSize: 10, current: 1 }
          setData(res.data)
          return res
        }}
        dataSource={data}
        rowKey={(record) => record.Id}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => [
            <Button
              type='primary'
              onClick={async () => {
                const { isTeacher, departId } = formProps.form.getFieldsValue()
                isTeacher && setIsTeacher(JSON.parse(isTeacher))
                const res = await getUserList({ isTeacher: JSON.parse(isTeacher) })
                const filterData = departId ? res.data.filter(item => item.departId === departId) : res.data
                setData(filterData)
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