import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Drawer, Table, Pagination } from 'antd';

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

const data2 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const ExpandedRowComponent = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    { title: '专业号', width: 200, dataIndex: 'key' },
    { title: '专业名称', width: 400, dataIndex: 'name' },
    {
      title: '操作',
      // width: 100,
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
  const ClassColumns = [
    {
      title: '班级号',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '年级',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '班级名称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '人数',
      dataIndex: 'key',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            description="确定要删除此条班级信息?"
            onConfirm={confirm}
          >
            <Button type='link' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
      <Drawer title="详细专业班级信息" onClose={onClose} open={open} size={'large'}>
        <Table columns={ClassColumns} dataSource={currentDataSource}/>
      </Drawer>
    </>

  );
};