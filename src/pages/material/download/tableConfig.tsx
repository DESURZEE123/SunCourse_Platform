import { Button, message } from 'antd'
import { deleteMaterialData, getMaterialData } from '@/api/downloadFile'
import { storage } from '@/utils'

const courseId = storage.getItem('courseId')
const user = storage.getItem('userInfo1')

export const getTableColumns = (setDataSource) => {
  const deleteFile = (fileId) => {
    deleteMaterialData({ courseId, fileId }).then(res => {
      if (res.status === 200) {
        message.success('删除成功')
        getMaterialData({ courseId }).then(res => {
          if (res.status === 200) {
            setDataSource(res.data)
          }
        })
      }
    })
  }
  return [
    {
      title: '文件名',
      dataIndex: 'name',
      width: 200,
      fieldProps: {
        placeholder: '请输入文件名'
      }
    },
    // {
    //   title: '上传者',
    //   dataIndex: 'activityName',
    //   width: 200,
    //   hideInSearch: true,
    //   fieldProps: {
    //     placeholder: '请输入活动名称'
    //   }
    // },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
          <Button type='link' onClick={() => { open(record?.file) }}>
            资料下载
          </Button>
          {user?.teaId && <Button type='link' danger onClick={() => { deleteFile(record.fileId) }}>删除</Button>}
        </>
      )
    }
  ]
}
