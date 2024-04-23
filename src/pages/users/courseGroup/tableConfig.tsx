import { Button, Popconfirm, message } from 'antd'
import { useModel } from 'umi'
import { deleteCourse } from '@/api/user'

export const getTableColumns = (ref) => {
  const { departMapList } = useModel('course')

  const confirmDeleteCourse = async(courseId) => {
    const res = await deleteCourse({courseId})
    if(res) {
      ref.current.reload()
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  };

  return [
    {
      title: '课程号',
      dataIndex: 'courseId',
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
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm description="确定要删除此条课程信息?" onConfirm={() => confirmDeleteCourse(record.courseId)} >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]
}
