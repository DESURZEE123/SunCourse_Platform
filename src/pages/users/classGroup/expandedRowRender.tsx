import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { expandedClass } from './expandedClass.tsx'

const data = [
  {
    "key": 0,
    "date": "2014-12-24 23:12:00",
    "name": "This is production name",
    "upgradeNum": "20"
  },
  {
    "key": 1,
    "date": "2014-12-24 23:12:00",
    "name": "This is production name",
    "upgradeNum": "19"
  },
  {
    "key": 2,
    "date": "2014-12-24 23:12:00",
    "name": "This is production name",
    "upgradeNum": "18"
  }
]
export const expandedRowRender = () => {

  const columns = [
    { title: '专业号', dataIndex: 'key' },
    { title: '专业名称', dataIndex: 'name' },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm
          description="确定要删除此条班级信息?"
          onConfirm={confirm}
        >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]
  return (
    <ProTable
      expandable={{ expandedRowRender: expandedClass }}
      columns={columns}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};