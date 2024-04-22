import { Button, Popconfirm, message } from 'antd'
import { deleteCourse } from '@/api/login'

export const getTableColumns = (ref) => {
  // console.log(ref);

  const valueEnum = {
    1: 'Open',
    2: 'Closed',
    3: 'Processing',
  }
  const confirmDeleteCourse = async(courseId) => {
    console.log(courseId);
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
        <Popconfirm description="确定要删除此条课程信息?" onConfirm={() => confirmDeleteCourse(record.courseId)} >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]
}
