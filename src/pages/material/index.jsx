import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { getTableColumns } from './tableConfig'

const Material = () => {
  const columns = getTableColumns()

  return (
    <>
      <div>课程资料</div>
      <ProTable
        className='couponEffect-page'
        rowKey={(record) => record.activityId}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => [
            <Button
              type='primary'
              key='primary'
              onClick={() => {
                formProps?.form?.submit()
              }}
            >
              搜索
            </Button>
          ]
        }}
        columns={columns}
        options={false}
        scroll={{
          x: 1280
        }}
      />
    </>
  )
}

export default Material
