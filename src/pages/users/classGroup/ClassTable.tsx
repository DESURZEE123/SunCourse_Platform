import React, { useState } from 'react';
import { Button, Popconfirm, Drawer, Table } from 'antd';

export default (props) => {
  const { open, setOpen, classData } = props
  const onClose = () => {
    setOpen(false);
  };
  const ClassColumns = [
    {
      title: '班级号',
      dataIndex: 'classId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '年级',
      dataIndex: 'grand',
    },
    {
      title: '班级名称',
      dataIndex: 'name',
    },
    {
      title: 'Action',
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
    <Drawer title="专业班级详情" onClose={onClose} open={open} size={'large'}>
      <Table columns={ClassColumns} dataSource={classData} pagination={false} />
    </Drawer>
  )
}