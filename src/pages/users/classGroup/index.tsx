import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { expandedRowRender } from './expandedRowRender.tsx'

const tableListDataSource =
  [
    {
      "key": 0,
      "name": "管理工程学院",
      "creator": "林东东",
      "status": 10,
      "createdAt": 1712903591723
    },
    {
      "key": 1,
      "name": "计算机学院",
      "creator": "兼某某",
      "status": 11,
      "createdAt": 1712903559699
    },
    {
      "key": 2,
      "name": "金融学院",
      "creator": "兼某某",
      "status": 1,
      "createdAt": 1712903597202
    },
    {
      "key": 3,
      "name": "人文学院",
      "creator": "曲丽丽",
      "status": 5,
      "createdAt": 1712903586967
    },
    {
      "key": 4,
      "name": "土木学院",
      "creator": "兼某某",
      "status": 7,
      "createdAt": 1712903546267
    }
  ]
const columns = [
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
      <Popconfirm
        description="确定要删除此条学院信息?"
        onConfirm={confirm}
      >
        <Button type='link' danger>
          删除
        </Button>
      </Popconfirm>
    )
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'creator'
  },
];

export default () => {
  console.log(tableListDataSource);

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        expandable={{ expandedRowRender }}
        search={false}
        dateFormatter="string"
        headerTitle="学院/专业信息"
        options={false}
        toolBarRender={() => [
          <Button key="primary" type="primary">
            创建学院
          </Button>,
          <Button key="primary" type="primary">
            创建专业
          </Button>
        ]}
      />
    </PageContainer>

  );
};