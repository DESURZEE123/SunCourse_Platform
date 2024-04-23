import React, { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Drawer, Table } from 'antd';
import { getMajorList, getClassList } from '@/api/user'
import ClassTable from './ClassTable'

export const ExpandedRowComponent = (departId) => {
  const [data, setData] = useState([])
  const [classData, setClassData] = useState([])
  const [open, setOpen] = useState(false)

  const showDrawer = async (majId) => {
    const res = await getClassList()
    if (res) {
      const filterData = res.filter(item => item.majId === majId)
      setClassData(filterData)
      setOpen(true);
    }
  };

  const getDataList = async () => {
    const res = await getMajorList(departId)
    setData(res)
  }

  useEffect(() => {
    getDataList()
  }, [departId])

  const columns = [
    { title: '专业号', width: 200, dataIndex: 'majId' },
    { title: '专业名称', width: 400, dataIndex: 'name' },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={() => { showDrawer(record?.majId) }}>
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
      <ClassTable classData={classData} open={open} setOpen={setOpen} />
    </>
  );
};