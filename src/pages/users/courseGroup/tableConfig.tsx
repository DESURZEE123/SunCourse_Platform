import { Button, Popconfirm, message } from 'antd'

export const getTableColumns = (ref) => {
  console.log(ref);
  
  const valueEnum = {
    1: 'Open',
    2: 'Closed',
    3: 'Processing',
  }
  const confirm = (e) => {

    ref.current.reload()
    message.success('删除成功')
  };

  return [
    {
      title: '课程号',
      dataIndex: 'Id',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '课程名',
      dataIndex: 'name',
      width: 200,
      hideInSearch: true
    },
    {
      title: '学院',
      dataIndex: 'depart',
      width: 200,
      valueType: 'select',
      valueEnum: valueEnum,
      fieldProps: {
        placeholder: '请选择学院',
      }
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm
          description="确定要删除此条人员信息?"
          onConfirm={confirm}
        >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]
}
