import { Col, Row, Button, Tree } from 'antd'
import { useModel, history } from 'umi'
import DiscussCard from '@/components/DiscussCard'
import TreeDirectory from './TreeDirectory'
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

const treeData = [
  {
    title: `${'战略管理'}`,
    key: '0-0',
    children: [
      {
        title: '第一单元 战略管理导论',
        key: '0-0-0',
        children: [
          {
            title: '1.1 教学课件-1.战略管理导论',
            key: '0-0-0-0'
          },
          {
            title: '1.2 课后思考-1',
            key: '0-0-0-1'
          }
        ]
      },
      {
        title: '第二单元 战略导航：使命、愿景与目标',
        key: '0-0-1',
        children: [
          {
            title: '2.1 教学课件-2.战略导航',
            key: '0-0-1-0'
          },
          {
            title: '2.2 课后思考-2',
            key: '0-0-1-1'
          }
        ]
      },
      {
        title: '第二单元 外部环境与分析',
        key: '0-0-2',
        children: [
          {
            title: '3.1 教学课件-3.外部环境分析',
            key: '0-0-2-0'
          },
          {
            title: '3.2 课后思考-3',
            key: '0-0-2-1'
          }
        ]
      },
      {
        title: '第四单元 内部环境与分析',
        key: '0-0-3',
        children: [
          {
            title: '4.1 教学课件-4.内部环境分析',
            key: '0-0-3-0'
          },
          {
            title: '4.2 课后思考-4',
            key: '0-0-3-1'
          },
          {
            title: '4.3 视频：波特五力模型',
            key: '0-0-3-2'
          }
        ]
      }
    ]
  }
]
const HomePage = () => {
  const { discussList } = useModel('system')
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <div>
            <CatalogText>
              <div>目录</div>
              {user.isTeacher && <Button type='primary' onClick={() => { history.push('/material/edit') }}>编辑目录</Button>}
            </CatalogText>
            <Tree style={{ fontSize: '18px' }} defaultExpandAll={true} defaultExpandedKeys={['0-0-0']} onSelect={onSelect} treeData={treeData} />
          </div>

        </Col>
        <Col span={12}>
          {discussList.map((item: { idDiscussion: number }) => {
            return <DiscussCard TitleList={item} key={item.idDiscussion} />
          })}
        </Col>
      </Row>
    </>
  )
}

export default HomePage
