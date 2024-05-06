import React, { useState, useEffect } from 'react'
import { CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Input, Popconfirm, Tree, Form, Modal, Upload, Button, Flex, message } from 'antd'
import { getTreeData, changeTreeData } from '@/api/downloadFile'
import { storage } from '@/utils'

import styled from 'styled-components'

const CatalogText = styled.div`
  height:45px;
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 20px;
  background:#f0f0f0;
`
const { TreeNode } = Tree
let tempKey = '1000'
const courseId = storage.getItem('courseId')
export default (props) => {
  const { onHandleCancel = () => { }, onHandleOk = () => { }, data = {} } = props
  const [form] = Form.useForm()
  const [showValue, setShowValue] = useState(false)
  const [changeValue, setChangeValue] = useState('')
  const [showValueKey, setShowValueKey] = useState('')
  const [treeData, setTreeData] = useState([])

  const getTreeDataList = async () => {
    const res = await getTreeData({ courseId })
    if (res.status === 200) {
      if (res?.data?.treeContent) {
        try {
          const parsedData = JSON.parse(res.data.treeContent);
          setTreeData([parsedData]);
        } catch (error) {
          console.error('解析目录失败', error);
        }
      }
    } else {
      console.log('获取目录失败');
    }
  }

  useEffect(() => {
    getTreeDataList()
  }, [])

  const onAdd = (key) => {
    console.log('onAdd', key)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = addNode(key, treeDataOld)
    setTreeData(treeDataNew)

    tempKey++
    function addNode(key, data) {
      data.forEach((item) => {
        if (item.key === key) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          item.children
            ? item.children.push({
              title: `默认值${tempKey}`,
              key: `${tempKey}`
            })
            : (item.children = [
              {
                title: `默认值${tempKey}`,
                key: `${tempKey}`
              }
            ])
        } else {
          if (item.children) {
            addNode(key, item.children)
          }
        }
      })
      return data
    }
  }

  const onDelete = (key) => {
    console.log('onAdd', key)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = deleteNode(key, treeDataOld)
    setTreeData(treeDataNew)

    function deleteNode(key, arr) {
      arr.map((item, index) => {
        if (item.key == key) {
          arr.splice(index, 1)
        }
        if (item.children) {
          deleteNode(key, item.children)
        }
      })
      return arr
    }
  }

  const onChange = (key, title) => {
    console.log('onChange', key, title)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = editNode(key, treeDataOld, title)
    setTreeData(treeDataNew)

    function editNode(key, data, val) {
      data.forEach((item) => {
        if (item.key === key) {
          item.title = val
        } else {
          if (item.children) {
            editNode(key, item.children, val)
          }
        }
      })
      return data
    }
  }

  const renderTreeNodes = (data) => {
    // console.log('renderTreeNodes', data)
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item}></TreeNode>
    })
  }

  const onFinish = () => {
    onChange(showValueKey, form.getFieldValue('title'))
    setShowValue(false)
    setChangeValue('')
    // form.resetFields()
  }

  const onSave = (values: any) => {
    console.log(treeData, '~~~~~~~~~~~~~~~');
    changeTreeData({ courseId, treeContent: treeData }).then(res => {
      // changeTreeData({ courseId, treeContent: JSON.stringify(treeData[0]) }).then(res => {
      if (res.status === 200) {
        message.success('保存成功')
      } else {
        message.error('保存失败')
      }
    })
  }

  const onReset = () => {
    history.back()
  }

  const onTitleRender = (item) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Input value={item.title} defaultValue={item.title} onChange={() => onChange(item.key)} onClick={()=> onChange(item.key)}/> */}
        <Input style={{ minWidth: '500px' }} value={item.title} defaultValue={item.title} onClick={() => { setShowValue(true); setChangeValue(item.title); setShowValueKey(item.key) }} />
        <span style={{ display: 'flex' }}>
          <PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
          <Popconfirm
            title='确定要删除吗?'
            okText='确定'
            cancelText='取消'
            onConfirm={() => {
              onDelete(item.key)
            }}
          >
            <CloseOutlined style={{ marginLeft: 10 }} />
          </Popconfirm>
        </span>
      </div>
    )
  }
  return (
    <>
      <CatalogText>目录资料更改</CatalogText>
      {treeData.length > 0 && (
        <Tree className='draggable-tree' defaultExpandAll={true} titleRender={onTitleRender}>
          {treeData?.length && renderTreeNodes(treeData)}
        </Tree>
      )}
      <Modal title="小节内容" open={showValue} onOk={onFinish} onCancel={() => { setShowValue(false); setShowValueKey(''); form.resetFields() }}>
        <Form form={form} >
          <Form.Item label="标题名称" name="title">
            <Input placeholder={'请输入更新标题'} />
          </Form.Item>
          <Form.Item label='添加附件' name={"material"} >
            <Upload>
              <Button icon={<UploadOutlined />}>上传资料</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Flex justify={'center'} align={'center'}>
        <Button htmlType='button' onClick={onReset} style={{ margin: '15px' }}>
          取消
        </Button>
        <Button type='primary' onClick={onSave}>
          确定
        </Button>
      </Flex>
    </>
  )
}
