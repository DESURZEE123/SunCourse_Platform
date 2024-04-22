import { Button, Popconfirm, message } from 'antd'
// 引入学院、班级、课程Id对应的映射关系
import { deleteUser } from '@/api/user'

export const getTableColumns = ({ ref, isTeacher }) => {

  const confirmDeleteUser = async (Id) => {
    const res = await deleteUser(Id)
    if (res) {
      ref.current.reload()
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  };

  return [
    {
      title: isTeacher ? '教工号' : '学号',
      dataIndex: isTeacher ? 'teaId' : 'stuId',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '身份',
      dataIndex: 'isTeacher',
      width: 200,
      valueType: 'select',
      valueEnum: { true: '老师', false: '学生' },
      render: (_, record) => record.teaId ? '老师' : '学生'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      hideInSearch: true
    },
    {
      title: '学院',
      dataIndex: 'departId',
      width: 200,
      valueType: 'select',
      // valueEnum: valueEnum,
      fieldProps: {
        placeholder: '请选择学院',
      }
    },
    {
      title: '班级',
      dataIndex: 'classId',
      width: 200,
      valueType: 'select',
      // valueEnum: valueEnum,
      hideInSearch: true,
      render: (_, record) => record?.classId ?? '-'
    },
    {
      title: '所选/所教课程',
      dataIndex: 'courseId',
      hideInSearch: true,
      width: 350
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm description="确定要删除此条人员信息?"
          onConfirm={() => {
            const Id = record?.teaId || record?.stuId
            let isTeacher = false
            if (record?.teaId) isTeacher = true
            confirmDeleteUser({ Id, isTeacher })
          }}>
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]
}
