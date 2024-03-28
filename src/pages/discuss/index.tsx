import DiscussCard from '@/components/DiscussCard'
import { Button, Card, Input, Space } from 'antd'
import { useModel } from 'umi'
import NewModel from './NewModel'

const Discuss = () => {
  const { Search } = Input
  const { discussList } = useModel('system')

  const onSearch = (value, _e, info) => console.log(info?.source, value)

  return (
    <Card>
      <Space style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>全部话题</span>
        <Search style={{ width: 200, marginLeft: '40px' }} placeholder='搜索话题' onSearch={onSearch} />
        <NewModel />
        <Button type='link' style={{ marginRight: '30px' }}>
          我的话题
        </Button>
      </Space>
      {discussList.map((item: { idDiscussion: number }) => {
        return <DiscussCard TitleList={item} key={item.idDiscussion} />
      })}
    </Card>
  )
}

export default Discuss
