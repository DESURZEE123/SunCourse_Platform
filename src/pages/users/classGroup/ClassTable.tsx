import React, { useState } from 'react';
import { Button, Popconfirm, Drawer, Table } from 'antd';

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
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default (props) => {
  const { open, setOpen } = props
  const onClose = () => {
    setOpen(false);
  };
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
        <Popconfirm
          description="确定要删除此条班级信息?"
          onConfirm={confirm}
        >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Drawer title="详细专业班级信息" onClose={onClose} open={open} size={'large'}>
      <Table columns={ClassColumns} dataSource={data2} pagination={false} />
    </Drawer>
  )
}