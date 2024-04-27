import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getCourseList } from '@/api/user'
import { getTableColumns } from './tableConfig'

export default () => {
  const [page, setPage] = useState(1)
  const ref = useRef()
  const columns = getTableColumns(ref)
  const [data, setData] = useState([])

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        request={async () => {
          const res = await getCourseList()
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
                const { departId } = formProps.form.getFieldsValue()
                const res = await getCourseList()
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