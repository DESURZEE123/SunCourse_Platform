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
      title: '学号/教工号',
      dataIndex: 'Id',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '身份',
      dataIndex: 'Id',
      width: 200,
      valueType: 'select',
      valueEnum: valueEnum,
    },
    {
      title: '姓名',
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
      title: '班级',
      dataIndex: 'className',
      width: 200,
      valueType: 'select',
      valueEnum: valueEnum,
      fieldProps: {
        placeholder: '请选择班级'
      }
    },
    {
      title: '所选/所教课程',
      dataIndex: 'course',
      hideInSearch: true,
      width: 350
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
