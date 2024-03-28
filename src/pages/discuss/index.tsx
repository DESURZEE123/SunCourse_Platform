import DiscussCard from '@/components/DiscussCard'
import { Button, Card, Input, Space } from 'antd'
import { useModel } from 'umi'
import NewModel from './NewModel'
import { findDiscuss, getDiscussList, SearchDiscuss } from '@/api/discuss'
import { discussTrans } from '../../utils'

const Discuss = () => {
  const { Search } = Input
  const { discussList, setDiscussList } = useModel('system')

  const onSearch = async(value:string) => {
    const res = await SearchDiscuss({ title: value })
    setDiscussList((discussTrans(res)))
  }

  const allDiscussion = async() => {
    const res = await getDiscussList()
    setDiscussList((discussTrans(res)))
  }

  const FindDiscuss = async()=> {
    const res = await findDiscuss({id:1}) 
    setDiscussList(res)
  } 

  return (
    <Card>
      <Space style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }} onClick={allDiscussion}>全部话题</span>
        <Search style={{ width: 200, marginLeft: '40px' }} placeholder='搜索话题' onSearch={onSearch} />
        <NewModel />
        <Button type='link' style={{ marginRight: '30px' }} onClick={FindDiscuss} >
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
