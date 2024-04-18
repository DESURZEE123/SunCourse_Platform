import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Drawer, Table } from 'antd';
import { getMajorList } from '@/api/user'
import ClassTable from './ClassTable'

const data = [
  {
    "key": 0,
    "name": "信管",
    "upgradeNum": "20"
  },
  {
    "key": 1,
    "name": "大数据",
    "upgradeNum": "19"
  },
  {
    "key": 2,
    "name": "物流工程",
    "upgradeNum": "18"
  }
]

export const ExpandedRowComponent = (departId) => {
  console.log(departId);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const getDataList = async () => {
    const res = await getMajorList(departId)
  }

  const columns = [
    { title: '专业号', width: 200, dataIndex: 'key' },
    { title: '专业名称', width: 400, dataIndex: 'name' },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={showDrawer}>
            详情
          </Button>
          <Popconfirm
            description="确定要删除此条专业信息?"
            onConfirm={confirm}
          >
            <Button type='link' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]


  return (
    <>
      <ProTable
        columns={columns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
      />
      <ClassTable open={open} setOpen={setOpen} />
    </>
  );
};