import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { ExpandedRowComponent } from './expandedRowRender.tsx'
import { deleteDepart } from '@/api/user'

const tableListDataSource =
  [
    {
      "departId": 0,
      "name": "管理工程学院",
      "status": 10,
      "createdAt": 1712903591723
    },
    {
      "departId": 1,
      "name": "计算机学院",
      "status": 11,
      "createdAt": 1712903559699
    },
    {
      "departId": 2,
      "name": "金融学院",
      "status": 1,
      "createdAt": 1712903597202
    },
    {
      "departId": 3,
      "name": "人文学院",
      "status": 5,
      "createdAt": 1712903586967
    },
    {
      "departId": 4,
      "name": "土木学院",
      "status": 7,
      "createdAt": 1712903546267
    }
  ]


export default () => {
  const ref = useRef()

  const confirmDeleteUser = async (departId) => {
    const res = await deleteDepart({ departId })
    if (res) {
      ref.current?.reload()
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  };

  console.log(tableListDataSource);

  const columns = [
    {
      title: '学院号',
      width: 120,
      dataIndex: 'departId'
    },
    {
      title: '学院名称',
      width: 120,
      dataIndex: 'name'
    },
    {
      title: '专业数',
      width: 120,
      dataIndex: 'status',
      render: (_, record) => record.status

    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm description="确定要删除此条学院信息?" onConfirm={() => confirmDeleteUser(record.departId)}>
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="departId"
        pagination={{
          showQuickJumper: true,
        }}
        expandable={{ expandedRowRender: record => <ExpandedRowComponent departId={record.departId} /> }}
        search={false}
        dateFormatter="string"
        headerTitle="学院/专业信息"
        options={false}
        toolBarRender={() => [
          <Button key="primary" type="primary">
            创建学院
          </Button>,
          <Button key="primary" type="primary">
            创建专业班级
          </Button>
        ]}
      />
    </PageContainer>

  );
};