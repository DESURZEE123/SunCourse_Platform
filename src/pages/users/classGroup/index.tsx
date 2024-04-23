import { useRef, useState } from 'react'
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm, message, Modal, Input, Form, Space } from 'antd';
import { ExpandedRowComponent } from './expandedRowRender.tsx'
import { addDepart, deleteDepart, addMajor, getDepartList } from '@/api/user'

export default () => {
  const ref = useRef()
  const [showDepartModal, setShowDepartModal] = useState(false)
  const [showMajorModal, setShowMajorModal] = useState(false)
  const [inputVlue, setInputValue] = useState('')

  const addDepartment = async () => {
    const res = await addDepart({ name: inputVlue })
    if (res) {
      setShowDepartModal(false)
      setInputValue('')
    }
  }

  const addMajorClass = async () => {
    const res = await addMajor({ name: inputVlue })
    if (res) {
      setShowMajorModal(false)
    }
  }

  const confirmDeleteUser = async (departId) => {
    const res = await deleteDepart({ departId })
    if (res) {
      ref.current?.reload()
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  };

  const requestDepartList = async () => {
    const res = await getDepartList()
    return res
  }
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
        request={requestDepartList}
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
          <Button key="primary" type="primary" onClick={() => setShowDepartModal(true)}>
            创建学院
          </Button>,
          <Button key="primary" type="primary">
            创建专业班级
          </Button>
        ]}
      />
      <Modal title="创建学院" open={showDepartModal} onOk={addDepartment} onCancel={() => { setShowDepartModal(false); setInputValue('') }}>
        <Space>
          学院名：<Input onChange={(e) => { setInputValue(e.target.value) }} placeholder={'请输入学院名'} />
        </Space>
      </Modal>
      <Modal title="创建专业班级" open={showMajorModal} onOk={addMajorClass} onCancel={() => { setShowMajorModal(false) }}>
      </Modal>
    </PageContainer>
  );
};