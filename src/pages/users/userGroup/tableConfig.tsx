import { Button, Popconfirm, message } from 'antd'
import { useModel } from 'umi'
import { deleteUser } from '@/api/user'

export const getTableColumns = ({ ref, isTeacher }) => {
  const { departMapList, courseMapList, classMapList } = useModel('course')

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
      valueEnum: departMapList,
      fieldProps: {
        placeholder: '请选择学院',
      },
      render: (_, record) => departMapList.get(record.departId) ?? '-'
    },
    {
      title: '班级',
      dataIndex: 'classId',
      width: 200,
      valueType: 'select',
      // valueEnum: valueEnum,
      hideInSearch: true,
      render: (_, record) => classMapList.get(record?.classId) ?? '-'
    },
    {
      title: '所选/所教课程',
      dataIndex: 'courseId',
      hideInSearch: true,
      width: 350,
      render: (_, record) => {
        const courseIdList = JSON.parse(record.courseId)
        if (!courseIdList) return '-'
        courseIdList.map((item, index) => {
          courseIdList[index] = courseMapList.get(item) ?? '-'
          return courseIdList[index]
        })
        return courseIdList.join('，')
      }
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
