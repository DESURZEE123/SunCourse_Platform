import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getTableColumns } from './tableConfig'
import { getUserList } from '@/api/user'

export default () => {
  const ref = useRef()
  const [isTeacher, setIsTeacher] = useState(false)
  const [page, setPage] = useState(1)
  const columns = getTableColumns({ref, isTeacher})

  const requestUserList = async () => {
    const res = await getUserList({ isTeacher })
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
        request={requestUserList}
        rowKey={(record) => record.Id}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => [
            <Button
              type='primary'
              onClick={() => {
                // console.log(formProps.form.getFieldsValue());
                const { isTeacher } = formProps.form.getFieldsValue()
                setIsTeacher(JSON.parse(isTeacher))
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