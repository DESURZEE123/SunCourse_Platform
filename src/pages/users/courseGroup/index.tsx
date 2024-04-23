import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getCourseList } from '@/api/user'
import { getTableColumns } from './tableConfig'

export default () => {
  const [page, setPage] = useState(1)
  const ref = useRef()
  const columns = getTableColumns(ref)

  // ref.current.reload()
  const requestList = async() => {
    const res = await getCourseList()
    const params = { pageSize: 10, current: 1 }
    return res
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
        request={requestList}
        rowKey={(record) => record.Id}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => [
            <Button
              type='primary'
              onClick={() => {
                // console.log(formProps.form.getFieldsValue());
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