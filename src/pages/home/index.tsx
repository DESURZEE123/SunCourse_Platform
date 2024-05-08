import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Tree, message, Modal, Flex } from 'antd'
import { useModel, history } from 'umi'
import DiscussCard from '@/components/DiscussCard'
import { getTreeData, initTreeData, getSingleTreeDataFile } from '@/api/downloadFile'
import { storage } from '@/utils'

import styled from 'styled-components'

const CatalogText = styled.div`
  display:flex;
  justify-content: space-between;
  height:45px;
  padding: 10px 20px;
  font-size: 20px;
  background:#f0f0f0;
`
const user = storage.getItem('userInfo1')
const courseId = storage.getItem('courseId')
const treeData1 = [
  {
    title: `${'示例目录'}`,
    key: '0-0',
    children: [
      {
        title: '第一单元',
        key: '0-0-0',
        children: [
          {
            title: '1.1 教学课件-1.',
            key: '0-0-0-0'
          },
          {
            title: '1.2 课后思考-1',
            key: '0-0-0-1'
          }
        ]
      },
      {
        title: '第二单元',
        key: '0-0-1',
        children: [
          {
            title: '2.1 教学课件-2.',
            key: '0-0-1-0'
          },
          {
            title: '2.2 课后思考-2',
            key: '0-0-1-1'
          }
        ]
      }
    ]
  }
]
const HomePage = () => {
  const { discussList } = useModel('system')
  const [treeData, setTreeData] = useState([])
  const [open, setOpen] = useState(false)
  const [downloadFile, setDownloadFile] = useState({})

  const getTreeDataList = async () => {
    const res = await getTreeData({ courseId })
    if (res.status === 200) {
      if (!res?.data?.treeContent) {
        await initTreeData({ courseId, treeData: treeData1 })
        setTreeData(treeData1)
      } else {
        const parsedData = [res.data.treeContent].map(item => JSON.parse(item));
        setTreeData(parsedData)
      }
    } else {
      console.log('获取目录失败')
    }
  }

  const showFile = async (selectedKeys) => {
    setOpen(true)
    console.log('selected', selectedKeys[0])
    const res = await getSingleTreeDataFile({ courseId, selectedId: selectedKeys[0] })
    if (res.status === 200) {
      setDownloadFile(res.data[0])
    } else {
      message.error('获取文件失败')
    }
  }

  const downFile = () => {
    setOpen(false)
    window.open(downloadFile.file)
  }
  useEffect(() => {
    getTreeDataList()
  }, [])

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <div>
            <CatalogText>
              <div>目录</div>
              {user.isTeacher && <Button type='primary' onClick={() => { history.push('/material/edit') }}>编辑目录</Button>}
            </CatalogText>
            {treeData.length > 0 && <Tree style={{ fontSize: '18px' }} defaultExpandAll={true} defaultExpandedKeys={['0-0-0']} onSelect={showFile} treeData={treeData} />}
          </div>
        </Col>
        <Col span={12}>
          {discussList.map((item: { idDiscussion: number }) => {
            return <DiscussCard TitleList={item} key={item.idDiscussion} />
          })}
        </Col>
      </Row>
      <Modal title='目录详情' closable={false} open={open} footer={null}>
        {downloadFile?.name && <h3>文件名：{downloadFile?.name}</h3>}
        <Flex justify={'center'} align={'center'}>
          <Button onClick={() => { setOpen(false) }} style={{ margin: '15px' }}>取消</Button>
          <Button type='primary' onClick={downFile}>
            下载
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default HomePage
