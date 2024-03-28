import { Button } from 'antd'

export const getTableColumns = () => {
  return [
    {
      title: '文件名',
      dataIndex: 'activityId',
      width: 200,
      fieldProps: {
        placeholder: '请输入活动ID'
      }
    },
    {
      title: '上传者',
      dataIndex: 'activityName',
      width: 200,
      hideInSearch: true,
      fieldProps: {
        placeholder: '请输入活动名称'
      }
    },
    {
      title: '创建日期',
      dataIndex: 'activityTime',
      valueType: 'dateRange',
      width: 350,
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始时间', '结束时间']
      },
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1]
          }
        }
      }
    },

    {
      title: '创建日期',
      dataIndex: 'activityTime',
      valueType: 'dateRange',
      hideInSearch: true,
      width: 350
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Button type='link' danger>
          查看详情
        </Button>
      )
    }
  ]
}
