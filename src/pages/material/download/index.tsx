import React, { useState, useEffect } from 'react'
import { ProTable } from '@ant-design/pro-components'
import { Button, Modal, Form, } from 'antd'
import UploadImage from '@/components/UploadImage'
import { getTableColumns } from './tableConfig'
import { getMaterialData, uploadMaterialData, searchMaterialData } from '@/api/downloadFile'
import { storage } from '@/utils'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const courseId = storage.getItem('courseId')
const user = storage.getItem('userInfo1')
const Material = () => {
  const [dataSource, setDataSource] = useState([])
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const columns = getTableColumns(setDataSource)

  useEffect(() => {
    getMaterialData({ courseId }).then(res => {
      if (res.status === 200) {
        setDataSource(res.data)
      }
    })
  }, [])

  const uploadFile = () => {
    let fileName
    let name
    if (form.getFieldValue('material')) {
      const url = form.getFieldValue('material')?.file?.response?.res?.requestUrls?.[0]
      const parsedUrl = new URL(url);
      fileName = parsedUrl.origin + parsedUrl.pathname;
      name = form.getFieldValue('material').file.name
    }
    const data = { file: fileName, courseId, name }
    uploadMaterialData(data).then(res => {
      if (res.status === 200) {
        getMaterialData({ courseId }).then(res => {
          if (res.status === 200) {
            setDataSource(res.data)
          }
        })
        form.resetFields()
        setOpen(false)
      }
    })
  }

  const onReset = () => {
    form.resetFields()
    setOpen(false)
  }

  const searchFile = async (formProps) => {
    const { name } = formProps.form.getFieldsValue()
    searchMaterialData({ courseId, name }).then(res => {
      if (res?.data?.length !== 0) {
        setDataSource(res.data)
      }
    })
  }

  return (
    <>
      <div>课程资料</div>
      <ProTable
        rowKey={(record) => record.fileId}
        search={{
          collapsed: false,
          collapseRender: () => '',
          optionRender: (_, formProps) => (
            <>
              {user.isTeacher && <Button onClick={() => { setOpen(true) }} style={{ marginRight: '10px' }}>上传资料</Button>}
              <Button type='primary' onClick={() => { searchFile(formProps) }}>搜索</Button>
            </>
          )
        }}
        dataSource={dataSource}
        columns={columns}
        options={false}
      />
      <Modal title='新建话题' closable={false} open={open} footer={null}>
        <Form form={form}>
          <UploadImage fileName={'download'} labelName={'上传资料'} />
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button htmlType='button' onClick={onReset} style={{ marginRight: '10px' }}>
              取消
            </Button>
            <Button type='primary' onClick={uploadFile}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Material
