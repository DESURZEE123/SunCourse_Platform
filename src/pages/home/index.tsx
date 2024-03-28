import DiscussCard from '@/components/DiscussCard'
import { Col, Row } from 'antd'
import { useModel } from 'umi'
import TreeDirectory from './TreeDirectory'

const HomePage = () => {
  const { discussList } = useModel('system')

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <TreeDirectory />
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
