import DiscussCard from '@/components/DiscussCard'
import { Button, Card, Input, Space } from 'antd'
import { PageContainer } from '@ant-design/pro-components'
import { useModel } from 'umi'
import NewModel from './NewModel'
import { findDiscuss, getDiscussList, SearchDiscuss } from '@/api/discuss'
import { discussTrans, storage } from '../../utils'

const user = storage.getItem('userInfo1')
const courseId = storage.getItem('courseId')
const Discuss = () => {
  const { Search } = Input
  const { teacherMapList, studentMapList } = useModel('course')
  const { discussList, setDiscussList } = useModel('system')

  const onSearch = async (value: string) => {
    const data = await SearchDiscuss({ title: value })
    const filterData = data.filter((item) => item.idCourse === courseId)
    setDiscussList(discussTrans(filterData))
  }

  const allDiscussion = async () => {
    const data = await getDiscussList()
    const filterData = data.filter((item) => item.idCourse === courseId)
    setDiscussList(discussTrans(filterData))
  }

  const FindDiscuss = async () => {
    const DisName = user?.teaId ? teacherMapList.get(parseInt(user.teaId)) : studentMapList.get(parseInt(user.stuId))
    const res = await findDiscuss({ DisName })
    setDiscussList(res)
  }

  return (
    <PageContainer>
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
    </PageContainer>
  )
}

export default Discuss
